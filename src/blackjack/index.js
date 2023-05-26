import _ from 'underscore';

import { createDeck , askNaipe, valueNaipe, valueNaipePc, showNaipe} from './usecases/index.js'


    let deck        = [];
    const types     = [ 'C', 'D', 'H', 'S' ],
          special   = [ 'A', 'J', 'Q', 'K' ];
    
    /* let pointsPlayer = 0,
    pointsPc         = 0;
     */
    let pointsPlayers = [];
    //*REFERENCIAS DEL HTML
    //*Document
    const d = document
    //*BUTTONS
    const btnAsk  = d.querySelector('#btnAsk'),
          btnStop = d.querySelector('#btnStop'),
          btnNew  = d.querySelector('#btnNew');
    //*SMALLS
    const smallPlayerPc =  d.querySelectorAll('small');
    //*DIVS
    const divNaipesPlayers = d.querySelectorAll('.divNaipes');


    //*Creo una baraja(deck)
    deck = createDeck(types, special);


    //*Esta funcion inicializa el juego.
    const initGame = ( numPlayers = 2 ) => {

        deck = createDeck(types, special);
        pointsPlayers = [];
        for( let i = 0; i < numPlayers; i++ ){
            pointsPlayers.push(0);
            // smallPlayerPc[i].innerText = 0;
            // divNaipesPlayers[i].innerHTML = '';
        }

        smallPlayerPc.forEach ( elem => elem.innerText = 0 );
        divNaipesPlayers.forEach ( elem => elem.innerHTML = '' );

        btnAsk.disabled   = false;
        btnStop.disabled  = false;

    }


    
    //*YOU LOSE - YOU WIN

    const youWin = () => {

        btnAsk.disabled = true;
        btnStop.disabled = true;
        const img = d.createElement('img');
        img.classList.add('winLose');
        img.src = '/assets/winLose/ddf-3495534300';

        pcNaipesDiv.append( img );



    }



    //* MENSAJES DE GEP

    export const alerts = (  ) => {
        
        const[ pointsPlayer, pointsPc ] = pointsPlayers;

        setTimeout(() => {
            ( pointsPc === pointsPlayer ) 
            ? alert('Empataste contra la maquina vuelve a intentarlo') 
            : ( (pointsPlayer > 21 || pointsPlayer < pointsPc) && (pointsPc <= 21) ) 
                ? alert( 'You Lose' )
                : alert( 'You Win' )
        }, 400)
    }

    //* Irá acumulando los puntos de los jugadores que esten jugando .
    //* turnPlayer 0 = primer jugador, último valor siempre será el turno de la machine.
    export const accumPoints = (naipe,  turnPlayer ) => {

        pointsPlayers[ turnPlayer ] += valueNaipe( naipe ) ;
        smallPlayerPc[ turnPlayer ].innerHTML = pointsPlayers[ turnPlayer ];
        return pointsPlayers[turnPlayer];


    };
    


    //*EVENTOS
    btnAsk.addEventListener( 'click', () => {
        
        const naipe = askNaipe( deck );
        const pointsPlayer = accumPoints(naipe, 0);

        showNaipe(naipe, 0, divNaipesPlayers,divNaipesPlayers)

        if ( pointsPlayer > 21 ) {
            btnAsk.disabled = true;
            btnStop.disabled = true;
            valueNaipePc( pointsPlayer, pointsPlayers, deck, divNaipesPlayers );
        } else if ( pointsPlayer === 21 ) {
            console.warn( 'GREAT 21 !!!' );
            btnAsk.disabled = true;
            btnStop.disabled = true;
            valueNaipePc( pointsPlayer, pointsPlayers, deck, divNaipesPlayers );
        }

    } );

    btnStop.addEventListener( 'click', () => {

        btnAsk.disabled = true;
        btnStop.disabled = true;
        valueNaipePc( pointsPlayers[0], pointsPlayers, deck, divNaipesPlayers );

    } );

    btnNew.addEventListener( 'click', () => {
        initGame();
    } );


