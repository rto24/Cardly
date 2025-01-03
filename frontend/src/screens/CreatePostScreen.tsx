import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createPost } from '../services/postService';
import { useAuth } from '../context/AuthContext';

function CreatePostScreen() {
  const [ title, setTitle ] = useState<string>("");
  const [ content, setContent ] = useState<string>("");
  const [ image, setImage ] = useState<string>("");
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const { user } = useAuth();

  const handleCreatePost = async () => {
    if (!title || !content || !image || !user) {
      setErrorMessage("Required field is missing");
      return;
    }

    try {
      await createPost(title, content, image, user);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error)
    }
  };

  return (
    <View>
      <Text>CreatePostScreen</Text>
    </View>
  )
}

export default CreatePostScreen;