import React from 'react'
import { useParams } from 'react-router-dom';
import Avatar from "../avatar/AvatarComponent";
import AvatarComponent from '../avatar/AvatarComponent';

function User() {
  const {userId} = useParams();
  return (<div>UserId {userId}
  <AvatarComponent avatarId = {0} />  </div>)
}

export default User;