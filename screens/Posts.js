import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function Posts({
  posts = [],
  backendAdress,
  userToken,
  onRefresh,
  refreshKey,
  navigation,
}) {

  const [modalVisible, setModalVisible] = useState(null);
  const [commentVisible, setCommentVisible] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState({});
  const [list, setList] = useState(posts);

  useEffect(() => setList(posts), [posts]);
  const user = useSelector((state) => state.user.value);

  //liker un post
  const handleLike = (postId) => {
    fetch(`${backendAdress}/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken }),
    }).then(() => {
      if (onRefresh) onRefresh();
    });
  };

  // publier un commentaire
  const handleSendComment = (postId) => {
    const content = commentText.trim();
    if (!content) return;

    fetch(`${backendAdress}/posts/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken, content }),
    }).then(() => {
      setCommentText("");
      setCommentVisible(null);
      onRefresh();
    });
  };

  const handleDelete = (postId) => {
    fetch(`${backendAdress}/posts/${postId}/${userToken}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setModalVisible(null);
        if (data.result && onRefresh) onRefresh();
      })
  };

  return (
    <View style={{ paddingBottom: 20 }} key={refreshKey}>
      {posts.map((post, index) => {
        const isUser =
          (post.authorToken && userToken && post.authorToken === userToken) ||
          false;

        const avatar = post?.authorProfilePicture;

        const hasValidAvatar =
          typeof avatar === "string" &&
          (avatar.startsWith("http") ||
            avatar.startsWith("file://") ||
            avatar.startsWith("data:"));

        return (
          <View style={styles.card} key={post?._id || index}>
            <View style={styles.header}>
              <Image
                source={
                  hasValidAvatar
                    ? { uri: avatar }
                    : require("../assets/images/whiteUser.png")
                }
                key={avatar}
                style={styles.avatar}
              />

              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPress={() => {
                    if (post?.authorUsername === user?.username) {
                      navigation.navigate("UserProfil");
                    } else {
                      navigation.navigate("PublicProfile", {
                        userId: post?.author,
                        username: post?.authorUsername,
                        profilPicture: post?.authorProfilePicture,
                        statut: post?.authorStatut,
                      });
                    }
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text style={styles.username}>{post.authorUsername}</Text>
                    {post.authorStatut === "AUTEUR" && (
                      <Feather name="feather" size={18} color="#0E0E66" />
                    )}
                  </View>
                </TouchableOpacity>

                {isUser && (
                  <TouchableOpacity
                    onPress={() => setModalVisible(index)}
                    style={styles.dotsContainer}
                  >
                    <Text style={styles.dots}>...</Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.date}>
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text>{post?.content || ""}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => {
                  setLiked((prev) => ({
                    ...prev,
                    [post._id]: !prev[post._id],
                  }));
                  handleLike(post._id);
                }}
              >
                <FontAwesome
                  name={liked[post._id] ? "heart" : "heart-o"}
                  size={18}
                  color={liked[post._id] ? "#E63946" : "grey"}
                />
                <Text style={styles.actionCount}>
                  {post.likes?.length || 0} Likes
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  setCommentVisible(commentVisible === index ? null : index)
                }
              >
                <Text style={styles.actionText}>Commenter</Text>
              </TouchableOpacity>
            </View>

            {Array.isArray(post.comments) && post.comments.length > 0 && (
              <View style={styles.commentsContainer}>
                {post.comments.map((comment, i) => (
                  <View key={i} style={styles.commentItem}>
                    <Text style={styles.commentAuthor}>
                      {comment.authorUsername || "Utilisateur"} :
                    </Text>
                    <Text style={styles.commentText}>
                      {comment.content || ""}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {commentVisible === index && (
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Écrire un commentaire..."
                  value={commentText}
                  onChangeText={setCommentText}
                  returnKeyType="send"
                  onSubmitEditing={() => handleSendComment(post._id, index)}
                />
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={() => handleSendComment(post._id, index)}
                >
                  <Text style={{ color: "#fff" }}>Envoyer</Text>
                </TouchableOpacity>
              </View>
            )}

            <Modal
              transparent
              animationType="fade"
              visible={modalVisible === index}
              onRequestClose={() => setModalVisible(null)}
            >
              <Pressable
                style={styles.overlay}
                onPress={() => setModalVisible(null)}
              >
                <View style={styles.modal}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      handleDelete(post._id);
                      setModalVisible(null);
                    }}
                  >
                    <Text style={styles.deleteText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", margin: 10, padding: 12, borderRadius: 10 },
  header: { flexDirection: "row", alignItems: "flex-start" },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#E8DCCA",
  },
  headerRight: { marginLeft: 10, flex: 1 },
  username: { fontSize: 16, fontWeight: "bold", color: "#0E0E66" },
  dotsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dots: { fontSize: 22, color: "#0E0E66", fontWeight: "bold" },
  date: { marginTop: 4, color: "#666", fontSize: 12 },
  content: { marginTop: 10 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionBtn: { flexDirection: "row", alignItems: "center" },
  actionText: { color: "#0E0E66", fontWeight: "600" },

  commentsContainer: {
    marginTop: 8,
    paddingLeft: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentItem: { flexDirection: "row", marginTop: 4 },
  commentAuthor: { fontWeight: "bold", color: "#0E0E66", marginRight: 4 },
  commentText: { color: "#333" },

  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#0E0E66",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  deleteBtn: {
    backgroundColor: "#E63946",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  actionCount: { color: "#0E0E66", fontWeight: "600", marginLeft: 6 },
  LikeText: {},
});
