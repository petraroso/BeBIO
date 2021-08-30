import React, { useState, useRef } from "react"
import firebase from "../Firebase/firebase"
import { navigate } from "gatsby"
import styles from "./style.module.css"
import { myLocalStorage } from "../../helper"
import { useAuth } from "../Contexts/AuthContext"

const SignUpPage = () => {
  const [username, setUserName] = useState()
  //const [password, setPassword] = useState()
  //const [email, setEmail] = useState("")
  //const [error, setError] = useState(false)
  //const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  //const usernameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()
  const [passwordError, setPasswordError] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmationRef.current.value)
      return setPasswordError("Passwords do not match")
    try {
      setPasswordError("")
      setPasswordLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      myLocalStorage.setItem("loggedIn", username)
      return navigate("/profile")
    } catch {
      setPasswordError("Failed to create an account")
    }
    setPasswordLoading(false)
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
        <h2 className={styles.title}>Sign up</h2>
        <section className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            ref={emailRef}
            //onChange={e => setEmail(e.target.value)}
          ></input>
        </section>

        <section className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            //ref={usernameRef}
            required
            onChange={e => setUserName(e.target.value)}
          />
        </section>

        <section className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            ref={passwordRef}
            //onChange={e => setPassword(e.target.value)}
          />
        </section>

        <section className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
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
            {passwordLoading ? "Loading..." : "Sign up"}
          </button>
        </div>
      </form>
      <span className={styles.spanclass}>
        Already have an account?&nbsp;
        <a href="http://localhost:8000/login">Log in</a>
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

export default SignUpPage
