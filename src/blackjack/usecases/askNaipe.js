

/**
 * Esta funcion me devuelve el valor de mi carta
 * @param {Array<string>} deck Recibe la baraja y la revuelve otra vez
 * @returns {string} Devuelve la carta en string
 */
export const askNaipe = ( deck ) =>{
    if(deck.length === 0) throw 'No hay cartas en la baraja';

    let indexRandom = Math.floor(Math.random() * (deck.length - 0 + 1) - 0); 
    let naipeRandom = deck.splice(indexRandom, 1);
    return naipeRandom[0];
}


