import React from 'react'
import styles from './style.module.css'

        
  const CommentSection = ({profileImage, userName,comment}) => (
        <span className = {styles.blog3}>
            <div className = {styles.userImage}>{profileImage}</div>
            <h2 className = {styles.name}>{userName}:</h2>
            <div className = {styles.comment}> {comment} </div>
        </span>
)
export default CommentSection