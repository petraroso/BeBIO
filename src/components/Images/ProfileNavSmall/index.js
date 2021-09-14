import React,{useEffect, useState} from "react"
import styles from "./style.module.css"
import firebase from "../../Firebase/firebase"
import { useAuth } from "../../Contexts/AuthContext"

const ProfileNavSmall = () => {
  const[items,setItems] = useState([]);
const {currentUser} = useAuth()


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

 console.log(items)

  let firstVar = (
    <>
    {items.map(item=>{
      if(item.userUID === currentUser.uid){
        return (
          <img
          src = {item.profileImage || "https://via.placeholder.com/50x50"}
          className={styles.fluid}
          alt="Profile picure"
          height="50"
          width="50"
          ></img>
        )
      }
    })}
    </>
  )
  return <>{firstVar}</>
  
  
}
export default ProfileNavSmall