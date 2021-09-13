import React, { useState, useEffect } from "react"
import styles from "./style.module.css"
import ProfileNav from "../Images/ProfileNav"
import { myLocalStorage } from "../../helper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { Link, navigate } from "gatsby"
import firebase from "../Firebase/firebase"
import { useAuth } from "../Contexts/AuthContext"

const ProfileAbout = ({ name, total }) => {
  const followers = myLocalStorage.getItem("follower")
  const { currentUser } = useAuth()
  const [items, setItems] = useState([]) //useState() hook, sets initial state to an empty array

  const userAbout = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  )

  const useItems = () => {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore() //access firestore
        .collection("users") //access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data(), //spread operator merges data to id.
          }))
          setItems(listItems) //items is equal to listItems
        })
      return () => unsubscribe()
    }, [])
    return items
  }
  const listItem = useItems()
  console.log(items)
  console.log(currentUser.email)
  

  let firstVar = (
    <>
      {listItem.map(item => {
        if (item.email === currentUser.email) {
          console.log(item.userAbout)
          console.log(item.profileImage)
          return (
            <section className={styles.form}>
              <div className={styles.firstDiv}>
                <div className={styles.pictureDiv}>
                  <ProfileNav prop = {item.profileImage}  />
                </div>
                <div className={styles.statistics}>
                  <h4 className={styles.num1}>{total}</h4>
                  <h4 className={styles.num2}>
                    {followers == null ? 0 : followers}
                  </h4>

                  <h4 className={styles.postsLabel}>posts</h4>
                  <h4 className={styles.followersLabel}>followers</h4>
                </div>
              </div>

              <div className={styles.secondDiv}>
                <div>
                  <div className={styles.heading}>
                    <div className={styles.nameAndEdit}>
                      <h2 className={styles.username}>{name}</h2>
                    </div>
                    <div className={styles.bookmarkDiv}>
                      <Link to={"/bookmarks"}>
                        <FontAwesomeIcon
                          icon={faBookmark}
                          size="2x"
                          color="#696f45"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className={styles.text}>
                    {item.userAbout !== "" ? (
                      <p>{item.userAbout}</p>
                    ) : (
                      <p>{userAbout}</p>
                    )}
                  </div>
                </div>
                <div className={styles.buttonsDiv}>
                  <button
                    className={styles.editDiv}
                    onClick={() => navigate("/updatecredentials")}
                    color="#696f45"
                  >
                    Update&nbsp;credentials
                  </button>
                  <button
                    className={styles.editDiv}
                    onClick={() => navigate("/updateinfo")}
                    color="#696f45"
                  >
                    Update&nbsp;info
                  </button>
                </div>
              </div>
            </section>
          )
        }
      })}
    </>
  )
  return <>{firstVar}</>
}
export default ProfileAbout
