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

export interface Comment {
  id: number;
  username: string;
  content: string;
  userAvatar: string;
  userId: number;
  createdAt: string;
}

export interface Like {
  id: number;
  username: string;
  userId: number;
  userAvatar: string;
}

export interface Posts {
  id: number;
  title: string;
  content: string;
  username: string;
  userAvatar: string;
  likes: Like[];
  comments: Comment[];
  imageUrl: string;
  onLike: (id: any) => void;
  onComment: (id: any, comment: string) => void;
  createdAt: string;
}