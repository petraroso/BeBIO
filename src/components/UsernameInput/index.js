import React, { useState, useEffect } from "react"
import firebase from "../Firebase/firebase"
import { navigate } from "gatsby"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"

const UsernameInput = () => {
  const [username, setUsername] = useState("")
  const [userUID, setUserUID] = useState("")

  const { currentUser } = useAuth()

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

  async function handleSubmit(e) {
    e.preventDefault()

    listItem.map(item => {
      if (item.email === currentUser.email && username !== "") {
        

        try {
            firebase.firestore().collection("users").doc(item.id).update({
            username: username,
            userUID:userUID
        })

          return navigate("/profile")
        } catch {
          console.log("Failed to create an account")
        }
      }
    })
    //setPasswordLoading(false)
  }

  return (
    <main
      className={styles.background}
      //onKeyDown={key => {
      //if (key.key === "Enter") return submit()
      // }}
    >
      
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Choose a username</h2>

        <section className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            //ref={usernameRef}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </section>

        
        <div className={styles.button}>
          <button
            className={styles.loginButton}
            type="submit"
            
            onClick={() => setUserUID(currentUser.uid)}
          >
             Finish
          </button>
        </div>
      </form>

      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  )
}
export default UsernameInput
