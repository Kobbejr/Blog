import React, { useContext } from "react";
import PostList from "../components/PostList";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { userLoggedIn } = useContext(AuthContext);

  return (
    <div className="homePage">
      <h1>MERC WITH A BLOG</h1>
      {userLoggedIn ? (
        <PostList />
      ) : (
        <>
          <p className="welcomemessage">
            "Hey there, internet stranger! Wanna see the awesome posts? <br />
            Well, you gotta log in first. Yep, rules are rules (even for little
            ol' me). <br />
            So, suit up, log in, and let the chimichangas flow!"
          </p>
          <img
            className="deadpoolintro"
            src="public/images/deadpoolintro.jpg"
            alt="Welcoming picture of Deadpool"
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
