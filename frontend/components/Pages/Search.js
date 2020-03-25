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
          Search
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
    key: 'WORLD',
    icon: '🌏',
    label: 'Worldwide',
  },
  {
    key: 'CHINA',
    icon: '🇨🇳',
    label: 'China',
  },
  {
    key: 'ITALY',
    icon: '🇮🇹',
    label: 'Italy',
  },
  {
    key: 'USA',
    icon: '🇺🇸',
    label: 'USA',
  },
  {
    key: 'SPAIN',
    icon: '🇪🇸',
    label: 'Spain',
  },
  {
    key: 'GERMANY',
    icon: '🇩🇪',
    label: 'Germany',
  },
  {
    key: 'IRAN',
    icon: '🇮🇷',
    label: 'Iran',
  },
  {
    key: 'FRANCE',
    icon: '🇫🇷',
    label: 'France',
  },
  {
    key: 'SWITZERLAND',
    icon: '🇨🇭',
    label: 'Switzerland',
  },
  {
    key: 'S. KOREA',
    icon: '🇰🇷',
    label: 'S. Korea',
  },
  {
    key: 'UK',
    icon: '🇬🇧',
    label: 'United Kingdom',
  },
  {
    key: 'NETHERLANDS',
    icon: '🇳🇱',
    label: 'Netherlands',
  },
  {
    key: 'AUSTRIA',
    icon: '🇦🇹',
    label: 'Austria',
  },
  {
    key: 'BELGIUM',
    icon: '🇧🇪',
    label: 'Belgium',
  },
  {
    key: 'PORTUGAL',
    icon: '🇵🇹',
    label: 'Portugal',
  },
  {
    key: 'NORWAY',
    icon: '🇳🇴',
    label: 'Norway',
  },
  {
    key: 'CANADA',
    icon: '🇨🇦',
    label: 'Canada',
  },
  {
    key: 'SWEDEN',
    icon: '🇸🇪',
    label: 'Sweden',
  },
  {
    key: 'AUSTRALIA',
    icon: '🇦🇺',
    label: 'Australia',
  },
  {
    key: 'BRAZIL',
    icon: '🇧🇷',
    label: 'Brazil',
  },
  {
    key: 'ISRAEL',
    icon: '🇮🇱',
    label: 'Israel',
  },
  {
    key: 'TURKEY',
    icon: '🇹🇷',
    label: 'Turkey',
  },
  {
    key: 'MALAYSIA',
    icon: '🇲🇾',
    label: 'Malaysia',
  },
  {
    key: 'DENMARK',
    icon: '🇩🇰',
    label: 'Denmark',
  },
  {
    key: 'CZECHIA',
    icon: '🇨🇿',
    label: 'Czechia',
  },
  {
    key: 'IRELAND',
    icon: '🇮🇪',
    label: 'Ireland',
  },
  {
    key: 'JAPAN',
    icon: '🇯🇵',
    label: 'Japan',
  },
  {
    key: 'CHILE',
    icon: '🇨🇱',
    label: 'Chile',
  },
  {
    key: 'LUXEMBOURG',
    icon: '🇱🇺',
    label: 'Luxembourg',
  },
  {
    key: 'ECUADOR',
    icon: '🇪🇨',
    label: 'Ecuador',
  },
  {
    key: 'PAKISTAN',
    icon: '🇵🇰',
    label: 'Pakistan',
  },
  {
    key: 'POLAND',
    icon: '🇵🇱',
    label: 'Poland',
  },
  {
    key: 'THAILAND',
    icon: '🇹🇭',
    label: 'Thailand',
  },
  {
    key: 'ROMANIA',
    icon: '🇷🇴',
    label: 'Romania',
  },
  {
    key: 'SAUDI ARABIA',
    icon: '🇸🇦',
    label: 'Saudi Arabia',
  },
  {
    key: 'FINLAND',
    icon: '🇫🇮',
    label: 'Finland',
  },
  {
    key: 'INDONESIA',
    icon: '🇮🇩',
    label: 'Indonesia',
  },
  {
    key: 'GREECE',
    icon: '🇬🇷',
    label: 'Greece',
  },
  {
    key: 'ICELAND',
    icon: '🇮🇸',
    label: 'Iceland',
  },
  {
    key: 'DIAMOND PRINCESS',
    icon: '',
    label: 'Diamond Princess',
  },
  {
    key: 'SOUTH AFRICA',
    icon: '🇿🇦',
    label: 'South Africa',
  },
  {
    key: 'RUSSIA',
    icon: '🇷🇺',
    label: 'Russia',
  },
  {
    key: 'PHILIPPINES',
    icon: '🇵🇭',
    label: 'Philippines',
  },
  {
    key: 'SINGAPORE',
    icon: '🇸🇬',
    label: 'Singapore',
  },
  {
    key: 'INDIA',
    icon: '🇮🇳',
    label: 'India',
  },
  {
    key: 'SLOVENIA',
    icon: '🇸🇮',
    label: 'Slovenia',
  },
  {
    key: 'QATAR',
    icon: '🇶🇦',
    label: 'Qatar',
  },
  {
    key: 'PANAMA',
    icon: '🇵🇦',
    label: 'Panama',
  },
  {
    key: 'EGYPT',
    icon: '🇪🇬',
    label: 'Egypt',
  },
  {
    key: 'BAHRAIN',
    icon: '🇧🇭',
    label: 'Bahrain',
  },
  {
    key: 'CROATIA',
    icon: '🇭🇷',
    label: 'Croatia',
  },
  {
    key: 'PERU',
    icon: '🇵🇪',
    label: 'Peru',
  },
  {
    key: 'HONG KONG',
    icon: '🇭🇰',
    label: 'Hong Kong',
  },
  {
    key: 'MEXICO',
    icon: '🇲🇽',
    label: 'Mexico',
  },
  {
    key: 'ESTONIA',
    icon: '🇪🇪',
    label: 'Estonia',
  },
  {
    key: 'DOMINICAN REPUBLIC',
    icon: '🇩🇴',
    label: 'Dominican Republic',
  },
  {
    key: 'ARGENTINA',
    icon: '🇦🇷',
    label: 'Argentina',
  },
  {
    key: 'SERBIA',
    icon: '🇷🇸',
    label: 'Serbia',
  },
  {
    key: 'COLOMBIA',
    icon: '🇨🇴',
    label: 'Colombia',
  },
  {
    key: 'IRAQ',
    icon: '',
    label: 'Iraq',
  },
  {
    key: 'LEBANON',
    icon: '',
    label: 'Lebanon',
  },
  {
    key: 'UAE',
    icon: '',
    label: 'UAE',
  },
  {
    key: 'ARMENIA',
    icon: '',
    label: 'Armenia',
  },
  {
    key: 'ALGERIA',
    icon: '',
    label: 'Algeria',
  },
  {
    key: 'LITHUANIA',
    icon: '',
    label: 'Lithuania',
  },
  {
    key: 'TAIWAN',
    icon: '',
    label: 'Taiwan',
  },
  {
    key: 'HUNGARY',
    icon: '',
    label: 'Hungary',
  },
  {
    key: 'LATVIA',
    icon: '',
    label: 'Latvia',
  },
  {
    key: 'BULGARIA',
    icon: '',
    label: 'Bulgaria',
  },
  {
    key: 'SLOVAKIA',
    icon: '',
    label: 'Slovakia',
  },
  {
    key: 'NEW ZEALAND',
    icon: '',
    label: 'New Zealand',
  },
  {
    key: 'KUWAIT',
    icon: '',
    label: 'Kuwait',
  },
  {
    key: 'URUGUAY',
    icon: '',
    label: 'Uruguay',
  },
  {
    key: 'ANDORRA',
    icon: '',
    label: 'Andorra',
  },
  {
    key: 'SAN MARINO',
    icon: '',
    label: 'San Marino',
  },
  {
    key: 'COSTA RICA',
    icon: '',
    label: 'Costa Rica',
  },
  {
    key: 'NORTH MACEDONIA',
    icon: '',
    label: 'North Macedonia',
  },
  {
    key: 'TUNISIA',
    icon: '',
    label: 'Tunisia',
  },
  {
    key: 'MOROCCO',
    icon: '',
    label: 'Morocco',
  },
  {
    key: 'BOSNIA AND HERZEGOVINA',
    icon: '',
    label: 'Bosnia and Herzegovina',
  },
  {
    key: 'JORDAN',
    icon: '',
    label: 'Jordan',
  },
  {
    key: 'ALBANIA',
    icon: '',
    label: 'Albania',
  },
  {
    key: 'VIETNAM',
    icon: '',
    label: 'Vietnam',
  },
  {
    key: 'FAEROE ISLANDS',
    icon: '',
    label: 'Faeroe Islands',
  },
  {
    key: 'MALTA',
    icon: '',
    label: 'Malta',
  },
  {
    key: 'MOLDOVA',
    icon: '',
    label: 'Moldova',
  },
  {
    key: 'CYPRUS',
    icon: '',
    label: 'Cyprus',
  },
  {
    key: 'UKRAINE',
    icon: '',
    label: 'Ukraine',
  },
  {
    key: 'BURKINA FASO',
    icon: '',
    label: 'Burkina Faso',
  },
  {
    key: 'BRUNEI',
    icon: '',
    label: 'Brunei',
  },
  {
    key: 'SRI LANKA',
    icon: '',
    label: 'Sri Lanka',
  },
  {
    key: 'OMAN',
    icon: '',
    label: 'Oman',
  },
  {
    key: 'SENEGAL',
    icon: '',
    label: 'Senegal',
  },
  {
    key: 'RÉUNION',
    icon: '',
    label: 'Réunion',
  },
  {
    key: 'CAMBODIA',
    icon: '',
    label: 'Cambodia',
  },
  {
    key: 'VENEZUELA',
    icon: '',
    label: 'Venezuela',
  },
  {
    key: 'AZERBAIJAN',
    icon: '',
    label: 'Azerbaijan',
  },
  {
    key: 'BELARUS',
    icon: '',
    label: 'Belarus',
  },
  {
    key: 'KAZAKHSTAN',
    icon: '',
    label: 'Kazakhstan',
  },
  {
    key: 'AFGHANISTAN',
    icon: '',
    label: 'Afghanistan',
  },
  {
    key: 'GUADELOUPE',
    icon: '',
    label: 'Guadeloupe',
  },
  {
    key: 'GEORGIA',
    icon: '',
    label: 'Georgia',
  },
  {
    key: 'IVORY COAST',
    icon: '',
    label: 'Ivory Coast',
  },
  {
    key: 'CAMEROON',
    icon: '',
    label: 'Cameroon',
  },
  {
    key: 'GHANA',
    icon: '',
    label: 'Ghana',
  },
  {
    key: 'PALESTINE',
    icon: '',
    label: 'Palestine',
  },
  {
    key: 'MARTINIQUE',
    icon: '',
    label: 'Martinique',
  },
  {
    key: 'TRINIDAD AND TOBAGO',
    icon: '',
    label: 'Trinidad and Tobago',
  },
  {
    key: 'UZBEKISTAN',
    icon: '',
    label: 'Uzbekistan',
  },
  {
    key: 'MONTENEGRO',
    icon: '',
    label: 'Montenegro',
  },
  {
    key: 'LIECHTENSTEIN',
    icon: '',
    label: 'Liechtenstein',
  },
  {
    key: 'DRC',
    icon: '',
    label: 'DRC',
  },
  {
    key: 'MAURITIUS',
    icon: '',
    label: 'Mauritius',
  },
  {
    key: 'CUBA',
    icon: '',
    label: 'Cuba',
  },
  {
    key: 'NIGERIA',
    icon: '',
    label: 'Nigeria',
  },
  {
    key: 'KYRGYZSTAN',
    icon: '',
    label: 'Kyrgyzstan',
  },
  {
    key: 'RWANDA',
    icon: '',
    label: 'Rwanda',
  },
  {
    key: 'BANGLADESH',
    icon: '',
    label: 'Bangladesh',
  },
  {
    key: 'CHANNEL ISLANDS',
    icon: '',
    label: 'Channel Islands',
  },
  {
    key: 'PARAGUAY',
    icon: '',
    label: 'Paraguay',
  },
  {
    key: 'HONDURAS',
    icon: '',
    label: 'Honduras',
  },
  {
    key: 'MAYOTTE',
    icon: '',
    label: 'Mayotte',
  },
  {
    key: 'BOLIVIA',
    icon: '',
    label: 'Bolivia',
  },
  {
    key: 'MACAO',
    icon: '',
    label: 'Macao',
  },
  {
    key: 'JAMAICA',
    icon: '',
    label: 'Jamaica',
  },
  {
    key: 'FRENCH POLYNESIA',
    icon: '',
    label: 'French Polynesia',
  },
  {
    key: 'KENYA',
    icon: '',
    label: 'Kenya',
  },
  {
    key: 'MONACO',
    icon: '',
    label: 'Monaco',
  },
  {
    key: 'FRENCH GUIANA',
    icon: '',
    label: 'French Guiana',
  },
  {
    key: 'ISLE OF MAN',
    icon: '',
    label: 'Isle of Man',
  },
  {
    key: 'TOGO',
    icon: '',
    label: 'Togo',
  },
  {
    key: 'GUATEMALA',
    icon: '',
    label: 'Guatemala',
  },
  {
    key: 'MADAGASCAR',
    icon: '',
    label: 'Madagascar',
  },
  {
    key: 'BARBADOS',
    icon: '',
    label: 'Barbados',
  },
  {
    key: 'ARUBA',
    icon: '',
    label: 'Aruba',
  },
  {
    key: 'GIBRALTAR',
    icon: '',
    label: 'Gibraltar',
  },
  {
    key: 'NEW CALEDONIA',
    icon: '',
    label: 'New Caledonia',
  },
  {
    key: 'UGANDA',
    icon: '',
    label: 'Uganda',
  },
  {
    key: 'MALDIVES',
    icon: '',
    label: 'Maldives',
  },
  {
    key: 'ETHIOPIA',
    icon: '',
    label: 'Ethiopia',
  },
  {
    key: 'TANZANIA',
    icon: '',
    label: 'Tanzania',
  },
  {
    key: 'ZAMBIA',
    icon: '',
    label: 'Zambia',
  },
  {
    key: 'DJIBOUTI',
    icon: '',
    label: 'Djibouti',
  },
  {
    key: 'MONGOLIA',
    icon: '',
    label: 'Mongolia',
  },
  {
    key: 'EL SALVADOR',
    icon: '',
    label: 'El Salvador',
  },
  {
    key: 'EQUATORIAL GUINEA',
    icon: '',
    label: 'Equatorial Guinea',
  },
  {
    key: 'SAINT MARTIN',
    icon: '',
    label: 'Saint Martin',
  },
  {
    key: 'NIGER',
    icon: '',
    label: 'Niger',
  },
  {
    key: 'DOMINICA',
    icon: '',
    label: 'Dominica',
  },
  {
    key: 'HAITI',
    icon: '',
    label: 'Haiti',
  },
  {
    key: 'NAMIBIA',
    icon: '',
    label: 'Namibia',
  },
  {
    key: 'SEYCHELLES',
    icon: '',
    label: 'Seychelles',
  },
  {
    key: 'SURINAME',
    icon: '',
    label: 'Suriname',
  },
  {
    key: 'CAYMAN ISLANDS',
    icon: '',
    label: 'Cayman Islands',
  },
  {
    key: 'CURAÇAO',
    icon: '',
    label: 'Curaçao',
  },
  {
    key: 'GABON',
    icon: '',
    label: 'Gabon',
  },
  {
    key: 'BENIN',
    icon: '',
    label: 'Benin',
  },
  {
    key: 'BERMUDA',
    icon: '',
    label: 'Bermuda',
  },
  {
    key: 'GUYANA',
    icon: '',
    label: 'Guyana',
  },
  {
    key: 'BAHAMAS',
    icon: '',
    label: 'Bahamas',
  },
  {
    key: 'FIJI',
    icon: '',
    label: 'Fiji',
  },
  {
    key: 'GREENLAND',
    icon: '',
    label: 'Greenland',
  },
  {
    key: 'CABO VERDE',
    icon: '',
    label: 'Cabo Verde',
  },
  {
    key: 'CONGO',
    icon: '',
    label: 'Congo',
  },
  {
    key: 'GUINEA',
    icon: '',
    label: 'Guinea',
  },
  {
    key: 'VATICAN CITY',
    icon: '',
    label: 'Vatican City',
  },
  {
    key: 'ESWATINI',
    icon: '',
    label: 'Eswatini',
  },
  {
    key: 'GAMBIA',
    icon: '',
    label: 'Gambia',
  },
  {
    key: 'SUDAN',
    icon: '',
    label: 'Sudan',
  },
  {
    key: 'ZIMBABWE',
    icon: '',
    label: 'Zimbabwe',
  },
  {
    key: 'NEPAL',
    icon: '',
    label: 'Nepal',
  },
  {
    key: 'ANGOLA',
    icon: '',
    label: 'Angola',
  },
  {
    key: 'ANTIGUA AND BARBUDA',
    icon: '',
    label: 'Antigua and Barbuda',
  },
  {
    key: 'CAR',
    icon: '',
    label: 'CAR',
  },
  {
    key: 'CHAD',
    icon: '',
    label: 'Chad',
  },
  {
    key: 'LAOS',
    icon: '',
    label: 'Laos',
  },
  {
    key: 'LIBERIA',
    icon: '',
    label: 'Liberia',
  },
  {
    key: 'MOZAMBIQUE',
    icon: '',
    label: 'Mozambique',
  },
  {
    key: 'MYANMAR',
    icon: '',
    label: 'Myanmar',
  },
  {
    key: 'ST. BARTH',
    icon: '',
    label: 'St. Barth',
  },
  {
    key: 'SAINT LUCIA',
    icon: '',
    label: 'Saint Lucia',
  },
  {
    key: 'BHUTAN',
    icon: '',
    label: 'Bhutan',
  },
  {
    key: 'GUINEA-BISSAU',
    icon: '',
    label: 'Guinea-Bissau',
  },
  {
    key: 'MALI',
    icon: '',
    label: 'Mali',
  },
  {
    key: 'MAURITANIA',
    icon: '',
    label: 'Mauritania',
  },
  {
    key: 'NICARAGUA',
    icon: '',
    label: 'Nicaragua',
  },
  {
    key: 'SINT MAARTEN',
    icon: '',
    label: 'Sint Maarten',
  },
  {
    key: 'BELIZE',
    icon: '',
    label: 'Belize',
  },
  {
    key: 'ERITREA',
    icon: '',
    label: 'Eritrea',
  },
  {
    key: 'GRENADA',
    icon: '',
    label: 'Grenada',
  },
  {
    key: 'LIBYA',
    icon: '',
    label: 'Libya',
  },
  {
    key: 'MONTSERRAT',
    icon: '',
    label: 'Montserrat',
  },
  {
    key: 'PAPUA NEW GUINEA',
    icon: '',
    label: 'Papua New Guinea',
  },
  {
    key: 'ST. VINCENT GRENADINES',
    icon: '',
    label: 'St. Vincent Grenadines',
  },
  {
    key: 'SOMALIA',
    icon: '',
    label: 'Somalia',
  },
  {
    key: 'SYRIA',
    icon: '',
    label: 'Syria',
  },
  {
    key: 'TIMOR-LESTE',
    icon: '',
    label: 'Timor-Leste',
  },
  {
    key: 'TURKS AND CAICOS',
    icon: '',
    label: 'Turks and Caicos',
  },
]
