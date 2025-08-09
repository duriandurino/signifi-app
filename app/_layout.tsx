import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Text } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  // ✅ Always call hooks unconditionally
  useEffect(() => {
    if (loaded) {
      (Text as any).defaultProps = {
        ...(Text as any).defaultProps,
        style: {
          ...(Text as any).defaultProps?.style,
          fontFamily: 'Poppins-SemiBold',
        },
      };
    }
  }, [loaded]);

  // ⏳ Only return null if fonts aren't loaded
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)/course" options={{ headerShown: false }} />
        <Stack.Screen name="allCourseBtn" options={{ headerShown: false }} />
        <Stack.Screen name="courseDetails" options={{ headerShown: false }} />
        <Stack.Screen name="couseCurriculum" options={{ headerShown: false }} />
        <Stack.Screen name="minigames/WordleScreen" options={{ headerShown: false }} />
        <Stack.Screen name="minigames/HandmanScreen" options={{ headerShown: false }} />
        <Stack.Screen name="minigames/FSLBingoScreen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
