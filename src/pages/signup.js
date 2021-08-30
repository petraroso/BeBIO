import React from "react"
import HeaderFooterLayout from "../layouts/headerFooter"
import SignUpPage from "../components/SignUpPage"
import { AuthProvider } from "../components/Contexts/AuthContext"

const signup = () => (
  <HeaderFooterLayout>
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  </HeaderFooterLayout>
)

export default signup
