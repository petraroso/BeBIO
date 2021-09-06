import React from "react"
import ProfileUpdate from "../components/ProfileUpdate"
import HeaderFooterLayout from "../layouts/headerFooter"
import { AuthProvider } from "../components/Contexts/AuthContext"
import InsertProfileImage from "../components/InsertProfileImage"

const updateprofil = () => (
  <main>
    <HeaderFooterLayout>
      <AuthProvider>
        <ProfileUpdate />
        <InsertProfileImage/>
      </AuthProvider>
    </HeaderFooterLayout>
  </main>
)

export default updateprofil
