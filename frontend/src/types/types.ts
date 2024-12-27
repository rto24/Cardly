export interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
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
  className?: string;
}

export interface User {
  id: number;
  username: string;
  avatar: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

export interface Like {
  id: number;
  user: User;
}

export interface Posts {
  id: number;
  userId: number;
  user: User;
  title: string;
  content: string;
  likes: Like[];
  comments: Comment[];
  imageUrl: string;
  onLike: (id: any, userId: any) => void;
  onComment: (id: any, userId: any, comment: string) => Promise<Comment>;
  createdAt: string;
}