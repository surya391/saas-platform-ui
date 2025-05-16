// import axios from 'axios'

// const axiosInstance = axios.create({
//     baseURL : 'http://localhost:5000/',
//     // withCredentials: true,
// })

// export default axiosInstance



// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// });

// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://saas-app-aydbb8fhdtckecc7.centralindia-01.azurewebsites.net/v1/',
});

export default axiosInstance;

