import React, { useState, useEffect } from "react";
import useCurrentUser from "Hooks/useCurrentUser";
import api from "api/api";
const TransRegister = ({ toggle, isbn }) => {
  const [currentContent, setCurrentContent] = useState("");
  const { currentUser } = useCurrentUser();
  const [currentBook, setCurrentBook] = useState([]);
  const handleChange = (e) => {
    setCurrentContent(e.target.value);
  };
  const handleSubmit = async () => {
    console.log("필사는 댓글로저장할내용");
    console.log(currentUser.id);
    console.log(isbn);
    console.log(currentContent);
    const response = await api.post("transcription/register", null, {
      params: {
        userId: currentUser.id,
        //  isbn: isbn.replace(/(\s*)/g, ""),
        isbn: isbn,
        transcriptionContent: currentContent,
      },
    });
    console.log(response);
    if (response.data.flag) {
      alert("저장했습니다.");
      // history.push("/mypage");
    }
  };
  useEffect(() => {
    console.log("필사작성페이지 옴");

    const findBook = async () => {
      const response = await api.get(`book/find/${isbn}`);
      // console.log(response);
      setCurrentBook(response.data);
    };
    findBook();
    return () => {
      // cleanup;
    };
  }, []);

  return (
    <div>
      <div>책제목:{currentBook.title}</div>
      <textarea
        className="bookDatail__input"
        cols="40"
        rows="2"
        onChange={handleChange}
      ></textarea>
      <div>
        <button onClick={handleSubmit}>저장</button>
      </div>
      <div>
        {/* {currentContent} */}
        <button onClick={toggle}>다른사람 쓴 글 보러가기</button>
      </div>
    </div>
  );
};

export default TransRegister;
