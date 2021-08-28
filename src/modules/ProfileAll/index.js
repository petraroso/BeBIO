import React from "react"
import ProfileContainer from "../ProfileContainer"
import { navigate } from "gatsby"
import { myLocalStorage } from "../../helper"
import BlogHeader from "../../components/BlogHeader"
import styles from "./style.module.css"

const ProfileAll = () => {
  const user = myLocalStorage.getItem("loggedIn")
  const url = typeof window !== "undefined" ? window.location.pathname : ""
  // console.log("path" + url)

  if (url === "/profile") {
    if (!user) {
      setTimeout(() => navigate("/login"), 4000)
      return (
        <div className={styles.text}>
          You cannot view this page without login! <br />
          Redirecting to login page...
        </div>
      )
    }
  }

  return url === "/profile" ? (
    <ProfileContainer name={user} />
  ) : (
    <BlogHeader name={user} />
  )
}

export default ProfileAll
