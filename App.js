import { useContext, useCallback, useEffect, useMemo, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from "expo-splash-screen";
import { Animated, StyleSheet, Text, View} from "react-native";
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';


import { Colors } from './src/constants/styles';
import LoginScreen from './src/screens/LoginScreen';
import AuthContextProvider, { AuthContext } from './src/store/auth-context';

// Inicializar App y Auth
import './src/util/auth'
import ModalScreen from "./src/screens/ModalScreen";
import GameScreen from "./src/screens/GameScreen";


// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});
const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Inicia sesión',
          headerTitleStyle: {
            fontFamily: 'FredokaOne_400Regular'
          }
        }}
      />
      <Stack.Group screenOptions={{
          presentation: 'modal',
          headerStyle: { backgroundColor: Colors.error500 },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: Colors.error100 },
        }}
      >
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Error' }}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.secondary },
      }}
    >
      <Stack.Screen
        name="Juego (sacárselo)"
        component={GameScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.email && <AuthStack />}
      {!!authCtx.email && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const imagen = require('./assets/splash.png');
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    console.log('Arranca aplicación');
  }, []);

  function onFinishHandler() {
    console.log('Oculto animación');
    setAppLoading(false);
  }

  return (
    <>
      {/* <StatusBar style="light" /> */}
      {
        appLoading ?
        <AnimatedSplashScreen
          image={imagen}
          onFinish={onFinishHandler}
        />
        :
        <MainScreen />
      }
    </>
  );
}

function AnimatedSplashScreen({ image, onFinish }) {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  const animation = useMemo(() => new Animated.Value(1), []);
  
  const efecto = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => onFinish());
  };

  const onImageLoaded = useCallback(async () => {
    try {
      console.log('Oculto splash');
      await SplashScreen.hideAsync();
      // SplashScreen.hideAsync();
    } catch (e) {
      console.log(e); // Útil
    } finally {
      console.log('Empiezo animación');
      efecto();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {
        fontsLoaded &&
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: '#c30b64', // Manual
              // opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain", // Manual
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      }
    </View>
  );
}

function MainScreen() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}
