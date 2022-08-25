import React, { useRef } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/Footer'
import ProfileCard from '../Components/ProfileCard'
import MyListings from '../Components/MyListings'

export default function MyProfile() {
    const footerRef = useRef(null)

    return (
        <div>
        <Navbar footerRef={footerRef} />
        <ProfileCard/>
        <MyListings/>
        <Footer ref={footerRef} />
        </div>
    )
}
