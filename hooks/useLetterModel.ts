import { useTensorflowModel } from 'react-native-fast-tflite';

/**
 * useLetterModel
 * Wraps the TFLite hook to load your letters.tflite model.
 */
export function useLetterModel() {
  // `state` will be 'loading' | 'loaded' | 'error'
  // `model` is undefined until state === 'loaded'
  return useTensorflowModel(
    require('../assets/models/fsl_classifier.tflite'), // Path to your TFLite model
  );
}