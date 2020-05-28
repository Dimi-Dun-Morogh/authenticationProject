import axios from '../plugins/axios';
export async function getCountries(){
  try {
    const response = await axios.get('/location/get-countries')
    //console.log(response);
    return response;
  } catch (err) {

  }
}
export async function getCities(array,input){
  let COUNTRY_INDEX = array.indexOf(input);
  try {
    const response = await axios.get(`location/get-cities/${COUNTRY_INDEX+1}`)
    return response
  } catch (error) {
    console.log(error)
  }
}