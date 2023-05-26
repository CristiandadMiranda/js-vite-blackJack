let d = document;

/**
 * Esta funcion es la que me va añadir las imagenes de mis cartas
 * @param {string} naipe  esta variable recibe la carta que quiero mostrar
 * @param {number} turno Esta variable recibe el turno de quie estea jugando
 * @param {HTMLElement} divNaipesPlayers este va a ser el elemento del HTML  donde agregare las img
 */
export const showNaipe = (naipe, turno, divNaipesPlayers) => {

    const imgNaipe = d.createElement('img');
    imgNaipe.src = `./assets/cartas/${ naipe }.png`;
    imgNaipe.classList.add('naipe');
    divNaipesPlayers[turno].append(imgNaipe);


}