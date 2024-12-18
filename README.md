# MeFormer - Learning Platform Mobile App

A mobile learning platform built with React Native and Expo, designed to provide an intuitive educational experience for students.

## Features

- 🔐 User Authentication (Student/Parent)
- 📚 Course Browsing and Management
- 📱 Modern and Responsive UI
- 📊 Progress Tracking
- 💾 Offline Support

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router
- Secure Store
- Axios for API Integration

## Prerequisites

- Node.js >= 14
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

## Installation

1. Clone the repository
```bash
git clone https://github.com/Neoxs/meformer-frontend.git
cd meformer-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm start
```

## Project Structure
```
app/
├── (auth)/                  # Authentication routes
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/                  # Main app tabs
│   ├── _layout.tsx
│   ├── index.tsx           # Home screen
│   ├── courses.tsx
│   └── profile.tsx
├── components/             # Reusable components
├── contexts/              # Context providers
├── services/             # API services
└── utils/               # Utility functions
```

## Running the App

- iOS:
```bash
npm run ios
```

- Android:
```bash
npm run android
```

- Web:
```bash
npm run web
```

## Features Walkthrough

### 1. Authentication
- Login/Register functionality
- Secure token storage
- Profile management

### 2. Course Management
- Browse available courses
- View course details
- Track course progress

### 3. User Profile
- View and edit profile
- Track overall progress
- Manage settings

## API Integration

The app connects to a Node.js backend server. Make sure the backend server is running before starting the app.

### API Endpoints

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register

// Courses
GET /api/courses
GET /api/courses/:id

// Profile
GET /api/profile
PUT /api/profile
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Scripts

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web"
}
```

## Development Guidelines

- Use TypeScript for all new files
- Follow the existing folder structure
- Add proper types for all components and functions
- Use the provided components in the `components` folder
- Follow the established styling patterns

## Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
```bash
npm start --reset-cache
```

2. **Dependencies Issues**
```bash
rm -rf node_modules
npm install
```

3. **iOS Build Issues**
```bash
cd ios
pod install
cd ..
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
