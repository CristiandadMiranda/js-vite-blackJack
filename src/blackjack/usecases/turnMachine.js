import { showNaipe } from "./showNaipe";
import { askNaipe } from "./askNaipe";
import { alerts, accumPoints } from "..";


/**
 * Esta funcion me devolvera los puntos de la computadora y si ganamos o perdimos
 * @param {number} minPoints Esta variable recibe los puntos que tiene el jugador 
 * @param {Array<string>} deck Recibe tambien la baraja de cartas 
 * @param {Array<number>} pointsPlayers La variable que contiene los participantes de la partida y por defecto la ultima posicion es de la maquina 
 */
export const valueNaipePc = ( minPoints, pointsPlayers, deck,divNaipesPlayers ) =>{
    let pointsPc = 0;
    do {

    const naipe = askNaipe( deck );
    
    pointsPc = accumPoints( naipe, pointsPlayers.length - 1  );
    
    showNaipe( naipe, pointsPlayers.length - 1, divNaipesPlayers );


    } while( (pointsPc < minPoints) && (minPoints <= 21) );

    alerts();

}