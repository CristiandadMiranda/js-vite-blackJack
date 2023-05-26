
/**
 * Esta funcion me devuelve el valor de la carta que estoy recibiendo.
 * @param {string} naipe Recibe el valor de la carta en string
 * @returns {number} retorna el valor de la carta
 */
export const valueNaipe = ( naipe ) =>{
    const value = naipe.substring(0, naipe.length - 1);
    return ( isNaN( value ) ) 
            ? (value === 'A') ? 11 : 10
            : value * 1;

}

