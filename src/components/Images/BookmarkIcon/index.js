import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const BookmarkIcon = () => {
    const data = useStaticQuery(graphql`
    query {
      myImage: file(relativePath: { eq: "bookmark.png" }) {
        childImageSharp {
          fixed(width: 95) {
            ...GatsbyImageSharpFixed
          }
        }
        extension
        publicURL
      }
    }
  `)
   return <Img fixed={data.myImage.childImageSharp.fixed} />
 }
 

export default BookmarkIcon