import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DiscussionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discussion</Text>
      <Text style={styles.placeholder}>Coming Soon</Text>
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
  },
  placeholder: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
  },
});
