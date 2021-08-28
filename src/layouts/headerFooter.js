import React from 'react'
import NavigationHeader from '../components/NavigationHeader'
import Footer from '../components/Footer'

const headerFooter = ({children, activeTab}) => (
    <>
    <NavigationHeader activeTab = {activeTab}/>
    {children}
    <Footer activeTab = {activeTab}/>
    </>
)

export default headerFooter