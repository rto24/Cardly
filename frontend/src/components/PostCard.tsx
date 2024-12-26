import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView } from "react-native";
import InputField from "./InputField";
import Button from "./Button";
import { Comment, Like, Posts } from "../types/types";
import { getCommentsOnPost, getLikesOnPost } from "../services/postService";

const PostCard: React.FC<Posts> = ({
  id,
  userId,
  title,
  user,
  content,
  imageUrl,
  onLike,
  onComment,
  createdAt,
}) => {
  
  const [ isCommentModalOpen, setIsCommentModalOpen ] = useState<boolean>(false);
  const [ isLikeModalOpen, setIsLikeModalOpen ] = useState<boolean>(false);
  const [ likes, setLikes ] = useState<Like[]>([]);
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ newComment, setNewComment ] = useState<string>("");

  useEffect(() => {
    const fetchLikesOnPost = async () => {
      try {
        const data = await getLikesOnPost(id);
        setLikes(data);
      } catch(error) {
        console.error(`Error fetching likes for post ${id}:`, error);
      }
    };
    fetchLikesOnPost(); 
  }, [id]);

  useEffect(() => {
    const fetchCommentsOnPost = async () => {
      try {
        const data = await getCommentsOnPost(id);
        setComments(data);
      } catch (error) {
        console.error(`Error fetching comments for post ${id}:`, error);
      }
    };
    fetchCommentsOnPost();
  }, [id]);

  const handleCommentPost = async () => {
    try {
      if (newComment === "") return;
      const comment = await onComment(id, userId, newComment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };


  const openComments = () => setIsCommentModalOpen(!isCommentModalOpen);
  const openLikes = () => setIsLikeModalOpen(!isLikeModalOpen);

  return (
    <View className="bg-white border border-gray-300 rounded-lg mb-4">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <Image
          source={{ uri: user.avatar }}
          className="w-12 h-12 rounded-full"
        />
        <Text className="ml-4 font-bold text-gray-900">{user.username}</Text>
      </View>

      {/* Post Image */}
      {imageUrl && (
      <View className="flex justify-start items-center h-auto">
        <Image
          source={{ uri: imageUrl }}
          className="h-96 w-full"
          resizeMode="contain"
        />
      </View>
      )}

      {/* Action Buttons */}
      <View className="flex-row justify-between px-4 py-2">
        <TouchableOpacity onPress={() => onLike(id, user.id)}>
          <Text className="text-2xl">♡</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openComments}>
          <Text className="text-2xl">💬</Text>
        </TouchableOpacity>
      </View>

      {/* Post Title & Content */}
      <View className="px-4 pb-4">
        <Text className="font-semibold text-gray-800">{title}</Text>
        <Text className="text-gray-700 mt-1">{content}</Text>
      </View>

      {/* Comment Input */}
      <View className="px-4 pb-4">
        <InputField
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={setNewComment}
          className="border border-gray-300 rounded-full px-4 py-2"
        />
        <Button
          title="Post"
          onPress={() => {
            // onComment(id, user.id, newComment);
            // setNewComment("");
            handleCommentPost();
          }}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-full"
        />
      </View>

       {/* Comment Modal */}
       <Modal
        visible={isCommentModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={openComments}
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Header */}
          <View className="p-4 border-b border-gray-300">
            <Text className="text-xl font-bold text-center">Comments</Text>
          </View>

          {/* Comments List */}
          <ScrollView className="flex-1 p-4">
            {comments.map((comment, index) => (
              <View key={index} className="flex-row items-start mb-4">
                <Image
                  source={{ uri: comment.user.avatar }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="ml-3 flex-1">
                  <Text className="font-bold text-gray-900">{comment.user.username}</Text>
                  <Text className="text-gray-700">{comment.content}</Text>
                  <Text className="text-xs text-gray-500">{createdAt}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            className="p-4 border-t border-gray-300 bg-gray-100"
            onPress={openComments}
          >
            <Text className="text-center text-gray-800">Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Likes Modal */}
      <Modal
        visible={isLikeModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={openLikes}
      >
        <View className="flex-1 bg-white">
          <View className="p-4 border-b border-gray-300">
            <Text className="text-xl font-bold">Likes</Text>
          </View>
          <ScrollView className="flex-1 p-4">
            {likes.map((like, index) => (
              <View key={index} className="flex-row items-center mb-4">
                <Image
                  source={{ uri: like.user.avatar }}
                  className="w-10 h-10 rounded-full"
                />
                <Text className="ml-3 font-bold text-gray-900">{like.user.username}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            className="p-4 border-t border-gray-300 bg-gray-100"
            onPress={openLikes}
          >
            <Text className="text-center text-gray-800">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


export default PostCard;