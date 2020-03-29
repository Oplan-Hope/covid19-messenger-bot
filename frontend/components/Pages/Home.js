import React from 'react'
import FormCell from '@/frontend/components/FormCell'
import Layout from '@/frontend/components/Layout'
import * as webview from '@/utils/webview-controls'

export default function Home() {
  const [locationType, setLocationType] = React.useState()

  const handleSubmit = () => {
    if (locationType) {
      fetch(`${window.appUrl}/locations/${locationType}`, {
        headers: {
          'X-FB-PSID': threadContext.psid,
        },
      })
      webview.close()
    }
  }

  return (
    <Layout
      header={<p>Access nearest establishments around your location</p>}
      footer={
        <button className="btn btn-primary" onClick={handleSubmit}>
          See Location
        </button>
      }
    >
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
    </Layout>
  )
}

const LOCATIONS = [
  {
    key: 'TESTING_CENTERS',
    label: 'Testing Centers',
    icon: '🏥',
  },
  {
    key: 'HOSPITALS',
    label: 'Hospitals',
    icon: '🏥',
  },
  {
    key: 'CHECKPOINTS',
    label: 'Checkpoints',
    icon: '🚧',
  },
  {
    key: 'BANKS',
    label: 'Banks / ATM',
    icon: '🏧',
  },

  {
    key: 'PHARMACIES',
    label: 'Pharmacies',
    icon: '💊',
  },

  {
    key: 'GROCERY_STORES',
    label: 'Grocery Stores',
    icon: '🛍️',
  },
  {
    key: 'POLICE_STATIONS',
    label: 'Police Station',
    icon: '👮',
  },
  {
    key: 'FACE_MASKS',
    label: 'Face Masks',
    icon: '😷',
  },
]
