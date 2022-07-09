import fs from 'fs';
import axios from 'axios'

class Busquedas {

    dbPath = './db/database.json'
    historial = []

    constructor(){
        //TODO: leer DB si existe
        this.cargarDB()
        
    }

    get historialCapitalizado(){
        return this.historial.map( ciudad =>{

            let palabras = ciudad.split(' ')
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1))

            return palabras.join(' ')

        })
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
            'units': 'metric'
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
                params: {...this.paramsOpenWeather, lat,lon}
            });

            const resp = await instance.get()
            
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

    agregarHistorial( lugar=''){
        //prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())){
            return;

        }else{
            this.historial = this.historial.splice(0,5);
            this.historial.unshift( lugar.toLocaleLowerCase() );

            this.guardarDB();
        }
    }
        

        // Grabar en DB
    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    };

    cargarDB(){
        
        if (fs.existsSync(this.dbPath)){
            try {
                const info = fs.readFileSync(this.dbPath, 'utf8');
                if (!info) return;

                const data = JSON.parse(info)
                this.historial = data.historial
            } catch (err) {
                console.log('ERROR - No se pudo cargar el historial')
                console.error(err);
            }
        }
    }

    
}


export {Busquedas}