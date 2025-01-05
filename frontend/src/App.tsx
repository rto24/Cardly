import { SafeAreaView } from 'react-native';
import AppNav from './navigation/AppNav';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import "./global.css";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <MainNav />
      </AuthProvider>
    </SafeAreaView>
  );
}

const MainNav = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppNav /> : <LoginScreen />
}