import React, { useRef, useState } from "react";
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
  const titleEdit = useRef(null);
  const contentEdit = useRef(null);

  const [allowed, setAllowed] = useState(true);

  const createPost = () => {
    // 앞자리 및 뒷자리 공백을 제거하기 위해 trim() 사용
    if (
      input.current.value.trim() === "" ||
      contents.current.value.trim() === ""
    ) {
      resetPost();
      return alert("제목과 본문을 입력하세요.");
    }
    // 새로운 포스트 등록
    // state 업데이트라서 화면 갱신
    setPosts([
      ...posts,
      { title: input.current.value, content: contents.current.value },
    ]);
    // 입력 저장후 초기화
    resetPost();
    // 업데이트 가능
    setAllowed((prev) => true);
    // 모든 목록 닫아주기
    setPosts((prev) => {
      const arr = [...prev];
      const updateArr = arr.map((item, index) => {
        item.enableUpdate = false;
        return item;
      });
      return updateArr;
    });
  };

  const resetPost = () => {
    input.current.value = "";
    contents.current.value = "";
  };

  // 수정기능
  const enableUpdate = (idx) => {
    if (!allowed) return;
    setAllowed(false);
    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.enableUpdate = true;
        }
        return item;
      })
    );
  };

  // 삭제기능
  const deletePost = (idx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    setPosts(posts.filter((item, index) => idx !== index));
  };

  // 수정 저장
  const savePost = (idx) => {
    if (!titleEdit.current.value.trim() || !contentEdit.current.value.trim()) {
      titleEdit.current.value = "";
      contentEdit.current.value = "";
      return alert("수정할 제목과 내용을 입력해주세요");
    }
    setPosts(
      posts.map((item, index) => {
        setAllowed(true);
        if (idx === index) {
          item.title = titleEdit.current.value;
          item.content = contentEdit.current.value;
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };

  // 수정 취소
  const cancelPost = (idx) => {
    setAllowed(true);
    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };

  return (
    <Layout title={"Community"}>
      {/* 입력폼 */}
      <div className="inputBox">
        <form>
          <input type="text" placeholder="제목을 입력해주세요" ref={input} />
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="내용을 입력해주세요"
            ref={contents}
          ></textarea>
          <div className="btnSet">
            <button type="button" onClick={resetPost}>
              Reset
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
              {item.enableUpdate ? (
                /* 업데이트일때 보여줄 JSX */
                <>
                  <div className="txt">
                    <input
                      type="txt"
                      defaultValue={item.title}
                      placeholder="제목을 입력해주세요"
                      ref={titleEdit}
                    />
                    <br />
                    <textarea
                      cols="30"
                      rows="5"
                      defaultValue={item.content}
                      placeholder="내용을 입력해주세요"
                      ref={contentEdit}
                    />
                    <div className="btnSet">
                      <button onClick={() => savePost(idx)}>Save</button>
                      <button onClick={() => cancelPost(idx)}>Cancle</button>
                    </div>
                  </div>
                </>
              ) : (
                /* 목록일때 보여줄 JSX */
                <>
                  <div className="txt">
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                  </div>
                  <div className="btnSet">
                    {/* 업데이트기능 */}
                    <button onClick={() => enableUpdate(idx)}>Edit</button>
                    {/* 삭제기능 */}
                    <button onClick={() => deletePost(idx)}>Delte</button>
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default Community;
