import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
//import Img from "gatsby-image"
import styles from "./style.module.css"

const ProfileNav = ({prop}) => {
  
 
  return (
    <img
    src = {prop || "https://via.placeholder.com/150x150"}
      className={prop? styles.titleImage : ""}
      alt="Profile image"
               height="150"
                width="150"
    ></img>
   
  )
}
export default ProfileNav
