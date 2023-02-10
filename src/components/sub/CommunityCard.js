import React from "react";

const CommunityCard = ({
  item,
  titleEdit,
  contentEdit,
  idx,
  savePost,
  cancelPost,
  enableUpdate,
  deletePost,
}) => {
  return (
    <>
      <article>
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
    </>
  );
};

export default CommunityCard;
