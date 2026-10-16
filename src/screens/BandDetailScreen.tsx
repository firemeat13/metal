import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getBandById, getAlbumsByBand } from '../services/bandDataService';
import { Band, Album } from '../types';
import { useAppStore } from '../store/appStore';

type Props = NativeStackScreenProps<any, 'BandDetail'>;

export const BandDetailScreen = ({ route, navigation }: Props) => {
  const { bandId } = route.params;
  const [band, setBand] = useState<Band | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const { favoriteBands, addFavoriteBand, removeFavoriteBand } = useAppStore();
  const isFavorite = favoriteBands.includes(bandId);

  useEffect(() => {
    loadBandData();
  }, [bandId]);

  const loadBandData = async () => {
    try {
      setLoading(true);
      const bandData = await getBandById(bandId);
      const albumsData = await getAlbumsByBand(bandId);
      setBand(bandData);
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error loading band:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlbumPress = (album: Album) => {
    navigation.navigate('AlbumDetail', {
      bandId,
      albumId: album.id,
      albumTitle: album.title,
    });
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteBand(bandId);
    } else {
      addFavoriteBand(bandId);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!band) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Band not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.bandName}>{band.name}</Text>
        <Text style={styles.bandInfo}>
          {band.origin} • Formed {band.formed}
          {band.disbanded && ` - ${band.disbanded}`}
        </Text>
        <Text style={styles.description}>{band.description}</Text>

        <TouchableOpacity
          style={[styles.favoriteButton, isFavorite && styles.favoritedButton]}
          onPress={toggleFavorite}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.albumsSection}>
        <Text style={styles.sectionTitle}>Discography</Text>
        {albums.map((album) => (
          <TouchableOpacity
            key={album.id}
            style={styles.albumCard}
            onPress={() => handleAlbumPress(album)}
          >
            <View style={styles.albumYear}>
              <Text style={styles.year}>{album.year}</Text>
            </View>
            <View style={styles.albumInfo}>
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumDetails}>
                {album.trackCount} tracks • {album.producer.join(', ')}
              </Text>
              <Text style={styles.albumGenre}>{album.genre.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  bandName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bandInfo: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  favoriteButton: {
    backgroundColor: '#ff0000',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  favoritedButton: {
    backgroundColor: '#cc0000',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  albumsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  albumCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ff0000',
  },
  albumYear: {
    justifyContent: 'center',
    marginRight: 12,
    minWidth: 50,
  },
  year: {
    color: '#ff0000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  albumInfo: {
    flex: 1,
  },
  albumTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  albumDetails: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  albumGenre: {
    color: '#ff0000',
    fontSize: 11,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
