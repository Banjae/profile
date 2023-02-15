import React, { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";
import CommunityCard from "./CommunityCard";
import axios from "axios";

// XSS 공격 방어 라이브러리
// https://www.npmjs.com/package/dompurify
// npm i dompurify
import DOMPurify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 01. useform import
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResponsivePie } from "@nivo/pie";

// 02. form 요소 항목별 에러 체크 정의
const schema = yup.object({
  title: yup.string().trim().required("제목을 입력해주세요"),
  content: yup.string().trim().required("내용을 입력해주세요"),
  timestamp: yup.string().required("날짜를 선택해 주세요"),
});

const Community = () => {
  // 03. useForm 생성
  // register : 각 form 의 name 설정
  // handleSubmit : onSubmit 할때 실행
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    // yup과 연결
    resolver: yupResolver(schema),
  });

  // 로컬에 저장된 내용을 가지고 온다.
  const getLocalPost = () => {
    const data = localStorage.getItem("post");
    if (data === null) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };

  const [posts, setPosts] = useState(getLocalPost);

  const [allowed, setAllowed] = useState(true);

  const createPost = (data) => {
    console.log(data);
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

    // 파일 업로드

    // const formData = new FormData();
    // formData.append("files", uploadFile);
    // await axios({
    //   method: "post",
    //   url: "/api/files/images",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
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
  const savePost = (data) => {
    setPosts(
      posts.map((item, index) => {
        setAllowed(true);
        if (parseInt(data.idx) === index) {
          item.title = data.title;
          item.content = data.content;
          item.timestamp = data.timestamp;
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };

  // 업데이트 취소
  const disableUpdate = (idx) => {
    setAllowed(true);
    setPosts(
      posts.map((item, index) => {
        if (index === idx) {
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };

  // 로컬에 저장
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(posts));
  }, [posts]);

  // 이미지 업로드
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef(null);
  const onChangeImg = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        // 임시 이미지 주소
        setImgFile(reader.result);
      };
    }
  };

  const quillRef = useRef(null);
  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 작동");
    // 1. 이미지를 저장할 input type="file" 을 생성한다.
    const input = document.createElement("input");
    // 2. 속성을 셋팅한다.
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // 에디터 이미지버튼을 클릭하면 input 이 클릭되도록 한다.
    input.click();
    // input 이 클릭되면 선택창이 나온다.
    // input 에 변화가 되면 이미지를 선택한 것이다.
    input.addEventListener("change", async () => {
      console.log("이미지 선택");
      const file = input.files[0];
      // 이미지를 변형한다.
      const formData = new FormData();
      // formData 의 형식은 키 - 벨류 구조
      formData.append("img", file);
      // formData 를 백엔드로 전송하고 주소를 받아온다.
      // try {
      //   const result = await axios.post(
      //     "http://localhost:3000/images",
      //     formData
      //   );
      //   console.log("성공시 , 백엔드가 보내주는 데이터", result.data.url);
      //   // 명세서 확인 필요(url: http://127.0.123.124/image/a.gif)
      //   const imgURL = result.data.url;
      //   // ReactQuill Editer 에 html 수정해서 삽입
      //   // userRef 를 이용해서 해당 요소를 선택한다.
      //   const editer = quillRef.current.getEditor();
      //   // 현재 에디터 커서 위치값을 파악
      //   const range = editer.getSelection();
      //   // 가져온 이미지를 삽입해서 출력한다.
      //   editer.insertEmbed(range.index, "image", imgURL);
      // } catch (error) {
      //   console.log("이미지 전송 실패");
      // }
    });
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            "formula",
          ], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // toolbar에 사용되는 tool format
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const handleChange = (value) => {
    setTag(value);
    // console.log(value);
    // register 로 등록하지 않고, 강제로 넣어주는 기능
    // 주의사항으로 "<p><br></p>" 이 내용 없는 것.
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const [tag, setTag] = useState("<p><b>안녕</b></p>");

  // 차트 데이터
  const chartData = [
    {
      id: "lisp",
      label: "lisp",
      value: 511,
      color: "hsl(174, 70%, 50%)",
    },
    {
      id: "erlang",
      label: "erlang",
      value: 272,
      color: "hsl(357, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 160,
      color: "hsl(154, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 79,
      color: "hsl(230, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 443,
      color: "hsl(45, 70%, 50%)",
    },
  ];

  return (
    <Layout title={"Community"}>
      {/* 차트 출력 */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
        ;
      </div>
      {/* HTML 태그 출력 */}
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(String(tag)) }}
      />
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
          <br />
          <input type="date" {...register("timestamp")} />
          <span className="err">{errors.timestamp?.message}</span>
          <br />
          {/* 이미지 업로드 하기 : 이미지 미리보기 연동 */}
          <div>
            <img src={imgFile} alt="프로필 이미지" />
            <input
              type="file"
              accept="image/*"
              onInput={onChangeImg}
              ref={imgRef}
            />
          </div>

          <div>
            <ReactQuill
              modules={modules}
              formats={formats}
              onChange={handleChange}
            />
          </div>

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
              savePost={savePost}
              enableUpdate={enableUpdate}
              deletePost={deletePost}
              disableUpdate={disableUpdate}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Community;
