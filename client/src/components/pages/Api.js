import axios from 'axios';

let hunterioClientid;

if (process.env.NODE_ENV !== 'production') {
  hunterioClientid = process.env.REACT_APP_API_KEY;
} else {
  hunterioClientid = process.env.APPI_CLIENT_ID;
}

const fetchDomain = () => {
  console.log('Fetching Domain...');
  return axios
    .get(
      `https://api.hunter.io/v2/domain-search?domain=${text}&api_key=${hunterioClientid}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
