import 'dotenv/config';
import colors from 'colors';
import { inquirerMenu, leerInput, pausa, listarLugares } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';


const main = async() => {

    const busquedas = new Busquedas();
    let opt;
    
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSelec = lugares.find( l => l.id === id)
                const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng)
                console.log(clima)
                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\n Información de la ciudad\n'.green)
                console.log('Ciudad: ', lugarSelec.nombre)
                console.log('Lat: ', lugarSelec.lat)
                console.log('Long: ', lugarSelec.lng)
                console.log('Temperatura: ', clima.temp)
                console.log('Mínima: ', clima.temp_min)
                console.log('Máxima: ', clima.temp_max)
                console.log('Clima: ', clima.clima)
                break;
            case 2:

                break;
        }
        
        if (opt !== 0) await pausa();

    } while (opt !== 0);
    
};

main();