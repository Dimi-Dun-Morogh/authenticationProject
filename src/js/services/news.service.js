import axios from '../plugins/axios';



export async function getNews() {
  try {
    const response = await axios.get(
      `/news`,
      JSON.stringify({
        email,
        password,
      }),
    );
    console.log(response);
    return response
  } catch (error) {
    console.log(err);
    return Promise.reject(err);
  }
}
