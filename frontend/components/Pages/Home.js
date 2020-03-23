import React from 'react'
import * as webview from '@/utils/webview-controls'
import * as locationApi from '@/api/locations'
import LOCATIONS from '@/constants/locations'
import FormCell from '@/frontend/components/FormCell'
import '@/frontend/styles/home.css'

export default function Home() {
  const [locationType, setLocationType] = React.useState('')

  const handleSubmit = async () => {
    locationApi.show(locationType, window.threadContext.psid)

    webview.close()
  }

  return (
    <div className="layout">
      <div className="header">
        <p>Access nearest establishments around your location</p>
      </div>

      <div className="body">
        {LOCATIONS.map((location) => (
          <FormCell
            key={'location-' + location.key}
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
        <button className="btn btn-primary" onClick={handleSubmit}>
          See Location
        </button>
      </div>
    </div>
  )
}
