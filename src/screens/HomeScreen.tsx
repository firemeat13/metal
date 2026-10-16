import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getBands, searchBands } from '../services/bandDataService';
import { Band } from '../types';
import { useAppStore } from '../store/appStore';

type Props = NativeStackScreenProps<any, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const [bands, setBands] = useState<Band[]>([]);
  const [filteredBands, setFilteredBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useAppStore();

  useEffect(() => {
    loadBands();
  }, []);

  const loadBands = async () => {
    try {
      setLoading(true);
      const data = await getBands();
      setBands(data);
      setFilteredBands(data);
    } catch (error) {
      console.error('Error loading bands:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = bands.filter((band) =>
        band.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBands(filtered);
    } else {
      setFilteredBands(bands);
    }
  }, [searchQuery, bands]);

  const handleBandPress = (band: Band) => {
    navigation.navigate('BandDetail', { bandId: band.id, bandName: band.name });
  };

  const renderBandItem = ({ item }: { item: Band }) => (
    <TouchableOpacity
      style={styles.bandCard}
      onPress={() => handleBandPress(item)}
    >
      <Text style={styles.bandName}>{item.name}</Text>
      <Text style={styles.bandOrigin}>{item.origin}</Text>
      <Text style={styles.bandGenre}>{item.genre.join(', ')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search bands..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#ff0000" />
      ) : filteredBands.length === 0 ? (
        <Text style={styles.emptyText}>No bands found</Text>
      ) : (
        <FlatList
          data={filteredBands}
          renderItem={renderBandItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  searchInput: {
    height: 44,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  bandCard: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ff0000',
  },
  bandName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bandOrigin: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  bandGenre: {
    color: '#ff0000',
    fontSize: 12,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
