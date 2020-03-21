const geolib = require('geolib')

const TESTING_CENTERS = [
  {
    name: 'Research Institute for Tropical Medicine',
    longitude: 121.0371637,
    latitude: 14.4099136,
    type: 'Health Research Facility',
    verified: true,
  },

  {
    name: 'Vicente Sotto Memorial Medical Center',
    longitude: 123.8914747,
    latitude: 10.3080521,
    type: 'Health Research Facility',
    verified: true,
  },

  {
    name: 'Lung Center of the Philippines',
    longitude: 121.0436766,
    latitude: 14.6472039,
    type: 'Health Research Facility',
    verified: true,
  },

  {
    name: 'Southern Philippines Medical Center',
    longitude: 125.6198615,
    latitude: 7.0983178,
    type: 'Hospital',
    verified: false,
  },

  {
    name: 'San Lazaro Hospital',
    longitude: 120.9810214,
    latitude: 14.6137981,
    type: 'Hospital',
    verified: false,
  },

  {
    name: 'Baguio General Hospital',
    longitude: 120.5939286,
    latitude: 16.4011304,
    type: 'Health Research Facility',
    verified: true,
  },

  {
    name: 'University of the Philippines - National Institutes of Health',
    longitude: 120.9849505,
    latitude: 14.5759353,
    type: 'Health Research Facility',
    verified: false,
  },

  {
    name: 'Dr. Jose N. Rodriguez Memorial Hospital',
    longitude: 121.0626532,
    latitude: 14.7667237,
    type: 'Health Research Facility',
    verified: true,
  },

  {
    name: 'UP-Philippine General Hospital',
    longitude: 120.9856082,
    latitude: 14.5774498,
    type: 'Health Research Facility',
    verified: true,
  },
]

const nearest = (coordinates) => {
  const testingCenters = geolib.orderByDistance(coordinates, TESTING_CENTERS).splice(0, 3)

  return testingCenters.map((testingCenter) => ({
    ...testingCenter,
    distance: geolib.convertDistance(
      geolib.getDistance(coordinates, {
        latitude: testingCenter.latitude,
        longitude: testingCenter.longitude,
      }),
      'km'
    ),
  }))
}

module.exports = {
  nearest,
}
