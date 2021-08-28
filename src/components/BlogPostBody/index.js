import React from "react"
import styles from "./style.module.css"
import ProfileImage1 from "../Images/ProfileImage1"
import ProfileImage2 from "../Images/ProfileImage2"
import ProfileImage3 from "../Images/ProfileImage3"
import { myLocalStorage } from "../../helper"




const BlogPostBody = ({ profileImage, authorsName, text, tags, userAcc }) => {
  const setStorage = property => {
    //console.log("inside setStorage- property:" + "" + property)
    myLocalStorage.setItem("owner", property)
  }
  
  let randomPic = [ <ProfileImage1/>,<ProfileImage2/>,< ProfileImage3/>];
  let randomValue = Math.floor(Math.random() * 3) + 0;

  let follower = 0;
  let ret = (
    <>
      <section className={styles.blog2}>
        <div className={styles.author}>
          <div className={styles.profileImage}>{userAcc && userAcc === authorsName ? profileImage : randomPic[randomValue]}</div>
          <h4 className={styles.name}>
            {authorsName !== undefined ? authorsName : userAcc}
          </h4>
          {authorsName ? (
            userAcc && userAcc === authorsName ? (
              ""
            ) : (
              <button onClick = {()=>myLocalStorage.setItem("follower", follower + 1)}className={styles.follow}>follow</button>
            )
          ) : (
            ""
          )}
        </div>
        <div className={styles.text}>
          <div> {text} </div>
          <div className={styles.tags}> #{tags}</div>
        </div>
      </section>
    </>
  )

  return <>{ret}</>
}
export default BlogPostBody
