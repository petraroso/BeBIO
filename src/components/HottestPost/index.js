import React from 'react'
import styles from './style.module.css'

const HottestPost = ({image, text}) => (
    <section className = {styles.hottestPost}>
        <div className = {styles.image}>{image}</div>
        <div className={styles.articleHalf}>
            <p className={styles.text}>{text}</p>
            <button className={styles.button}>Read more</button>
        </div>
        

    </section>

)
export default HottestPost
