import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';

export const AddBandScreen = ({ navigation }: any) => {
  const [bandName, setBandName] = useState('');
  const [origin, setOrigin] = useState('');
  const [formed, setFormed] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!bandName || !origin || !formed) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // TODO: Submit to Firebase
    Alert.alert('Success', 'Band submission pending moderation');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Submit a Band</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Band Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter band name"
          placeholderTextColor="#666"
          value={bandName}
          onChangeText={setBandName}
        />

        <Text style={styles.label}>Origin *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., United States"
          placeholderTextColor="#666"
          value={origin}
          onChangeText={setOrigin}
        />

        <Text style={styles.label}>Year Formed *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 1994"
          placeholderTextColor="#666"
          value={formed}
          onChangeText={setFormed}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Describe the band..."
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    fontSize: 14,
  },
  multilineInput: {
    height: 120,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ff0000',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
