import React from 'react'
import { useParams } from 'react-router-dom';

function User() {
  const {userId} = useParams();
  return (<div>UserId {userId}</div>)
}

export default User;