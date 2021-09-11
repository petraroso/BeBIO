import React from "react"
import ProfileUpdate from "../components/ProfileUpdate"
import HeaderFooterLayout from "../layouts/headerFooter"
import { AuthProvider } from "../components/Contexts/AuthContext"


const updatecredentials = () => (
  <main>
    <HeaderFooterLayout>
      <AuthProvider>
        <ProfileUpdate />
      </AuthProvider>
    </HeaderFooterLayout>
  </main>
)

export default updatecredentials
