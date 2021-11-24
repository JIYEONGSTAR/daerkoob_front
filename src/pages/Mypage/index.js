import React, { useEffect } from "react";
import { useHistory } from "react-router";
import useCurrentUser from "Hooks/useCurrentUser";
import "pages/Mypage/index.scss";

const Mypage = () => {
  const { currentUser } = useCurrentUser();

  const history = useHistory();

  //이렇게 useEffect쓰는게 아닌가?
  useEffect(() => {
    if (!currentUser) history.push("/auth");
  }, [currentUser]);

  return (
    <div className="mypage">
      <h1>mypage</h1>
      <h1> {currentUser.nickName}의친구목록</h1>
      {currentUser.friends.map((d) => (
        <div>{d.friendNickName}</div>
      ))}
    </div>
  );
};

export default Mypage;
