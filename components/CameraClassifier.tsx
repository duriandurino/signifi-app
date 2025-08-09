// src/components/CameraFastClassifier.tsx
import React from 'react';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { useLetterModel } from '../hooks/useLetterModel';

type Props = { onLetter: (ltr: string) => void };

export default function CameraFastClassifier({ onLetter }: Props) {
  // 1. Pick the front camera
  const device = useCameraDevice('front');  // ← v4+ API :contentReference[oaicite:3]{index=3}

  // 2. Resize plugin to downsample frames to model’s input
  const { resize } = useResizePlugin();     // vision-camera-resize-plugin :contentReference[oaicite:4]{index=4}

  // 3. Load or reference the TFLite model
  const { state, model } = useLetterModel(); // 'loading' → 'loaded' → model.runSync()

  // 4. Frame processor: runs on the native JSI thread
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    if (state !== 'loaded' || model == null) return;

    // a. Downsample to [192×192×3] uint8 RGB buffer
    const input = resize(frame, {
      scale: { width: 192, height: 192 },
      pixelFormat: 'rgb',
      dataType: 'uint8',
    });

    // b. Synchronous inference (zero-copy ArrayBuffer)
    const outputs = model.runSync([input]); // returns number[][] :contentReference[oaicite:5]{index=5}

    // c. Find highest-confidence index → letter
    let maxIdx = 0;
    outputs[0].forEach((v: any, i: any) => { if (v > outputs[0][maxIdx]) maxIdx = i });
    const letter = String.fromCharCode(65 + maxIdx); // 0→'A', 1→'B', …

    // d. Dispatch result back to JS thread
    runOnJS(onLetter)(letter);
  }, [model, state]);

  if (!device) return null;
  return (
    <Camera
      style={{ position: 'absolute', width: 1, height: 1 }}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}            
    />
  );
}
