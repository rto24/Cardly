import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Posts } from "../types/types";
import { getUserPosts, likePost, commentOnPost } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

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
          <PostCard 
            id={item.id}
            userId={user}
            title={item.title}
            content={item.content}
            username={item.username}
            userAvatar={item.userAvatar}
            likes={} //need to create backend methods to get likes
            comments={} //need to create backend methods to get comments
            imageUrl={item.imageUrl}
            onLike={() => likePost(item.id, user)}
            onComment={() => commentOnPost(item.id, user, item.content)}
            createdAt={item.createdAt}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
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