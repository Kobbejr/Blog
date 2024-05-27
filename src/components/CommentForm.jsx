import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const { addComment } = useBlogContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(postId, { text: commentText });
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        className="comment-input"
      />
      <button type="submit" className="commentButton">
        +
      </button>
    </form>
  );
};

export default CommentForm;
