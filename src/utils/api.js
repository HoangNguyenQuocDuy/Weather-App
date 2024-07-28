export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

export const options = {
  method: 'GET',
  url: `${GEO_API_URL}/cities`,
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

