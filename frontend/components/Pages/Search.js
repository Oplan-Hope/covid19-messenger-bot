import React from 'react'
import * as webview from '@/utils/webview-controls'
import FormCell from '@/frontend/components/FormCell'
import Layout from '@/frontend/components/Layout'
import '@/frontend/styles/search.css'

export default function Search() {
  const [term, setTerm] = React.useState('')
  const [regions, setRegions] = React.useState(REGIONS)
  const [selectedRegion, setSelectedRegion] = React.useState()

  const handleSubmit = () => {
    if (selectedRegion) {
      fetch(`${window.appUrl}/stats/${selectedRegion}`, {
        headers: {
          'X-FB-PSID': threadContext.psid,
        },
      })
      webview.close()
    }
  }

  React.useEffect(() => {
    const pattern = new RegExp(term, 'i')
    const filtered = REGIONS.filter((r) => r.key.toLowerCase().match(pattern))
    setRegions(filtered)
    setSelectedRegion()
  }, [term])

  return (
    <Layout
      header={
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter your country name"
            onChange={(event) => setTerm(event.target.value)}
            value={term}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15.155"
              height="15.155"
              viewBox="0 0 15.155 15.155"
              fill="currentColor"
            >
              <g transform="translate(0 0)">
                <path
                  d="M15.062,14.169l-4.4-4.4a6.011,6.011,0,1,0-.893.893l4.4,4.4a.316.316,0,0,0,.447,0l.446-.446A.316.316,0,0,0,15.062,14.169ZM6,10.735A4.736,4.736,0,1,1,10.735,6,4.741,4.741,0,0,1,6,10.735Z"
                  transform="translate(0 0)"
                />
              </g>
            </svg>
          </span>
        </div>
      }
      footer={
        <button className="btn btn-primary" onClick={handleSubmit}>
          Search Country
        </button>
      }
    >
      {regions.map((region) => (
        <FormCell
          key={'region-' + region.key}
          variant="radio"
          icon={region.icon}
          onClick={() => setSelectedRegion(region.key)}
          selected={selectedRegion === region.key}
        >
          {region.label}
        </FormCell>
      ))}
    </Layout>
  )
}

const REGIONS = [
  {
    key: 'australia',
    icon: '🇦🇺',
    label: 'Australia',
  },

  {
    key: 'china',
    icon: '🇨🇳',
    label: 'China',
  },

  {
    key: 'italy',
    icon: '🇮🇹',
    label: 'Italy',
  },

  {
    key: 'philippines',
    icon: '🇵🇭',
    label: 'Philippines',
  },

  {
    key: 'usa',
    icon: '🇺🇸',
    label: 'USA',
  },
]
