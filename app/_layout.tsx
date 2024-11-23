import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import mobileAds from 'react-native-google-mobile-ads';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

// Initialize mobile ads
mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
  });

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLandscape, setIsLandscape] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // Check if device is in landscape mode
    const checkOrientation = () => {
      const { width, height } = Dimensions.get('window');
      const newIsLandscape = width > height;
      
      if (newIsLandscape !== isLandscape) {
        setIsLandscape(newIsLandscape);
        if (newIsLandscape) {
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        } else {
          ScreenOrientation.unlockAsync();
        }
      }
    };

    // Initial check
    checkOrientation();

    // Listen for orientation changes
    const subscription = Dimensions.addEventListener('change', checkOrientation);

    if (loaded) {
      SplashScreen.hideAsync();
    }

    // Cleanup
    return () => {
      subscription.remove();
      // Make sure to unlock orientation when component unmounts
      ScreenOrientation.unlockAsync();
    };
  }, [loaded, isLandscape]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'CV Builder',
            headerTitleAlign: 'center',
          }} 
        />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
