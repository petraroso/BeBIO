import React from "react"
import HeaderFooterLayout from '../layouts/headerFooter'
import ProfileAll from '../modules/ProfileAll'


const Profile = () => (
    <main>
    <HeaderFooterLayout activeTab = "Profile">
        <ProfileAll/>
    </HeaderFooterLayout>
    </main>
)

export default Profile