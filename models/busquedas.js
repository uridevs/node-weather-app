import axios from 'axios'

class Busquedas {

    historial = [ 'Tegucigalpa', 'Madrid', 'San Jose', 'Bogotá']

    constructor(){
        //TODO: leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }

    }

    async ciudad( lugar= ''){
        // petición http
        // console.log('ciudad: ', lugar);

        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            console.log(resp.data);

        }catch(error){
            console.log(error)
            return [];
        }
        
        
        
    }
}

export {Busquedas}