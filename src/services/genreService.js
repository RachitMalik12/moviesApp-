import httpService from './httpService'; 
import config from '../common/config.json'; 

export async function getGenres() {
   
   const result = await  httpService.get(config.genreEndPoint); 
   return result; 

}


