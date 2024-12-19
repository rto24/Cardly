import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Posts } from "../types/types";
import { getUserPosts } from "../services/postService";
import { useAuth } from "../context/AuthContext";

const ViewPostsScreen = () => {
  const { user } = useAuth();
  const [ posts, setPosts ] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchUserPosts = async (userId: number) => {
      try {
        const response = await getUserPosts(userId);
        const data: Posts[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failure fetching user posts:", error);
      }
    }
    fetchUserPosts(user);
  }, []);

  return (
    <View>
      {/* <FlatList 
        data={posts}
        renderItem={({post}) => } //add post component here
        keyExtractor={post => post.id}
      /> */}
    </View>
  )
}

export default ViewPostsScreen;