import React from "react"
import HeaderFooterLayout from "../layouts/headerFooter"
import ProfileAll from "../modules/ProfileAll"
import { AuthProvider } from "../components/Contexts/AuthContext"

const Profile = () => (
  <main>
    <HeaderFooterLayout activeTab="Profile">
      <AuthProvider>
        <ProfileAll />
      </AuthProvider>
    </HeaderFooterLayout>
  </main>
)

export default Profile
