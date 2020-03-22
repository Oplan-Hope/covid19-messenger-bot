import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import 'styles/form-cell.css'

export default function FormCell({ 
  variant = 'radio', 
  selected = false, 
  icon, 
  children, 
  className,
  ...props 
}) {
  return (
    <div className={cx('form-cell', className, { selected })} {...props}>
      <div className={cx('selector', variant, { selected })}>
        <div />
      </div>
      {children}
      <span className="icon">{icon}</span>
    </div>
  )
}

FormCell.propTypes = {
  variant: PropTypes.oneOf(['radio', 'checkbox']),
  selected: PropTypes.bool,
  icon: PropTypes.string,
}
