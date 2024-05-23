import React, { useState } from "react";
import { useBlogContext } from "../context/BlogContext";

const EditForm = ({
  postId,
  initialTitle,
  initialContent,
  initialImageUrl,
  handleEdit,
  setIsEditing,
}) => {
  const [formData, setFormData] = useState({
    title: initialTitle,
    content: initialContent,
    image: null,
  });

  const { uploadImage } = useBlogContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = initialImageUrl;
    if (formData.image) {
      imageUrl = await uploadImage(formData.image);
    }
    handleEdit({ title: formData.title, content: formData.content, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="form-textarea"
          rows="6"
          placeholder="Enter content"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="button-group">
        <button type="submit" className="button button-primary">
          Save Changes
        </button>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
