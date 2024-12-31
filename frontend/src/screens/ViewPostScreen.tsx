import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { Like, Posts, Comment } from "../types/types";
import { getUserPosts, likePost, commentOnPost, getLikesOnPost } from "../services/postService";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";

const ViewPostsScreen = () => {
  const { user } = useAuth();
  const [ posts, setPosts ] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchUserPosts = async (userId: number) => {
      try {
        const data = await getUserPosts(userId);
        setPosts(data || []);
        console.log(posts);
      } catch (error) {
        console.error("Failure fetching user posts:", error);
      }
    }
    fetchUserPosts(user);
  }, []);

  const handleComment = async (postId: number, userId: number, content: string): Promise<Comment> => {
    try {
      const newComment = await commentOnPost(postId, userId, content);
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
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
            onLike={() => likePost(item.id, item.user.id)}
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