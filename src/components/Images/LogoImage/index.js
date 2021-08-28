import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styles from "./style.module.css"

const LogoImage = () => {
    const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "logo.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
        extension
        publicURL
      }
    }
  `)
   return (
   <Img fluid={data.desktop.childImageSharp.fluid} className={styles.logoImg}  />
   )
 }
 

export default LogoImage