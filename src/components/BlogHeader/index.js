import React, { useState } from "react"
import { faBookmark } from "@fortawesome/free-regular-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
import BlogContainer from "../../modules/BlogContainer"
import styles from "./style.module.css"

library.add(
  faBookmark

  // more icons go here
)

export default function App({ name }) {
  const [searchTerm, setTerm] = useState("")
  // const [searchResults, setSearchResults] = React.useState();
  const handleChanges = event => {
    setTerm(event.target.value)
  }

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Search by tag..."
          const
          value={searchTerm}
          onChange={handleChanges}
          className={styles.filter}
        />
      </div>

      <div>
        <BlogContainer tags={searchTerm} prop={name} />{" "}
      </div>
    </>
  )
}
