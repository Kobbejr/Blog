import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const defaultPosts = [
    {
      id: 1,
      title: "A Merc's Manifesto",
      author: "chimichangaconnoisseur@deadpool.com",
      content: `Hey there, world! Welcome to my little slice of insanity on the interwebs. I'm Deadpool, your friendly neighborhood merc with a mouth, here to spice up your boring day with a dash of chaos and a sprinkle of sarcasm.

        In this blog, I'll be sharing all sorts of wacky adventures, random thoughts, and maybe even a few life lessons (if I'm feeling generous). So buckle up, folks, 'cause things are about to get wild!

        Stick around for more antics, musings, and maybe even a chimichanga recipe or two. Trust me, you won't want to miss it!

        Stay tuned, my fellow weirdos. Deadpool out!`,

      comments: [],
      imageUrl: "",
    },
  ];

  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : defaultPosts;
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const uploadImage = async (image) => {
    const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const addPost = (newPost) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      { ...newPost, id: Date.now(), comments: [] },
    ]);
  };

  const editPost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const addComment = (postId, newComment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { ...newComment, user: currentUser.email },
              ],
            }
          : post
      )
    );
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : post
      )
    );
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        currentUser,
        addPost,
        editPost,
        deletePost,
        addComment,
        uploadImage,
        deleteComment, // Lägg till deleteComment i kontextens värde
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
