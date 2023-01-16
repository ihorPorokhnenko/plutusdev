import React from 'react'

const Footer = React.forwardRef((props, ref) => {
  return (
    <>
      <footer id="footer" ref={ref} className="mt-5 text-center footer">
        © 2023, Plutus Properties | <a href="mailto:info@plutusproperties.org">info@plutusproperties.org</a> | <a href="tel:+12025272324">+1 (202) 527-2324</a>
        {props.children}
      </footer>
    </>
  )
})

export default Footer
