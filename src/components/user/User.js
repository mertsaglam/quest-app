import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AvatarComponent from "../avatar/AvatarComponent";
import UserActivity from "../userActivity/UserActivity";

function User() {
  const [avatarId, setAvatarId] = useState();
  const { userId } = useParams();

  const getAvatarId = async () => {
    try {
      const userId = localStorage.getItem("currentUser");
      const response = await fetch(`/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("tokenKey"),
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        localStorage.setItem("currentAvatar", result.avatarId);
        setAvatarId(result.avatarId);
      } else {
        console.log(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  useEffect(() => {
    getAvatarId();
  }, []);

  useEffect(() => {
    console.log("avatarId has changed:", avatarId);
  }, [avatarId]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
    },
    item: {
      flex: 1,
      margin: 10,
    },
  };

  return (
    <div>
      <div>UserId {userId}</div>
      <div style={styles.container}>
        <div style={styles.item}>
         {avatarId?  <AvatarComponent avatarId={avatarId}  /> : ""}
        </div>
        <div style={styles.item}>
          <UserActivity />
        </div>
      </div>
    </div>
  );
}

export default User;
