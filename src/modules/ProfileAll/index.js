import React, { useState, useEffect } from "react"
import ProfileContainer from "../ProfileContainer"
import { navigate } from "gatsby"
import { myLocalStorage } from "../../helper"
import BlogHeader from "../../components/BlogHeader"
import styles from "./style.module.css"
import { useAuth } from "../../components/Contexts/AuthContext"
import firebase from "../../components/Firebase/firebase"

const ProfileAll = () => {
  //const { currentUser } = useAuth()
  let user = myLocalStorage.getItem("loggedIn")
  const url = typeof window !== "undefined" ? window.location.pathname : ""

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
