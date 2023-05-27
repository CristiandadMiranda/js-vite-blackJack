const myModule = (() => {
    'use strict';
    
    
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




    //*Esta funcion inicializa el juego.
    const initGame = ( numPlayers = 2 ) => {

        deck = createDeck();
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

    //*Esta función crea una nueva baraja(deck).
    const createDeck = () => {

        deck = [];

        for(let i = 2; i <= 10; i++){
            for( let type of types){
                deck.push( `${i}${type}` );
            }
        }

        for (let type of types) {
            for(let sp of special){
                deck.push(`${sp}${type}`)
            }
        }
        return _.shuffle( deck );

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


    //*Esta función me permite tomar una carta
    //*Obtengo el indice aleatorio.
    const askNaipe = (  ) =>{
        if(deck.length === 0) throw 'No hay cartas en la baraja';

        let indexRandom = Math.floor(Math.random() * (deck.length - 0 + 1) - 0); 
        let naipeRandom = deck.splice(indexRandom, 1);
        return naipeRandom[0];
    }

    //askNaipe()

    //* MENSAJES DE GEP

    const alerts = (  ) => {
        
        const[ pointsPlayer, pointsPc ] = pointsPlayers;

        setTimeout(() => {
            ( pointsPc === pointsPlayer ) 
            ? alert('Empataste contra la maquina vuelve a intentarlo') 
            : ( (pointsPlayer > 21 || pointsPlayer < pointsPc) && (pointsPc <= 21) ) 
                ? alert( 'You Lose' )
                : alert( 'You Win' )
        }, 400)
    }

    //* Esta función me devuelve el valor de la carta que pedí. O el valor del turno del player;

    const valueNaipePlayer = ( naipe ) =>{
        const value = naipe.substring(0, naipe.length - 1);
        return ( isNaN( value ) ) 
                ? (value === 'A') ? 11 : 10
                : value * 1;

    }
    //* Irá acumulando los puntos de los jugadores que esten jugando .
    //* turnPlayer 0 = primer jugador, último valor siempre será el turno de la machine.
    const accumPoints = (naipe,  turnPlayer ) => {

        pointsPlayers[ turnPlayer ] += valueNaipePlayer( naipe ) ;
        smallPlayerPc[ turnPlayer ].innerHTML = pointsPlayers[ turnPlayer ];
        return pointsPlayers[turnPlayer];


    };

    const showNaipe = (naipe, turno) => {

        const imgNaipe = d.createElement('img');
        imgNaipe.src = `./assets/cartas/${ naipe }.png`;
        imgNaipe.classList.add('naipe');
        divNaipesPlayers[turno].append(imgNaipe);


    }

    //*Turno de la machine;

    const valueNaipePc = ( minPoints ) =>{
        let pointsPc = 0;
        do {

        const naipe = askNaipe();
        
        pointsPc = accumPoints( naipe, pointsPlayers.length - 1  );
        
        showNaipe( naipe, pointsPlayers.length - 1 );


        } while( (pointsPc < minPoints) && (minPoints <= 21) );

        alerts();

    }



    //*EVENTOS
    btnAsk.addEventListener( 'click', () => {
        
        const naipe = askNaipe();
        const pointsPlayer = accumPoints(naipe, 0);

        showNaipe(naipe, 0)

        if ( pointsPlayer > 21 ) {
            btnAsk.disabled = true;
            btnStop.disabled = true;
            valueNaipePc( pointsPlayer );
        } else if ( pointsPlayer === 21 ) {
            console.warn( 'GREAT 21 !!!' );
            btnAsk.disabled = true;
            btnStop.disabled = true;
            valueNaipePc( pointsPlayer );
        }

    } );

    btnStop.addEventListener( 'click', () => {

        btnAsk.disabled = true;
        btnStop.disabled = true;
        valueNaipePc( pointsPlayers[0] );

    } );

    btnNew.addEventListener( 'click', () => {
        initGame();
    } );
        

    return {
        newGame : initGame
    };

})();


