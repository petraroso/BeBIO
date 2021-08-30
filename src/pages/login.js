import React from "react"
import HeaderFooterLayout from "../layouts/headerFooter"
import LogInPage from "../components/LogInPage"
import { AuthProvider } from "../components/Contexts/AuthContext"

const login = () => (
  <HeaderFooterLayout activeTab="Login">
    <AuthProvider>
      <LogInPage />
    </AuthProvider>
  </HeaderFooterLayout>
)

export default login
