import _ from 'underscore';

//*Esta función crea una nueva baraja(deck).
/**
 * Esta funcion crea un nuevo deck.
 * @param {Array<string>} typesNaipes Ejemplo [ 'C', 'D', 'H', 'S' ],
 * @param {Array<string>} typeSpecial Ejemplo [ 'A', 'J', 'Q', 'K' ];
 * @returns {Array} retorna nuestro arreglo de cartas
 */
 export const createDeck = ( typesNaipes, typeSpecial ) => {

    if( !typesNaipes || typesNaipes === 0  ) throw new Error('Tipos de cartas es obligatorio que sea un arreglo de string que no este vacio');
    if( !typeSpecial || typeSpecial === 0  ) throw new Error('Tipos de cartas especiales es obligatorio que sea un arreglo de string que no este vacio');


    let deck = [];

    for(let i = 2; i <= 10; i++){
        for( let type of typesNaipes){
            deck.push( `${i}${type}` );
        }
    }

    for (let type of typesNaipes) {
        for(let sp of typeSpecial){
            deck.push(`${sp}${type}`)
        }
    }
    return _.shuffle( deck );

}

