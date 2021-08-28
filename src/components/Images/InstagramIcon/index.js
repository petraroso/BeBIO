import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from './style.module.css'

const InstagramIcon = () => {
    const data = useStaticQuery(graphql`
    query {
      myImage: file(relativePath: { eq: "instagram.png" }) {
        childImageSharp {
          fixed(width: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
   return <Img fixed={data.myImage.childImageSharp.fixed} className = {styles.inst} />
 }
 

export default InstagramIcon