import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';
import { onAuthChange } from './src/services/authService';
import { useAppStore } from './src/store/appStore';

import { HomeScreen } from './src/screens/HomeScreen';
import { BandDetailScreen } from './src/screens/BandDetailScreen';
import { AlbumDetailScreen } from './src/screens/AlbumDetailScreen';
import { SongDetailScreen } from './src/screens/SongDetailScreen';
import { DiscussionScreen } from './src/screens/DiscussionScreen';
import { UserProfileScreen } from './src/screens/UserProfileScreen';
import { AddBandScreen } from './src/screens/AddBandScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions: any = {
  headerStyle: {
    backgroundColor: '#1a1a1a',
  },
  headerTintColor: '#ff0000',
  headerTitleStyle: {
    fontWeight: '700' as any,
    color: '#fff',
  },
};

function HomeStack() {
  return (
    <Stack.Navigator id="HomeStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Metal Discography' }}
      />
      <Stack.Screen
        name="BandDetail"
        component={BandDetailScreen}
        options={({ route }: any) => ({ title: route.params?.bandName })}
      />
      <Stack.Screen
        name="AlbumDetail"
        component={AlbumDetailScreen}
        options={({ route }: any) => ({ title: route.params?.albumTitle })}
      />
      <Stack.Screen
        name="SongDetail"
        component={SongDetailScreen}
        options={({ route }: any) => ({ title: route.params?.songTitle })}
      />
    </Stack.Navigator>
  );
}

function AddBandStack() {
  return (
    <Stack.Navigator id="AddBandStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="AddBandMain"
        component={AddBandScreen}
        options={{ title: 'Add Band' }}
      />
    </Stack.Navigator>
  );
}

function DiscussionStack() {
  return (
    <Stack.Navigator id="DiscussionStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="DiscussionMain"
        component={DiscussionScreen}
        options={{ title: 'Discussion' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator id="ProfileStack" screenOptions={screenOptions}>
      <Stack.Screen
        name="ProfileMain"
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      id="AppTabs"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2a2a2a',
          borderTopColor: '#ff0000',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#ff0000',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Bands',
          tabBarLabel: 'Bands',
        }}
      />
      <Tab.Screen
        name="DiscussionTab"
        component={DiscussionStack}
        options={{
          title: 'Discuss',
          tabBarLabel: 'Discuss',
        }}
      />
      <Tab.Screen
        name="AddBandTab"
        component={AddBandStack}
        options={{
          title: 'Add',
          tabBarLabel: 'Add Band',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email || '',
          username: user.displayName || user.email || 'User',
          favoriteBands: [],
          favoriteSongs: [],
          createdAt: new Date(),
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setCurrentUser]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}
