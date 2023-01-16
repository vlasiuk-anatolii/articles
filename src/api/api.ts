export const BASE_URL = 'https://api.spaceflightnewsapi.net/v3/';

export async function getArticles(query:string) {
  try {
    const response = await fetch(`${BASE_URL}articles/${query}`);

    return await response.json();
  } catch (error) {
    return error;
  }
}