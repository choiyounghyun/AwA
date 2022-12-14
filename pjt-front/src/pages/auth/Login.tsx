import React, { FormEvent, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Login.module.css";
import { LoginData } from "./../../api/apiInterface";
import { loginDefaultData } from "./../../defaultData";
import api from "../../api/api";
import { loadingActions } from "../../store";
import { User } from "../../Interface";
import { setCookie } from "../../cookie";

interface Props {
  getUserData: Function;
}

function Login({ getUserData }: Props): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );
  const [loginForm, setLoginForm] = useState<LoginData>(loginDefaultData);

  const loginRequest = async () => {
    dispatch(loadingActions.toggle());

    try {
      const response = await api.auth.login(loginForm);
      dispatch(loadingActions.toggle());
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.accessToken);
        setCookie("refresh_token", response.data.refreshToken);
        getUserData();
        navigate("/");
      }
    } catch (err) {
      alert("아이디와 비밀번호가 맞는지 확인해주세요!");
      dispatch(loadingActions.toggle());
      console.error(err);
    }
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginRequest();
  };

  const moveSignUp = () => {
    navigate("/auth/signup");
  };

  const moveFindPw = async (e: any) => {
    e.preventDefault();
    navigate("/auth/findpw");
  };

  useEffect(() => {
    if (!!userObject) {
      navigate("/");
    }
  }, [navigate, userObject]);

  return (
    <div className="d-flex justify-content-center">
      <div className={style.container}>
        <div className={style.title}>로그인</div>
        <form onSubmit={onSubmit} className={style.login}>
          <div className={style.inputContainer}>
            <input
              name="id"
              type="email"
              id="id"
              value={loginForm.id}
              onChange={onChange}
              className={style.loginInput}
              required
            />
            <label htmlFor="id" className={style.label}>
              아이디
            </label>
            <div className={style.bar}></div>
          </div>
          <div className={style.inputContainer}>
            <input
              name="pw"
              type="password"
              id="password"
              value={loginForm.pw}
              onChange={onChange}
              className={style.loginInput}
              required
            />
            <label htmlFor="password" className={style.label}>
              비밀번호
            </label>
            <div className={style.bar}></div>
          </div>
          <div className={style.buttonContainer}>
            <button>
              <input
                type="submit"
                value="로그인"
                className={style.loginSubmit}
                tabIndex={-1}
              />
            </button>
            <br />
            <div className={style.buttonContainer}>
              <button
                type="button"
                onClick={moveSignUp}
                className={style.loginSubmit}
              >
                <div className={style.loginSubmitContent}>회원가입</div>
              </button>
            </div>

            <button
              type="button"
              onClick={moveFindPw}
              className={style.loginSubmit}
            >
              <div className={style.loginSubmitContent}>비밀번호찾기</div>
            </button>
            <br />
          </div>
        </form>
        <div className={style.socialButton}>
          <a href="https://awa24.site:8081/oauth2/authorization/google">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/sang9203%40naver.com%2Fbtn_google_signin_dark_normal_web.png?alt=media&token=fb8a6c74-789f-4d08-b312-23b0c47b1bba"
              alt="구글"
              className={style.socialImg}
            />
          </a>
          {/* <a href="https://awa24.site:8081/oauth2/authorization/naver">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/sang9203%40naver.com%2FbtnG_%EC%95%84%EC%9D%B4%EC%BD%98%EC%82%AC%EA%B0%81.png?alt=media&token=057ae52c-b9eb-48a8-a670-9943699d619d"
              alt="네이버"
              className={style.socialImg}
            />
          </a> */}
          <a href="https://awa24.site:8081/oauth2/authorization/kakao">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/sang9203%40naver.com%2Fkakao_login_large_narrow.png?alt=media&token=0db71f7b-7e95-4e98-8a31-e4dfa469c1cb"
              alt="카카오"
              className={style.socialImg}
            />
          </a>
        </div>
        <div className={style.blank}></div>
      </div>
    </div>
  );
}

export default Login;
