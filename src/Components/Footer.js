import React from 'react'
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTiktok,
  faLinkedin,
  faTwitter,
  faYoutube,
  faInstagram,
  faDiscord,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import logo from '../pictures/handover_67751335/PLUTUS-PROPERTIES-WHITE-VERSION.png'

const Footer = React.forwardRef((props, ref) => {
  return (
    <>
      <footer id="footer" ref={ref} className="text-center footer">
        <Image src={logo} fluid></Image>
        <div>
          © 2023, Plutus Properties | <a href="mailto:info@plutusproperties.org">info@plutusproperties.org</a> | <a href="tel:+12025272324">+1 (202) 527-2324</a>
          {props.children}
        </div>
        <div className="social-links">
          <a href="https://www.facebook.com/PlutusProps" target="_blank">
            <FontAwesomeIcon icon={faFacebook} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://tiktok.com/@plutusproperties" target="_blank">
            <FontAwesomeIcon icon={faTiktok} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://www.linkedin.com/company/84023572" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://twitter.com/PlutusProps" target="_blank">
            <FontAwesomeIcon icon={faTwitter} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://www.youtube.com/@plutusproperties?sub_confirmation=1" target="_blank">
            <FontAwesomeIcon icon={faYoutube} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://instagram.com/plutusprops" target="_blank">
            <FontAwesomeIcon icon={faInstagram} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://discord.gg/TP2wAgfC" target="_blank">
            <FontAwesomeIcon icon={faDiscord} size="xl" inverse />
          </a>
          &nbsp;
          <a href="https://t.me/plutusprops" target="_blank">
            <FontAwesomeIcon icon={faTelegram} size="xl" inverse />
          </a>
        </div>
      </footer>
    </>
  )
})

export default Footer
