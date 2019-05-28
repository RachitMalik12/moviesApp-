import httpService from './httpService'; 
import config from '../common/config.json'; 

export function getGenres() {
   
   return httpService.get(config.genreEndPoint); 
   

}


