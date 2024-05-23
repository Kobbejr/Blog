import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const { addPost, uploadImage, currentUser } = useBlogContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, image } = formData;
    if (!title.trim() || !content.trim()) return;

    try {
      const imageUrl = image ? await uploadImage(image) : "";
      const newPost = { title, content, author: currentUser.email, imageUrl };
      addPost(newPost);
      setFormData({ title: "", content: "", image: null });
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  return (
    <form className="post-form-container" onSubmit={handleSubmit}>
      <div className="post-content">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input-field"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          className="input-field"
        />
        <input
          type="file"
          id="fileInput"
          name="image"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="file-upload-button"
          onClick={() => document.getElementById("fileInput").click()}
        >
          Välj fil
        </button>
        <button type="submit" className="buttons">
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
