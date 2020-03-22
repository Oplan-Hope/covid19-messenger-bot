import React from 'react'
import FormCell from '@/components/FormCell'
import LOCATIONS from '@/constants/locations'
import 'styles/home.css'

export default function Home() {
  const [locationType, setLocationType] = React.useState('')
  
  return (
    <div className="layout">
      <div className="header">
        <p>Access nearest establishments around your location</p>
      </div>

      <div className="body">
        {LOCATIONS.map(location => (
          <FormCell 
            variant="radio" 
            icon={location.icon}
            onClick={() => setLocationType(location.key)}
            selected={locationType === location.key}
          >
            {location.label}
          </FormCell>
        ))}
      </div>

      <div className="footer">
        <button className="btn btn-primary">See Location</button>
        <div className="tabs">
          <span className="tab">-</span>
          <span className="tab">-</span>
          <span className="tab">-</span>
        </div>
      </div>
    </div>
  )
}
