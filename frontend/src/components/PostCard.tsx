import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from "react-native";
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

  const openComments = () => setIsCommentModalOpen(!isCommentModalOpen);
  const openLikes = () => setIsLikeModalOpen(!isLikeModalOpen);

  return (
    <View>
      <View>
        <Image 
          source={{ uri: user.avatar }} 
          style={{ width: 50, height: 50 }}
        />
        <Text>{user.username}</Text>
      </View>
      {imageUrl &&
        <Image 
          source={{ uri: imageUrl }}
          style={{ width: 300, height: 400 }}  
        />
      }
      <View>
        <TouchableOpacity onPress={() => onLike(id, user.id)}>
          <Text>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openComments()}>
          <Text>💬</Text>
        </TouchableOpacity>
      </View>
      <Text>{title}</Text>
      <Text>{content}</Text>
      <View>
        <InputField 
          placeholder="Comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button 
          title="Send"
          onPress={() => {
            onComment(id, user.id, newComment)
            setNewComment("")
          }}
        />
      </View>

      <Modal
        visible={isCommentModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={openComments}
      >
        <View>
          <View>
            <Text>Comments</Text>
            <ScrollView>
              {comments.map((comment, index) => (
                <View key={index}>
                  <Image 
                    source={{ uri: comment.user.avatar }}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text>{comment.user.username}</Text>
                  <Text>{comment.content}</Text>
                  <Text>{createdAt}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={openComments}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isLikeModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={openLikes}
      >
        <View>
          <View>
            <Text>Likes</Text>
            <ScrollView>
              {likes.map((like, index) => (
                <View key={index}>
                  <Image 
                    source={{ uri: like.user.avatar }}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text>{like.user.username}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={openLikes}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  ); 
};

export default PostCard;