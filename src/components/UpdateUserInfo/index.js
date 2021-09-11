import React, { useState, useEffect } from "react"
import firebase from "../Firebase/firebase"
//import { navigate } from "gatsby"
import styles from "./style.module.css"
//import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"
//import { navigate } from "gatsby"

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
            
            <div className={styles.wholeBlog}>

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
                <label htmlFor="name">Update username</label>
                <input
                className = {styles.input1}
                  name="email"
                  type="text"
                  maxLength="460"
                  rows="2"
                  maxLength="80"
                  //required
                  defaultValue={item.username}
                  //ref={emailRef}
                  onInput={e => setUsername(e.target.value)}
                  onChange={()=>setUpdateButton2(true)}
                ></input>
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
                <label htmlFor="about">Update user caption</label>
                <textarea                  
                  className={styles.textArea2}
                  //onfocus="if(this.value==this.defaultValue)this.value='';this.style.color='#333'" onblur="if(this.value=='') {this.value=this.defaultValue;this.style.color='#CCC'}"
                  //required
                  defaultValue={item.userAbout}
                  //ref={emailRef}
                  onInput={e => setUserAbout(e.target.value)}
                  onChange={()=>setUpdateButton3(true)}
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

            </div>
          )
        }
      })}
    </>
  )

  return <>{filtered}</>
}
export default UpdateUserInfo
