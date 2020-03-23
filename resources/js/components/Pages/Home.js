import React from 'react'
import * as locationApi from '@/api/locations'
import FormCell from '@/components/FormCell'
import LOCATIONS from '@/constants/locations'
import * as webview from '@/utils/webview'
import 'styles/home.css'

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
