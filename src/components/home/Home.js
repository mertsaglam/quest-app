import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);
  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#dfe8f7",
      minHeight: "100vh",
    },
  };

  const refreshPosts = () => {
    fetch("/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, []);
  if (error) {
    return <div>Error from post</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={styles.container}>
        {localStorage.getItem("currentUser") != null && (
          <PostForm
            userName={localStorage.getItem("username")}
            userId={localStorage.getItem("currentUser")}
            refreshPosts={refreshPosts}
          />
        )}

        {postList.map((post) => (
          <Post
            likes={post.postLikes}
            postId={post.id}
            title={post.title}
            text={post.text}
            userName={post.userName}
            userId={post.userId}
          ></Post>
        ))}
      </div>
    );
  }
}

export default Home;
