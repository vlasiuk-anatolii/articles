export const useQuery = (arr: string[], chapter: string ) => {
  let result = '';
  for (const iterator of arr) {
    if(iterator !== '') {
      result += `${chapter}_contains=${iterator}&`;
    }
  }
  
  result = result.replace(/&$/, '');
  if (arr.length > 0) {
    return `?${result}`;
  }
  return '';
};
