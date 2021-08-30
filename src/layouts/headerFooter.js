import React from "react"
import NavigationHeader from "../components/NavigationHeader"
import Footer from "../components/Footer"
import { AuthProvider } from "../components/Contexts/AuthContext"

const headerFooter = ({ children, activeTab }) => (
  <>
    <AuthProvider>
      <NavigationHeader activeTab={activeTab} />
      {children}
      <Footer activeTab={activeTab} />
    </AuthProvider>
  </>
)

export default headerFooter
