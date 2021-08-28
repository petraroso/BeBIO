import React, { useState } from "react"
import Navigation from "../Navigation"

import PILoggedOut from "../Images/PILoggedOut"
import ProfileNav from "../Images/ProfileNav"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { FiMenu } from "react-icons/fi"
import { IoClose } from "react-icons/io5"
import { Link } from "gatsby"
import { navs as navTabs } from "../../constants/const"
import LogoImage from "../Images/LogoImage"


//import { colors } from "react-select/src/theme"

const NavigationHeader = ({ activeTab }) => {
  const loggedIn = () => !!myLocalStorage.getItem("loggedIn")

  if (!loggedIn()) {
    myLocalStorage.removeItem("follower")
  }

  const profile = "Profile"
  const login = "Login"

  let keysToRemove = ["loggedIn", "owner"]

  const [user, setUser] = useState(!!myLocalStorage.getItem("loggedIn"))

  const [hamburgerNav, setHamburgerNav] = useState(false)
  const [check, setCheck] = useState(true)
  let hamburger

  const changeHamburger = () =>
    hamburgerNav === false ? setHamburgerNav(true) : null

  let pic = myLocalStorage.getItem("loggedIn")

  if (hamburgerNav) {
    hamburger = (
      <>
        {check ? (
          <>
            <IoClose
              onClick={() => setCheck(false)}
              style={{ marginBottom: "-5px", height: "35px", width: "35px" }}
            />
            {check === false ? null : (
              <ul className={styles.links}>
                {navTabs.map(({ tab, to }) => (
                  <Link to={to}>
                    <li className={tab === activeTab ? styles.active : ""}>
                      {tab}
                    </li>
                  </Link>
                ))}

                {loggedIn() && (
                  <Link to={"/profile"}>
                    <li className={profile === activeTab ? styles.active : ""}>
                      {profile}
                    </li>
                  </Link>
                )}

                <Link to={"/login"}>
                  <li
                    className={login === activeTab ? styles.active : ""}
                    onClick={
                      loggedIn()
                        ? () =>
                            keysToRemove.forEach(k =>
                              myLocalStorage.removeItem(k)
                            )
                        : () => {}
                    }
                  >
                    {loggedIn() ? "Logout" : login}
                  </li>
                </Link>
              </ul>
            )}
          </>
        ) : (
          <FiMenu
            onClick={() => setCheck(true)}
            style={{ marginBottom: "-5px", height: "35px", width: "35px" }}
          />
        )}

        {check === false ? null : (
          <ul className={styles.links}>
            {navTabs.map(({ tab, to }) => (
              <Link to={to}>
                <li className={tab === activeTab ? styles.active : ""}>
                  {tab}
                </li>
              </Link>
            ))}

            {loggedIn() && (
              <Link to={"/profile"}>
                <li className={profile === activeTab ? styles.active : ""}>
                  {profile}
                </li>
              </Link>
            )}

            <Link to={"/login"}>
              <li
                className={login === activeTab ? styles.active : ""}
                onClick={
                  loggedIn()
                    ? () =>
                        keysToRemove.forEach(k => myLocalStorage.removeItem(k))
                    : () => {}
                }
              >
                {loggedIn() ? "Logout" : login}
              </li>
            </Link>
          </ul>
        )}
      </>
    )
  } else {
    hamburger = (
      <FiMenu style={{ marginBottom: "-5px", height: "35px", width: "35px" }} />
    )
  }
  return (
    <div className={styles.container}>
      <section className={styles.navigationHeader}>

        <div className={styles.logo1}>
          <div className={styles.div1}>
            <Link to={"/"}>
              <LogoImage />
            </Link>
          </div>
          <div className={styles.div2}>
            <Link to={"/"}>
              <span className={styles.logoText}>BeBIO</span>
            </Link>
          </div>
        </div>

        <div className={styles.navigation}>
          <Navigation activeTab={activeTab} />
        </div>
        <button className={styles.hamburger} onClick={changeHamburger}>
          {hamburger}
        </button>
        <div className={styles.profileNav}>
          {pic ? (
            <Link to={"/profile"}>
              <ProfileNav prop={pic} />{" "}
            </Link>
          ) : (
            <Link to={`/login`}>
              <PILoggedOut />{" "}
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
export default NavigationHeader
