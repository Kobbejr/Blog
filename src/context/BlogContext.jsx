import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    return (
      savedPosts || [
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
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

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

  const uploadImage = async (file) => {
    try {
      console.log("Uploading image to Firebase Storage:", file.name);
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Image URL:", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
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
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
