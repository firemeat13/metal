# Metal Discography Explorer - Setup Guide

## Project Structure

```
src/
├── screens/           # App screens (HomeScreen, BandDetailScreen, etc.)
├── components/        # Reusable components
├── services/          # Firebase and API services
├── store/             # Zustand state management
└── types/             # TypeScript interfaces
```

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase

1. Create a Firebase project at https://console.firebase.google.com
2. Create a new Web app in your Firebase project
3. Copy your Firebase config
4. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Fill in your Firebase credentials in `.env`

### 3. Set up Firestore Database

1. Go to Firebase Console → Firestore Database
2. Create database in production mode
3. Set up security rules (see below)

### 4. Run the App

```bash
npm run android    # For Android emulator
npm run ios        # For iOS (macOS only)
npm run web        # For web browser
```

## Firebase Setup Instructions

### Collections Structure

Create the following collections in Firestore:

#### `bands/` Collection
Documents: `{bandId}`
```javascript
{
  name: string,
  origin: string,
  formed: number,
  disbanded?: number,
  imageUrl?: string,
  description: string,
  genre: string[]
}
```

#### `bands/{bandId}/albums/` Sub-collection
Documents: `{albumId}`
```javascript
{
  title: string,
  year: number,
  trackCount: number,
  producer: string[],
  genre: string[],
  imageUrl?: string,
  description?: string
}
```

#### `bands/{bandId}/albums/{albumId}/songs/` Sub-collection
Documents: `{songId}`
```javascript
{
  title: string,
  length: number,
  instruments: string[],
  themes: string[],
  lyrics?: string,
  connections: string[]
}
```

#### `users/` Collection
Documents: `{userId}`
```javascript
{
  uid: string,
  username: string,
  email: string,
  avatarUrl?: string,
  favoriteBands: string[],
  favoriteSongs: string[],
  createdAt: timestamp
}
```

#### `discussions/` Collection
Documents: `{discussionId}`
```javascript
{
  bandId?: string,
  albumId?: string,
  songId?: string,
  userId: string,
  username: string,
  content: string,
  rating: number,
  createdAt: timestamp,
  replies: array
}
```

#### `bandSubmissions/` Collection
Documents: `{submissionId}`
```javascript
{
  userId: string,
  bandName: string,
  origin: string,
  formed: number,
  description: string,
  albums: array,
  status: 'pending' | 'approved' | 'rejected',
  createdAt: timestamp
}
```

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for all
    match /bands/{document=**} {
      allow read;
    }
    
    // Users can edit their own profile
    match /users/{userId} {
      allow read;
      allow write: if request.auth.uid == userId;
    }
    
    // Anyone can read discussions
    match /discussions/{document=**} {
      allow read;
    }
    
    // Authenticated users can write discussions
    match /discussions/{document=**} {
      allow write: if request.auth != null;
    }
    
    // Users can submit bands (moderated)
    match /bandSubmissions/{document=**} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Adding Sample Data

1. Go to Firebase Console → Firestore Database
2. Manually add documents for the initial 5 bands:
   - System of a Down
   - Tool
   - Rage Against the Machine
   - Deftones
   - Linkin Park

Or use the Firebase Admin SDK to bulk import data.

## TypeScript

Run type checking:
```bash
npx tsc --noEmit
```

## Development

The app uses:
- **React Native** with Expo for cross-platform development
- **Firebase** for backend (auth, database, storage)
- **React Navigation** for app navigation
- **Zustand** for state management
- **TypeScript** for type safety

## Next Phases

- [ ] Phase 2: Band & Album Browsing (improve UI, add filters)
- [ ] Phase 3: Deep Dive Features (lyrics, instruments, themes)
- [ ] Phase 4: Discussion & Community (comments, real-time updates)
- [ ] Phase 5: User-Submitted Bands (form, moderation)
- [ ] Phase 6: Polish & Deployment (optimize, publish to Google Play)
