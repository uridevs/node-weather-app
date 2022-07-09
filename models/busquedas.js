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

    get paramsOpenWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric',
            'lat': 36.761896,
            'lon': -2.110094
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
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));


        }catch(error){
            console.log(error)
            return [];
        }
        
        
        
    }

    async climaLugar (lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'appid': process.env.OPENWEATHER_KEY,
                    'lang': 'es',
                    'units': 'metric',
                    'lat': lat,
                    'lon': lon
                }
            });

            const resp = await instance.get()
            console.log(resp.data.weather[0])
            return {
                temp: resp.data.main.temp,
                temp_min: resp.data.main.temp_min,
                temp_max: resp.data.main.temp_max,
                clima: resp.data.weather[0].description
            }
            // return resp.data.main.map( dato => ({
            //     temp: dato.temp,
            //     temp_min: dato.temp_min,
            //     temp_max: dato.temp_max,
            // }));
            
        } catch (error) {
            console.log(error)
        }
    }
}


export {Busquedas}