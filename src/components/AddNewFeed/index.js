import React, { useState, useEffect } from "react"
import firebase from "../Firebase/firebase"
import styles from "./style.module.css"
import "react-calendar/dist/Calendar.css"
import { navigate } from "gatsby"
import { useAuth } from "../Contexts/AuthContext"

const AddNewFeed = prop => {
  const [button, setButton] = useState(false)
  const [title, setTitle] = useState("")
  const [imageURL, setImageURL] = useState(null)
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  const [authorsName, setAuthorsName] = useState("")
  const [tag, setTag] = useState("")
  const [uniqueTag, setUniqueTag] = useState("")
  const { currentUser } = useAuth()
  const [items, setItems] = useState([])
  const [userUID, setUserUID] = useState("")

  const change = () => {
    setButton(true)
    {
      listItem.map(item => {
        if (item.userUID === currentUser.uid) {
          setAuthorsName(item.username)
          setUserUID(item.userUID)
        }
      })
    }
  }
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

  const onSubmit = () => {
    firebase
      .firestore()
      .collection("posts")
      .add({
        title,
        imageURL,
        summary,
        body,
        authorsName,
        tag,
        uniqueTag,
        userUID,
      })
      .then(
        () => setTitle(""),
        setImageURL(""),
        setSummary(""),
        setBody(""),
        setAuthorsName(""),
        setTag(""),
        setUniqueTag(""),
        setUserUID("")
      )
    return navigate("/profile")
  }
  return (
    <>
      <div className={styles.textareaDescription}>Title</div>
      <div className={styles.text}>
        <textarea
          onClick={() => setImageURL(prop)}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Insert title"
          maxLength="50"
          required
          className={styles.textarea2}
        ></textarea>
      </div>
      <div className={styles.charNumber}>Maximum 50 characters</div>
      <div className={styles.textareaDescription}>Summary</div>
      <div className={styles.text}>
        <textarea
          onClick={change}
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="Insert summary"
          maxLength="100"
          rows="3"
          required
          className={styles.textarea2}
        ></textarea>
      </div>
      <div className={styles.charNumber}>Maximum 100 characters</div>
      <div className={styles.textareaDescription}>Body</div>
      <div className={styles.text}>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Insert post's body"
          maxLength="70000"
          rows="23"
          required
          className={styles.textarea2}
        ></textarea>
      </div>
      <div className={styles.charNumber}>Maximum 70000 characters</div>

      <div className={styles.textareaDescription}>Tags</div>
      <div className={styles.text}>
        <textarea
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder="Insert post's tags"
          maxLength="160"
          required
          className={styles.textarea2}
        ></textarea>
      </div>
      <div className={styles.charNumber}>Maximum 160 characters</div>
      <div className={styles.textareaDescription}>Unique tag</div>
      <div className={styles.text}>
        <textarea
          value={uniqueTag}
          onChange={e => setUniqueTag(e.target.value)}
          placeholder="Insert unique tag for a web path"
          maxLength="160"
          required
          className={styles.textarea2}
        ></textarea>
      </div>
      <div className={styles.charNumber}>Maximum 160 characters</div>
      {button ? (
        <div className={styles.submitButtons}>
          <button className={styles.button1} onClick={() => setButton(false)}>
            Cancel
          </button>
          <button className={styles.button2} onClick={() => onSubmit()}>
            Submit
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default AddNewFeed
