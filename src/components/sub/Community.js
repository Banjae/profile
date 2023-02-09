import React, { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";

const Community = () => {
  // 데모용 데이터 생성
  const initPost = [
    {
      title: "hello",
      content: "hello world",
    },
    {
      title: "점심",
      content: "점메추",
    },
    {
      title: "Todo",
      content: "TypeScript 공부하기",
    },
  ];

  const [posts, setPosts] = useState(initPost);

  const input = useRef(null);
  const contents = useRef(null);

  const createPost = () => {
    // 앞자리 및 뒷자리 공백을 제거하기 위해 trim() 사용
    if (
      input.current.value.trim() === "" ||
      contents.current.value.trim() === ""
    ) {
      alert("제목과 본문을 입력하세요.");
    }
    // 새로운 포스트 등록
    // state 업데이트라서 화면 갱신
    setPosts([
      ...posts,
      { title: input.current.value, content: contents.current.value },
    ]);
    alert("등록 완료");
    resetPost();
  };

  const resetPost = () => {
    input.current.value = "";
    contents.current.value = "";
  };

  return (
    <Layout title={"Community"}>
      {/* 입력폼 */}
      <div className="inputBox">
        <form>
          <input type="text" placeholder="제목을 입력하세요" ref={input} />
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="내용을 입력하세요"
            ref={contents}
          ></textarea>
          <div className="btnSet">
            <button type="button" onClick={resetPost}>
              Cancle
            </button>
            <button type="button" onClick={createPost}>
              Write
            </button>
          </div>
        </form>
      </div>
      {/* 리스트 출력 */}
      <div className="showBox">
        {/* 목로을 출력할 떈 map, key */}
        {posts.map((item, idx) => {
          return (
            <article key={idx}>
              <div className="txt">
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </div>
              <div className="btnSet">
                <button>EDIT</button>
                <button>DELETE</button>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Community;
