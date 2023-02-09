import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import Layout from "../common/Layout";

const Join = () => {
  // 회원가입을 위한 정보를 한개의 객체로 처리
  //  정보 관리 초기 객체
  let initVal = {
    userid: "",
    email: "",
    password: "",
    repassword: "",
    phone: "",
    address: "",
    detailaddress: "",
    birthday: "",
    gender: "",
    interests: "",
    edu: "",
    hobby: null,
    comment: "",
  };
  const [val, setVal] = useState(initVal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({ ...val, [name]: value });
  };

  const handleRadio = (e) => {
    const { name, id } = e.traget;
    setVal({ ...val, [name]: id });
  };

  const handleCheck = (e) => {
    let isCheck = false;
    const { name } = e.target;
    const inputs = e.target.parentElement.querySelectorAll("input");
    let data = {};
    for (let item of inputs) {
      let { id, checked } = item;
      data[id] = checked;
      if (item.checked) isCheck = true;
    }
    setVal((prev) => {
      const obj = { ...prev };
      obj.hobby = data;
      return obj;
    });
    setVal((prev) => {
      const obj = { ...prev };
      obj[name] = isCheck;
      return obj;
    });
  };

  const handlePhone = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    value = value
      .replace(/[^0-9]/g, "") // 숫자를 제외한 모든 문자 제거
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    setVal({ ...val, [name]: value });
  };

  const handleBirthday = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    setVal({ ...val, [name]: value });
  };

  // Daum Post 연동 이벤트 핸들러
  // 우편번호 출력
  const open = useDaumPostcodePopup();

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setVal({ ...val, address: fullAddress });
  };

  // 에러 정보 관리 객체
  const [err, setErr] = useState({});

  const check = (_val) => {
    const errs = {};
    // 아이디 체크
    if (_val.userid.length < 5) {
      errs.userid = "아이디는 최소 5글자 이상 입력해주세요";
    }
    // 이메일 체크 / 정규표현식 이용 처리
    if (_val.email.length < 8 || !/@/.test(_val.email)) {
      errs.email = "이메일은 최소 8글자 이상, @를 포함해주세요";
    }
    // 비밀번호 체크
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[!@#$%^&*()_+]/;
    if (
      _val.userid.length < 5 ||
      !eng.test(_val.password) ||
      !num.test(_val.password) ||
      !spc.test(_val.password)
    ) {
      errs.password =
        "비밀번호는 최소 5글자 이상, 영문, 숫자, 특수문자를 모두 포함해주세요";
    }
    // 비밀번호 확인
    if (_val.repassword !== _val.password || !_val.repassword) {
      errs.repassword = "비밀번호가 일치하지 않습니다 ";
    }
    //  전화번호 체크
    if (_val.phone === "") {
      errs.phone = "전화번호를 입력해주세요";
    }
    // 주소 체크
    if (_val.address === "") {
      errs.address = "주소를 입력해주세요";
    }
    if (_val.detailaddress === "") {
      errs.detailaddress = "상세주소를 입력해주세요";
    }
    //  생년월일 체크
    if (_val.birthday === "") {
      errs.birthday = "생년월일을 입력해주세요.";
    }
    // 성별 체크
    if (_val.gender === "") {
      errs.gender = "성별을 선택해주세요";
    }
    // 관심사 체크
    if (!_val.interests) {
      errs.interests = "관심사를 하나이상 선택해주세요.";
    }
    // 학력 체크
    if (_val.edu === "") {
      errs.edu = "학력을 선택해주세요.";
    }
    // 기타 내용 체크
    if (_val.comment.length < 20) {
      errs.comment = "남기는 말을 20자 이상 작성해주세요";
    }
    return errs;
  };

  // 데이터 reset
  const handleReset = () => {
    setVal(initVal);
    setErr({});
  };

  // 전송 실행시 각 항목의 내용 체크
  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(check(val));
    // 각 항목 체크용 객체를 생성해 진행
  };

  //  에러 및 유효성 검사 결과 한개의 객체로 관리
  return (
    <Layout title={"Join"}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원가입</legend>
          <table>
            <caption>회원 가입 정보 입력</caption>
            <tbody>
              {/* 아이디  */}
              <tr>
                <th>
                  <label htmlFor="userid">User ID</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="아이디를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{err.userid}</span>
                </td>
              </tr>
              {/* 이메일 */}
              <tr>
                <th>
                  <label htmlFor="email">E-Mail</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="이메일 주소를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{err.email}</span>
                </td>
              </tr>
              {/* 비밀번호 */}
              <tr>
                <th>
                  <label htmlFor="password">Password</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{err.password}</span>
                </td>
              </tr>
              {/* 비밀번호 확인 */}
              <tr>
                <th>
                  <label htmlFor="repassword">Password Check</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{err.repassword}</span>
                </td>
              </tr>
              {/* 휴대폰 */}
              <tr>
                <th htmlFor="phone">Phone</th>
                <td>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="전화번호을 입력해주세요"
                    maxLength={13}
                    onChange={handlePhone}
                    value={val.phone}
                  />
                  <span className="err">{err.phone}</span>
                </td>
              </tr>
              {/* 주소 */}
              <tr>
                <th>
                  <label htmlFor="address">Address</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="주소를 입력해주세요."
                    onChange={handleChange}
                    readOnly
                    value={val.address}
                  ></input>
                  <button type="button" onClick={handleClick}>
                    주소 찾기
                  </button>
                  <span className="err">{err.address}</span>
                  <br />
                  <input
                    type="text"
                    id="detailaddress"
                    name="detailaddress"
                    placeholder="상세주소를 입력해주세요."
                    onChange={handleChange}
                  />
                  <span className="err">{err.detailaddress}</span>
                </td>
              </tr>
              {/* 생년월일 */}
              <tr>
                <th>
                  <label htmlFor="birthday">Birthday</label>
                </th>
                <td>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    onChange={handleBirthday}
                    maxLength={13}
                    value={val.birthday}
                  />
                  <span className="err">{err.birthday}</span>
                </td>
              </tr>
              {/* 성별 체크 */}
              <tr>
                <th>Gender</th>
                <td>
                  <label htmlFor="gender">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <label htmlFor="gender">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <span className="err">{err.gender}</span>
                </td>
              </tr>
              {/* 관심사 */}
              <tr>
                <th>Interests</th>
                <td>
                  <label htmlFor="sports">Sports</label>
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="music">Music</label>
                  <input
                    type="checkbox"
                    id="music"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="game">Game</label>
                  <input
                    type="checkbox"
                    id="game"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="etc">Etc</label>
                  <input
                    type="checkbox"
                    id="etc"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <span className="err">{err.interests}</span>
                </td>
              </tr>
              {/* 교육경력 */}
              <tr>
                <th>Education</th>
                <td>
                  <select name="edu" id="edu" onChange={handleChange}>
                    <option value="">학력을 선택하세요.</option>
                    <option value="step-1">초등학교 졸업</option>
                    <option value="step-2">중학교 졸업</option>
                    <option value="step-3">고등학교 졸업</option>
                    <option value="step-4">대학교 졸업</option>
                  </select>
                  <span className="err">{err.edu}</span>
                </td>
              </tr>
              {/* 기타의견 */}
              <tr>
                <th>
                  <label htmlFor="comment">Comment</label>
                </th>
                <td>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="5"
                    placeholder="남기는 말을 작성해주세요"
                    onChange={handleChange}
                  />
                  <span className="err">{err.comment}</span>
                </td>
              </tr>
              {/* 폼 전송 */}
              <tr>
                <th colSpan="2">
                  <input type="reset" value="Reset" onClick={handleReset} />
                  <input type="submit" value="Submit" />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
};

export default Join;
