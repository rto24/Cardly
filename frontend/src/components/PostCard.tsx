import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from "react-native";
import InputField from "./InputField";
import Button from "./Button";
import { Posts } from "../types/types";

const PostCard: React.FC<Posts> = ({
  id,
  userId,
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
  const [ comment, setComment ] = useState<string>("");

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
        <TouchableOpacity onPress={() => onLike(id, userId)}>
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
          value={comment}
          onChangeText={setComment}
        />
        <Button 
          title="Send"
          onPress={() => onComment(id, userId, content)}
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
                <View>
                  <Image source={{ uri: userAvatar }}/>
                  <Text key={index}>{comment.content}</Text>
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
                <View>
                  <Image source={{ uri: userAvatar }}/>
                  <Text key={index}>{like.username}</Text>
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