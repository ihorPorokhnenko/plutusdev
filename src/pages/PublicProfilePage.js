import React, { useRef } from 'react'
import Navbar from '../Components/navbar'
import Footer from '../Components/Footer'
import PublicProfiles from '../Components/PublicProfile'

export default function PublicProfilePage() {
    const footerRef = useRef(null)
    return (
        <>
        <Navbar footerRef={footerRef} />
        <PublicProfiles/>
        <Footer ref={footerRef} />
        </>
    )
}
