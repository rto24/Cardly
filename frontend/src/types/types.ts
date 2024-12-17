export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
}