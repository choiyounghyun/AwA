import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
import { User } from "./../Interface";
import { useDispatch, useSelector } from "react-redux";
import { userObjectActions } from "../store";
import { GrSearch } from "react-icons/gr";
import SearchComponent from "./SearchComponent";

function Navigation(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userObject = useSelector(
    (state: { userObject: User | null }) => state.userObject
  );

  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  const logoutRequest = async () => {
    dispatch(userObjectActions.logout());
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
    <div className="sticky-top">
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
                <img
                  src="./img/logo.png"
                  alt="로고"
                  className={style.logoImg}
                />
              </NavLink>
            </div>
            {userObject ? (
              // 로그인 했을 때
              <div className={style.right}>
                <div className={style.profile}>
                  <NavLink
                    to={`/profile/${userObject.email}`}
                    className={({ isActive }) => (isActive ? style.active : "")}
                    onClick={() =>
                      menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                    }
                  >
                    {userObject.nickname}
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
            <input type="checkbox" id="searchBar" />
            <label htmlFor="searchBar">
              <GrSearch className={style.searchIcon} />
            </label>
            <div className={style.navSearchBar}>
              <SearchComponent />
            </div>
            {/* <button>
            <NavLink to="/알림모달창">알림이모티콘</NavLink>
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
            {userObject ? (
              // 로그인 했을 때
              <div className={style.bugerList}>
                <NavLink
                  to={`/profile/${userObject.email}`}
                  className={({ isActive }) => (isActive ? style.active : "")}
                  onClick={() =>
                    menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                  }
                >
                  Profile
                </NavLink>
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
    </div>
  );
}

export default Navigation;