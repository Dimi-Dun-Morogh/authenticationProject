const lsTokenKey = 'my_app_token';

function setTokenOnLogin(res) {
 // console.log(res);
  const isLoginUrl = res.config.url.includes('login');
  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTokenKey, token);
  }
  return res;
}

function getClearResponse(res) {
  // const countryOrCity = res.config.url.includes('countries');
  // if(countryOrCity){
  //   return res;
  // }
  return res.data;
}

function setToken(req) {
  //console.log(req);
  const isAuthUrl = req.url.includes('auth');
  if(!isAuthUrl){
    const token = localStorage.getItem(lsTokenKey);
    req.headers['x-access-token'] = token;
  }

  return req;
}
function onError(err){
  console.dir(err);
  console.log(err.response.data.message)
  return err.response.data.message
  //return Promise.reject()
}

export default function (axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse);
}
