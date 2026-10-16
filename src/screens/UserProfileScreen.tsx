import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/appStore';

export const UserProfileScreen = () => {
  const { currentUser } = useAppStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {currentUser ? (
        <View>
          <Text style={styles.username}>{currentUser.username}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>
      ) : (
        <Text style={styles.placeholder}>Not logged in</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  username: {
    color: '#fff',
    fontSize: 18,
  },
  email: {
    color: '#aaa',
    fontSize: 14,
  },
  placeholder: {
    color: '#aaa',
    fontSize: 16,
  },
});
