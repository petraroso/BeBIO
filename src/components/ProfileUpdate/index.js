import React, { useState, useRef } from "react"
import firebase from "../Firebase/firebase"
import { navigate, Link } from "gatsby"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"

const ProfileUpdate = () => {
  //const [username, setUserName] = useState(myLocalStorage.getItem("loggedIn"))
  //const [password, setPassword] = useState()
  //const [email, setEmail] = useState("")
  //const [error, setError] = useState(false)
  //const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  //const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [passwordError, setPasswordError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value)
      return setPasswordError("Passwords do not match")

    const promises = []
    setPasswordLoading(true)
    setPasswordError("")
    if (emailRef.current.value !== currentUser.emailRef) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        setPasswordError("Failed to update account")
      })
      .finally(() => {
        setPasswordLoading(false)
      })
  }

  return (
    <main
      className={styles.background}
      //onKeyDown={key => {
      //if (key.key === "Enter") return submit()
      // }}
    >
      {passwordError}
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Update profile</h2>
        <section className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            required
            defaultValue={currentUser.email}
            ref={emailRef}
            //onChange={e => setEmail(e.target.value)}
          ></input>
        </section>

        <section className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Leave blank to keep the same"
            ref={passwordRef}
            //onChange={e => setPassword(e.target.value)}
          />
        </section>

        <section className={styles.field}>
          <label htmlFor="password">Password confirmation</label>
          <input
            name="password"
            type="password"
            placeholder="Leave blank to keep the same"
            ref={passwordConfirmationRef}
            //onChange={e => setPassword(e.target.value)}
          />
        </section>

        <p
          className={`${
            styles[passwordError !== "Success" ? "error" : "success"]
          } ${passwordError ? styles.show : ""}`}
        >
          {passwordError}
        </p>
        <div className={styles.button}>
          <button
            className={styles.loginButton}
            type="submit"
            disabled={passwordLoading}
            //onClick={() => submit()}
          >
            {passwordLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
      <span className={styles.spanclass}>
        <Link to={"/profile"}>Cancel</Link>
      </span>

      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </main>
  )
}

export default ProfileUpdate
