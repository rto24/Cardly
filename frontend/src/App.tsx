import { SafeAreaView } from 'react-native';
import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/AuthContext';
import "./global.css";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </SafeAreaView>
  );
}