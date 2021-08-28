import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
import Img from "gatsby-image"
import styles from "./style.module.css"

const ProfileNav = ({prop}) => {
  
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "profilePic.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        extension
        publicURL
      }
    }
  `)
  return (
    <Img
      className={prop? styles.fluid : styles.titleImage}
      fluid={data.desktop.childImageSharp.fluid}
    ></Img>
   
  )
}
export default ProfileNav
