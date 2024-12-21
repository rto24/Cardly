import React from "react";
import { TextInput, View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Posts } from "../types/types";

const PostCard: React.FC<Posts> = ({
  id,
  title,
  content,
  username,
  userAvatar,
  likes,
  comments,
  imageUrl,
  onLike,
  onComment,
  createdAt,
}) => (
  <View>
    <View>
      <Image source={{ uri: userAvatar }}/>
      <Text>{username}</Text>
    </View>
    {imageUrl &&
      <Image source={{ uri: imageUrl }}/>
    }
    <View>
      <TouchableOpacity onPress={() => onLike(id)}>
        <Text>♡</Text>
      </TouchableOpacity>
    </View>
    <Text>{title}</Text>
    <Text>{content}</Text>
  </View>
); 

//need to add modal for comments
  //map comments to display in modal
//need to add modal for user likes
  //map likes to display users that liked the post

export default PostCard;