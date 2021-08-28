import React from "react"
import styles from "./style.module.css"
import ProfileNav from "../Images/ProfileNav"
import { myLocalStorage } from "../../helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import {Link} from "gatsby"

const ProfileAbout = ({ name, total }) => {
  const followers = myLocalStorage.getItem("follower")

  return (
    <section className={styles.form}>
      <div className={styles.firstDiv}>
        <div className={styles.pictureDiv}>
          <ProfileNav />
        </div>
        <div className={styles.statistics}>
          <h4 className={styles.num1}>{total}</h4>
          <h4 className={styles.num2}>{followers == null ? 0 : followers}</h4>

          <h4 className={styles.postsLabel}>posts</h4>
          <h4 className={styles.followersLabel}>followers</h4>
        </div>
      </div>

      <div className={styles.secondDiv}>
        <div className={styles.heading}>
          <div className={styles.nameAndEdit}>
            <h2 className={styles.username}>{name}</h2>
            <div className={styles.editDiv}>
              <FontAwesomeIcon icon={faEdit} size="2x" color="#696f45" />
            </div>
          </div>
          <div className={styles.bookmarkDiv}>
            <Link to = {"/bookmarks"}>
              <FontAwesomeIcon icon={faBookmark} size="2x" color="#696f45" />
           </Link>
          </div>
        </div>
        <div className={styles.text}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  )
}
export default ProfileAbout
