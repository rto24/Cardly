import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Like, Posts, Comment, LikeResponse } from "../types/types";
import { getUserPosts, likePost, commentOnPost, getLikesOnPost } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";


const ViewPostsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [ posts, setPosts ] = useState<Posts[]>([]);

  useEffect(() => {
    console.log("Updated posts:", posts);
  }, [posts]);

  useEffect(() => {
  if (!user) {
    console.warn("User is not authenticated. Redirecting to login.");
    navigation.navigate("Login");
    return;
  }

  const fetchUserPosts = async (userId: number) => {
    try {
      const data = await getUserPosts(userId);
      setPosts(data);
    } catch (error) {
      console.error("Failure fetching user posts:", error);
    }
  };

  fetchUserPosts(user);
}, [user]);

  const handleComment = async (postId: number, userId: number, content: string): Promise<Comment> => {
    try {
      const newComment = await commentOnPost(postId, userId, content);
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  const handleLike = async (postId: number, userId: number): Promise<LikeResponse> => {
    try {
      const newLike = await likePost(postId, userId);
      return newLike;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  };

  return (
    <View>
      <FlatList 
        data={posts}
        renderItem={({ item }) => (
          <PostCard 
            id={item.id}
            userId={item.user.id}
            title={item.title}
            content={item.content}
            user={item.user}
            likes={item.likes}
            comments={item.comments}
            imageUrl={item.imageUrl}
            onLike={(postId, userId) => handleLike(postId, userId)}
            onComment={(postId, userId, comment) => handleComment(postId, userId, comment)}
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