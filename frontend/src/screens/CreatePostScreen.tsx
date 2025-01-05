import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createPost } from '../services/postService';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';

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
      <InputField 
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField 
        placeholder="Caption"
        value={content}
        onChangeText={setContent}
      />
      {/* Image will be changed to let users select a photo from lib or take a picture*/}
      <InputField 
        placeholder="Image"
        value={image}
        onChangeText={setImage}
      />
      {errorMessage &&
        <Text>{errorMessage}</Text>
      }
      <Button 
        title="Create Post"
        onPress={handleCreatePost}
      />
    </View>
  )
}

export default CreatePostScreen;