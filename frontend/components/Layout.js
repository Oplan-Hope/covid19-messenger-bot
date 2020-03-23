import React from 'react'
import PropTypes from 'prop-types'
import '@/frontend/styles/layout.css'

export default function Layout({ header, children, footer }) {
  return (
    <div className="layout">
      <div className="header">{header}</div>
      <div className="body">{children}</div>
      <div className="footer">{footer}</div>
    </div>
  )
}

Layout.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}
