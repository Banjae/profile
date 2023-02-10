import React, { useRef, useState } from "react";

// 01. useform import
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Layout from "../common/Layout";
import CommunityCard from "./CommunityCard";

// 02. form 요소 항목별 에러 체크 정의
const schema = yup.object({
  title: yup.string().trim().required("제목을 입력해주세요"),
  content: yup.string().trim().required("내용을 입력해주세요"),
});

const Community = () => {
  // 03. useForm 생성
  // register : 각 form 의 name 설정
  // handleSubmit : onSubmit 할때 실행
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // yup과 연결
    resolver: yupResolver(schema),
  });
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

  const titleEdit = useRef(null);
  const contentEdit = useRef(null);

  const [allowed, setAllowed] = useState(true);

  const createPost = (data) => {
    setPosts([...posts, data]);
    // 입력 저장후 초기화
    reset();
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
        <form onSubmit={handleSubmit(createPost)}>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            {...register("title")}
          />
          <span className="err">{errors.title?.message}</span>
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="내용을 입력해주세요"
            {...register("content")}
          ></textarea>
          <span className="err">{errors.content?.message}</span>
          <div className="btnSet">
            <button type="reset">Reset</button>
            <button type="submit">Write</button>
          </div>
        </form>
      </div>
      {/* 리스트 출력 */}
      <div className="showBox">
        {posts.map((item, idx) => {
          return (
            <CommunityCard
              key={idx}
              idx={idx}
              item={item}
              titleEdit={titleEdit}
              contentEdit={contentEdit}
              savePost={savePost}
              cancelPost={cancelPost}
              enableUpdate={enableUpdate}
              deletePost={deletePost}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Community;
