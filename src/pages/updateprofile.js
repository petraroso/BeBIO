import React from "react"
import ProfileUpdate from "../components/ProfileUpdate"
import HeaderFooterLayout from "../layouts/headerFooter"
import { AuthProvider } from "../components/Contexts/AuthContext"
import UpdateUserInfo from "../components/UpdateUserInfo"

const updateprofil = () => (
  <main>
    <HeaderFooterLayout>
      <AuthProvider>
        <ProfileUpdate />
        <UpdateUserInfo />
      </AuthProvider>
    </HeaderFooterLayout>
  </main>
)

export default updateprofil
