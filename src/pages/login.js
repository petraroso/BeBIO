import React from 'react'
import HeaderFooterLayout from '../layouts/headerFooter'
import LogInPage from '../components/LogInPage'


const login = () => (
    <HeaderFooterLayout activeTab = "Login">
    <LogInPage/>
    </HeaderFooterLayout>
)

export default login