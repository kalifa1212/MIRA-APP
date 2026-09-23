import { Stack, router, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useCallback, useState } from "react";
//import * as SplashScreen from "expo-splash-screen";
//import * as Font from "expo-font";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.replace("/auth/login");
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack />
    </View>
  );
};

export default Layout;

// ####### modif a revoir
// import { Stack, SplashScreen, useRouter } from "expo-router";
// import { useFonts } from "expo-font";
// import { useEffect, useCallback, useState } from "react";
// import { View } from "react-native";

// SplashScreen.preventAutoHideAsync();

// const Layout = () => {
//   const [fontsLoaded] = useFonts({
//     DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
//     DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
//     DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
//   });

//   const [isReady, setIsReady] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadResourcesAndDataAsync() {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         // navigation will be performed once the root view is laid out
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setIsReady(true);
//       }
//     }

//     loadResourcesAndDataAsync();
//   }, []);

//   const onLayoutRootView = useCallback(async () => {
//     if (isReady) {
//       await SplashScreen.hideAsync();
//       // perform navigation once splash is hidden and root view is ready
//       try {
//         router.replace("/auth/login");
//       } catch (e) {
//         console.warn("router.replace failed", e);
//       }
//     }
//   }, [isReady]);

//   if (!isReady || !fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
//       <Stack />
//     </View>
//   );
// };

// export default Layout;
