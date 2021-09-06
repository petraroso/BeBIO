import React, { useState, useEffect } from "react"
import firebase from "../Firebase/firebase"
//import { navigate } from "gatsby"
import styles from "./style.module.css"
//import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"
<<<<<<< HEAD
//import { navigate } from "gatsby"
=======
//import InsertProfileImage from "../InsertProfileImage"
>>>>>>> 14f69599b9a652d552e5306c6cc0a9401cfe9838

const UpdateUserInfo = ({ prop, progress }) => {
  const { currentUser } = useAuth()

  //const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  //const [profileImageURL, setProfileImageURL] = useState("")
  const [userAbout, setUserAbout] = useState("")
  //const [imageURL, setImageURL] = useState(null)
  //const [updateButton1, setUpdateButton1] = useState(false)
  const [updateButton2, setUpdateButton2] = useState(false)
  const [updateButton3, setUpdateButton3] = useState(false)
  const showUpdateButton2 = () => {
    setUpdateButton2(true)
  }
  const showUpdateButton3 = () => {
    setUpdateButton3(true)
  }

  const useItems = () => {
    const [items, setItems] = useState([]) //useState() hook, sets initial state to an empty array
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

  let onEditProfileImage = () => {
    {
      listItem.map(item => {
        if (item.email === currentUser.email && prop.prop !== null) {
          firebase.firestore().collection("users").doc(item.id).update({
            profileImage: prop,
          })
        }
      })
    }
  }
  let onEditUsername = () => {
    {
      listItem.map(item => {
        if (item.email === currentUser.email && username !== "") {
          firebase.firestore().collection("users").doc(item.id).update({
            username: username,
          })
        }
      })
    }
  }
  let onEditUserAbout = () => {
    {
      listItem.map(item => {
        if (item.email === currentUser.email && userAbout !== "") {
          firebase.firestore().collection("users").doc(item.id).update({
            userAbout: userAbout,
          })
        }
      })
    }
  }
  let filtered = (
    <>
      {listItem.map(item => {
        if (item.email === currentUser.email) {
          return (
            <form className={styles.container} /*onSubmit={handleSubmit}*/>
              <h2 className={styles.title}>Personalize your account</h2>

              {progress === 100 ? (
                <div className={styles.button}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    //disabled={loading}
                    onClick={() => onEditProfileImage()}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                ""
              )}

              <section className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  //ref={usernameRef}
                  defaultValue={item.username}
                  onClick={showUpdateButton2}
                  onChange={e => setUsername(e.target.value)}
                />
              </section>

              {updateButton2 ? (
                <div className={styles.button}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    //disabled={loading}
                    onClick={() => onEditUsername()}
                  >
                    Edit2
                  </button>
                </div>
              ) : (
                ""
              )}

              <section className={styles.field}>
                <label htmlFor="email">Update your field</label>
                <textarea
                  className={styles.textarea}
                  name="bio"
                  type="text"
                  maxLength="460"
                  rows="6"
                  //required
                  defaultValue={item.userAbout}
                  //ref={emailRef}
                  onClick={showUpdateButton3}
                  onChange={e => setUserAbout(e.target.value)}
                 ></textarea>
              </section>

              {updateButton3 ? (
                <div className={styles.button}>
                  <button
                    className={styles.loginButton}
                    type="submit"
                    //disabled={loading}
                    onClick={() => onEditUserAbout()}
                  >
                    Edit3
                  </button>
                </div>
              ) : (
                ""
              )}
            </form>
          )
        }
      })}
    </>
  )
  return <>{filtered}</>
}
export default UpdateUserInfo

