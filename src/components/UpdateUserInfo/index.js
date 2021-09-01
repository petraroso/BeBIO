import React, { useState, useEffect } from "react"
import firebase from "../Firebase/firebase"
//import { navigate } from "gatsby"
import styles from "./style.module.css"
//import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"
import InsertProfileImage from "../InsertProfileImage"

const UpdateUserInfo = () => {
  const { currentUser } = useAuth()
  const [username, setUsername] = useState("")
  //const [profileImageURL, setProfileImageURL] = useState("")
  const [userAbout, setUserAbout] = useState("")
  const [loading, setLoading] = useState(false)
  const [insertImage, setInsertImage] = useState(false)
  const [imageURL, setImageURL] = useState(null)

  const handleCallback = downloadURL => {
    setImageURL(downloadURL)
  }

  const showInsertImage = () => {
    setInsertImage(true)
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
  /*
 {
  listItem.map(item => {
    if (item.email === currentUser.email) {
      setUsername(item.username)
      setImageURL(item.profileImage)
      setUserAbout(item.userAbout)
    }
  })
}
*/
  let onEdit = () => {
    {
      listItem.map(item => {
        if (item.email === currentUser.email) {
          firebase.firestore().collection("users").doc(item.id).update({
            username: username,
            profileImage: imageURL,
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

              <div className={styles.profileImage}>
                <label htmlFor="profile">Profile image</label>
                <img
                  src={item.profileImage}
                  className={styles.image}
                  onClick={showInsertImage}
                ></img>
              </div>

              {insertImage ? (
                <InsertProfileImage parentCallback={() => handleCallback()} />
              ) : (
                ""
              )}

              <section className={styles.field}>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  //ref={usernameRef}
                  defaultValue={item.username}
                  onChange={e => setUsername(e.target.value)}
                />
              </section>

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
                  onChange={e => setUserAbout(e.target.value)}
                ></textarea>
              </section>

              <div className={styles.button}>
                <button
                  className={styles.loginButton}
                  type="submit"
                  //disabled={loading}
                  //onClick={() => editItem(item)}
                >
                  Cancel
                </button>
              </div>
              <div className={styles.button}>
                <button
                  className={styles.loginButton}
                  type="submit"
                  //disabled={loading}
                  onClick={() => onEdit()}
                >
                  Edit
                </button>
              </div>
            </form>
          )
        }
      })}
    </>
  )
  return <>{filtered}</>
}
export default UpdateUserInfo
