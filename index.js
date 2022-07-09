import 'dotenv/config';
import colors from 'colors';
import { inquirerMenu, leerInput, pausa } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';


const main = async() => {

    const busquedas = new Busquedas();
    let opt;
    
    do {
        opt = await inquirerMenu();
        console.log({opt})
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                //Buscar los lugares

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados
                console.log('\n Información de la ciudad\n'.green)
                console.log('Ciudad: ')
                console.log('Lat: ')
                console.log('Long: ')
                console.log('Temperatura: ')
                console.log('Mínima: ')
                console.log('Máxima: ')
                break;
            case 2:
        
                break;
        }
        
        if (opt !== 0) await pausa();

    } while (opt !== 0);
    
};

main();