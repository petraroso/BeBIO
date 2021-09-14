import React, { useState, useEffect } from "react"
import firebase from "../../components/Firebase/firebase"
//mport { storageRef } from "../../components/Firebase/firebase"
import {  Link } from "gatsby"
//import Img from "gatsby-image"
import styles from "./style.module.css"
//import {useHistory, useParams} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import ProfileAbout from "../../components/ProfileAbout"
import { useAuth } from "../../components/Contexts/AuthContext"

library.add(faTrashAlt)

const ProfileContainer = ({ name }) => {
  //let [posts, setPosts] = useState(null)
  //let [isLoaded, setLoaded] = useState(false)
  let [increment, setIncrememt] = useState(0)
  const [items, setItems] = useState([])
  const { currentUser } = useAuth()

  useEffect(() => {
    firebase
      .firestore() //access firestore
      .collection("posts") //access "items" collection
      .onSnapshot(snapshot => {
        //You can "listen" to a document with the onSnapshot() method.
        const listItems = snapshot.docs.map(doc => ({
          //map each document into snapshot
          id: doc.id, //id and data pushed into items array
          ...doc.data(), //spread operator merges data to id.
        }))
        setItems(listItems) //items is equal to listItems
      })
  }, [])

  const changeSlug = property => {
    firebase.firestore().collection("posts").doc(property).delete()
  }

  let firstVar

  let count = 0

  firstVar = (
    <>
      <hr className={styles.line}></hr>
      <div className={styles.con}>
        <div className={styles.buttonPosition}>
          <a href="http://localhost:8000/addNew">
            <button className={styles.button1}>Add new post</button>
          </a>
        </div>
      </div>
      <section className={styles.container}>
        {items.map(item => {
          if (item.userUID === currentUser.uid) {
            count = count + 1
            return (
              <>
                <div className={styles.profilePost}>
                  <div key={item.id} onClick={() => changeSlug(item.id)}>
                    <FontAwesomeIcon
                      icon={["fas", "trash-alt"]}
                      fill="white"
                      size="2x"
                      color="black"
                      className={styles.trashIcon}
                    />
                  </div>
                  <Link to={`/profilePosts/${item.id}`}>
                    <img
                      src={item.imageURL.prop}
                      className={styles.image}
                    ></img>
                  </Link>
                  <div className={styles.body}>
                    <div className={styles.title}>
                      <Link to={`/profilePosts/${item.id}`}>
                        <h2>{item.title}</h2>
                      </Link>
                    </div>

                    <div className={styles.textContainer}>
                      <p className={styles.text}>{item.body}</p>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        })}
      </section>
    </>
  )

  count = count - increment

  return (
    <>
      <ProfileAbout total={count} name={name} />
      {firstVar}
    </>
  )
}

export default ProfileContainer
