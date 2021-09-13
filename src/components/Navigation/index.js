import React from "react"
import NavigationBar from "../NavigationBar"


import styles from "./style.module.css"

const Navigation = ({ activeTab }) => (
  <section className={styles.navigation}>
    <NavigationBar activeTab={activeTab} />
  </section>
)

export default Navigation
