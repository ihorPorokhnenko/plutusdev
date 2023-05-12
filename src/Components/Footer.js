import React from 'react'
import { Image } from "react-bootstrap";
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
      </footer>
    </>
  )
})

export default Footer
