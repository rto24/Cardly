import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Posts } from "../types/types";
import { getUserPosts } from "../services/postService";
import { useAuth } from "../context/AuthContext";

const ViewPostsScreen = () => {
  const { user } = useAuth();
  const [ posts, setPosts ] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchUserPosts = async (userId: number) => {
      try {
        const data: Posts[] = await getUserPosts(userId);
        setPosts(data);
      } catch (error) {
        console.error("Failure fetching user posts:", error);
      }
    }
    fetchUserPosts(user);
  }, []);

  return (
    <View>
      <FlatList 
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.title}</Text>
            <Image
              style={styles.image} 
              source={{
                uri: item.imageUrl,
              }}
            />
            <Text>{item.content}</Text>
          </View>
          ) 
        }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ViewPostsScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 400
  }
})