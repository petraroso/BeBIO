import React from "react"
import styles from "./style.module.css"
import { navs as navTabs } from "../../constants/const"
import { Link } from "gatsby"
import {myLocalStorage} from '../../helper'

const loggedIn = () => !!myLocalStorage.getItem("loggedIn") 


if(!loggedIn())
{
  myLocalStorage.removeItem("follower");
}


const profile = "Profile";
const login = "Login";



let keysToRemove = ["loggedIn", "owner"];

const NavigationBar = ({ activeTab }) => (
  <nav className={styles.navigationBar}>
    {navTabs.map(({ tab, to }) => (
      <Link to={to}>
        <div className={tab === activeTab ? styles.active : ""}>{tab}</div>
      </Link>
    ))}

    {loggedIn() && (
      <Link to={"/profile"}>
        <div className = {profile === activeTab? styles.active : ""}>{profile}</div>
      </Link>
    )}

    <Link to={"/login"}>
      <div
      className = {login===activeTab? styles.active : ""}
        onClick={
          loggedIn() ? () => keysToRemove.forEach(k => myLocalStorage.removeItem(k)) : () => {}
          
        }
      >
        {loggedIn() ? "Logout" : login}
        

      </div>
    </Link>
  </nav>
)
export default NavigationBar

