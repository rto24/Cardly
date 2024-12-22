import React, { useState } from "react";
import { TextInput, View, Image, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from "react-native";
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
}) => {
  
  const [ isCommentModalOpen, setIsCommentModalOpen ] = useState<boolean>(false);
  const [ isLikeModalOpen, setIsLikeModalOpen ] = useState<boolean>(false);

  const openComments = () => setIsCommentModalOpen(!isCommentModalOpen);
  const openLikes = () => setIsLikeModalOpen(!isLikeModalOpen);

  return (
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
        <TouchableOpacity onPress={() => openComments()}>
          <Text>💬</Text>
        </TouchableOpacity>
      </View>
      <Text>{title}</Text>
      <Text>{content}</Text>

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
                <View>
                  <Image source={{ uri: userAvatar }}/>
                  <Text key={index}>{comment.content}</Text>
                  <Text>{createdAt}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  ); 
};

export default PostCard;