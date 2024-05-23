import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useInput from "../hooks/useInput";

const ChangeUsernameForm = () => {
  const { currentUser, setUserName } = useContext(AuthContext);
  const {
    value: newUsername,
    onChange: handleUsernameChange,
    reset: resetUsername,
  } = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setUserName(newUsername);

      resetUsername();
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div>
      <h2>Change Username</h2>
      <form onSubmit={handleSubmit}>
        <label>New Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={handleUsernameChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ChangeUsernameForm;
