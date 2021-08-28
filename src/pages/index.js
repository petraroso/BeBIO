import React from "react"
import HeaderFooterLayout from '../layouts/headerFooter'
import Banner from '../components/Banner'
import About from '../components/About'
//import HottestSection from '../components/HottestSection'
import CarouselContainer from '../modules/CarouselContainer'

const IndexPage = () => (
    <HeaderFooterLayout activeTab = "Home">
    <Banner/>
    <About/>
    <CarouselContainer/>
    </HeaderFooterLayout>
)

export default IndexPage
