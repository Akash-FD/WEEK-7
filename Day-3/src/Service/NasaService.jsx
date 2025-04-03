import API from "../api/API";
import endpoint from "../api/endpoint";

class NasaServices {
    static async getImages(search){
        const {data} = await API.get(endpoint.api.search + search)
        return data
    }
    // static getImages(){
    //     return API.get(endpoint.api.search)
    // }
    // static getImages(){
    //     return API.get(endpoint.api.search)
    // }
    // static getImages(){
    //     return API.get(endpoint.api.search)
    // }
}



export default NasaServices

