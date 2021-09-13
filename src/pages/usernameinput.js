import React from "react"
import HeaderFooterLayout from "../layouts/headerFooter"
import UsernameInput from "../components/UsernameInput"
import { AuthProvider } from "../components/Contexts/AuthContext"

const usernameinput = () => (
  <HeaderFooterLayout>
    <AuthProvider>
      <UsernameInput/>
    </AuthProvider>
  </HeaderFooterLayout>
)

export default usernameinput
