import React, { useState } from "react";
import Layout from "../common/Layout";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment/moment";
import "moment/locale/ko";

const Schedule = () => {
  const getLocalPost = () => {
    const data = localStorage.getItem("post");
    if (data === null) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };

  const [todoData, setTodoData] = useState(getLocalPost);

  const [date, setDate] = useState(new Date());

  const publicFolder = process.env.PUBLIC_URL;

  return (
    <Layout title={"Schedule"}>
      <Calendar
        calendarType="US"
        onChange={setDate}
        tileContent={({ date, view }) => {
          let html = [];
          //   date          :  Mon Feb 28 2022 00:00:00 GMT+0900 (한국 표준시)
          //   item. date :  "2023-02-07"
          //   각각의 날짜 영역에 출력하고 싶은 내용 작성.
          if (
            todoData.find((item, index) => {
              // 현재 date 는 표맷이 다릅니다.
              return item.timestamp === moment(date).format("YYYY-MM-DD");
            })
          ) {
            html.push(
              <img
                key={`starBucks_${moment(date)}}`}
                src={`${publicFolder}/images/marker.png`}
                alt="icon"
                style={{ width: 20, height: 20 }}
              />
            );
          }
          return <div>{html}</div>;
        }}
      />
      <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
      <div>{todoData.map((item, index) => item.title)}</div>
    </Layout>
  );
};

export default Schedule;
