import React from "react";
import { useState, Dispatch } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
// import api from "../api/api";
// import axios from "axios";
import { User } from "./../Interface";

interface Props {
  userEmail: string | null | undefined;
  setUserObject: Dispatch<React.SetStateAction<User | null>>;
}

function Navigation({ userEmail, setUserObject }: Props): JSX.Element {
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const navigate = useNavigate();

  const logoutRequest = async () => {
    setUserObject(null);
    navigate("/preview");
    localStorage.setItem("token", "");
    // const response = await axios({
    //   url: api.auth.logout(),
    //   method: "post",
    //   data: localStorage.getItem("token"),
    // });
    // if (response.status === 200) {
    //   navigate("/preview");
    // }
  };

  const Logout = () => {
    logoutRequest();
  };

  return (
    <nav className={style.navBox}>
      <div
        className={!menuToggle ? style.bugerMenu : style.menu}
        onClick={() =>
          menuToggle ? setMenuToggle(false) : setMenuToggle(true)
        }
      >
        <div className={style.burgerLine1}></div>
        <div className={style.burgerLine2}></div>
        <div className={style.burgerLine3}></div>
      </div>

      <div
        className={[
          style.menuBox,
          !menuToggle ? style.menuBoxHidden : style.menuBoxVisible,
        ].join(" ")}
      >
        {/* NavBar */}
        <div className={style.navList}>
          <div className={style.left}>
            <NavLink
              to="/auction"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Auction
            </NavLink>
            <NavLink
              to="/notice"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Notice
            </NavLink>
          </div>
          <div className={style.center}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              AwA 이미지
            </NavLink>
          </div>
          {userEmail ? (
            // 로그인 했을 때
            <div className={style.right}>
              <div className={style.profile}>
                <NavLink
                  to={`/profile/${userEmail}`}
                  className={({ isActive }) => (isActive ? style.active : "")}
                  onClick={() =>
                    menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                  }
                >
                  {userEmail}
                </NavLink>
                <p>님 환영합니다!</p>
              </div>
              <button onClick={Logout} className={style.btn}>
                Logout
              </button>
            </div>
          ) : (
            // 로그인 안 했을 때
            <div className={style.right}>
              <NavLink
                to="/auth/signup"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                SignUp
              </NavLink>
              <NavLink
                to="/auth/login"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Login
              </NavLink>
            </div>
          )}

          {/* <button>
            <NavLink to="/알림모달창">알림이모티콘</NavLink>
          </button>
          <button>
            <NavLink to="/검색바컴포넌트">검색이모티콘</NavLink>
          </button> */}
        </div>
        {/* bugerMenu */}
        <div>
          <div className={style.bugerList}>
            <NavLink
              to="/auction"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Auction
            </NavLink>
            <NavLink
              to="/notice"
              className={({ isActive }) => (isActive ? style.active : "")}
              onClick={() =>
                menuToggle ? setMenuToggle(false) : setMenuToggle(true)
              }
            >
              Notice
            </NavLink>
          </div>
          {userEmail ? (
            // 로그인 했을 때
            <div className={style.bugerList}>
              <NavLink
                to={`/profile/${userEmail}`}
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Profile
              </NavLink>
              {/* <NavLink
                to="/auth/logout"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Logout
              </NavLink> */}
              <button onClick={Logout} className={style.btn}>
                Logout
              </button>
            </div>
          ) : (
            // 로그인 안 했을 때
            <div className={style.bugerList}>
              <NavLink
                to="/auth/signup"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                SignUp
              </NavLink>
              <NavLink
                to="/auth/login"
                className={({ isActive }) => (isActive ? style.active : "")}
                onClick={() =>
                  menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
