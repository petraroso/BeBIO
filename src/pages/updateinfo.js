import React from "react"
import HeaderFooterLayout from "../layouts/headerFooter"
import { AuthProvider } from "../components/Contexts/AuthContext"
import InsertProfileImage from "../components/InsertProfileImage"

const updateinfo = () => (
  <main>
    <HeaderFooterLayout>
      <AuthProvider>
        <InsertProfileImage/>
      </AuthProvider>
    </HeaderFooterLayout>
  </main>
)

export default updateinfo