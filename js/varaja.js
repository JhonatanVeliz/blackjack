// valores de los botones
const btnNewGame = document.querySelectorAll('.btnNuevo'),
      btnPedir   = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener');

// Valores de los contenedores de las imagenes para posterios ingresar las cartas
let imgUsuario = document.querySelector('#img_usuario'),
    imgMaquina = document.querySelector('#img_maquina');

// Listado de los valores que necesito para llenar el deck

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'K', 'Q'];

// bucle que crea el array deck con las posiciones de los array tipos y especiales para formar los valores para las cartas de mi varaja
const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
        for(let tipo of tipos){
            for(let especial of especiales){
                deck.push(especial + tipo);
            }
        }
    }
};

// Cuando cargue la pagina se ejecutara esta funcion

window.addEventListener('load', crearDeck);

// Revisa si un boton de nueva partida se cliquea para que este restaure los valores
btnNewGame.forEach( (e)=>{
    e.addEventListener('click', ()=>{
        location.reload();
    })
})

// Esta funcion genera un modal para el game over

const generarModalGameOver = (resultadoFinal)=>{

    // Valor del modal game over para que salte el modal en caso de que se pierda

    const modalGameOver = document.querySelector('#modal-game-over');
    modalGameOver.classList.remove('oculto');

    // Valor para poner el resultado final para que sepa la razon por la cual perdio
    const resultado = document.querySelector('#resultado').textContent += resultadoFinal;
    
}; 

// ESTA ES LA FUNCION MAIN QUE SE ENSCARGA DE PEDIR LA CARTA Y REALIZAR LAS VALIDACIONES
const pedirCarta = ()=>{

    let valorAleatorio = deckAleatorio();

    let valorparaVerificar = obtenerNumero(valorAleatorio);

    verificarNumero(valorparaVerificar);

    generarImagenUsuario(valorAleatorio);

};
// Esta funcion desabilita los botones de pedir y detener para que el usuario no pueda seguir jugando almenos que pida una ronda

const botonesDisabel = ()=>{
    btnPedir.disabled = true;
    btnPedir.style.opacity = '.7';

    btnDetener.disabled = true;
    btnDetener.style.opacity = '.7';
};
// Funcion que genera el modal del ganador
const modalGanar = ()=>{
    let modalGanar = document.querySelector('#modal-ganar').classList.remove('oculto');
    const mensajeGanar = document.querySelector('#ganar-result').textContent = `HICISTE ${numeroConstante}`;
}
// Esta funcion verifica la cantidad del numero para defiir si el usuario gano, perdio o empato 
let numeroConstante = 0;
const verificarNumero = (valor)=>{

    numeroConstante += valor;

    if(numeroConstante === 21){
        modalGanar()
        botonesDisabel();
    }
    else if(numeroConstante > 21){
        botonesDisabel();
        for(let i = 0; i < 3; i++){
            puntosMaquina();
        };
        setTimeout( ()=>{
            generarModalGameOver(numeroConstante);
        }, 1000);
    }
};

// Esta funcion verifica el tipo de carta para retornar un valor y asi poder pasarlo como callback a la otra funcion que determinara si la suma es igual, menor y mayor que 21 para definir cual sera el resultado

const obtenerNumero = (num)=>{
    const numeroFiltrado = num.slice(0, -1)

    let valorFinal = (isNaN(numeroFiltrado)) ? (numeroFiltrado === 'A') ? 11 : 10 
    : numeroFiltrado * 1;

    puntosUsuario(valorFinal);

    return valorFinal;
};

// ESTA FUNCION VERIFICA EL NUMERO PARA LA MAQUINA
const obtenerNumeroMaquina = (num)=>{
    const numeroFiltrado = num.slice(0, -1)

    let valorFinal = (isNaN(numeroFiltrado)) ? (numeroFiltrado === 'A') ? 11 : 10 
    : numeroFiltrado * 1;

    return valorFinal;
};

// funcion que retorna un valor aleatorio del array deck para ser introducido en la img de la carta
const deckAleatorio = ()=>{
    deck.sort( ()=> Math.random() -0.5 );
    const valorUnico = deck.pop();

    return valorUnico;
};

// Funcion que genara la carta y en el parametro valor recibe el valor que se a creado en el deck

const generarImagenUsuario = (valor)=>{
    imgUsuario.innerHTML += `<img src="./img/${valor}.png" id="carta_usuario" class="marginLeft">`;
};

// Funcion que genera la carta y el parametro del valor de la misma para la maquina
const generarImagenMaquina = (valor)=>{
    imgMaquina.innerHTML += `<img src="./img/${valor}.png" id="carta_usuario" class="marginLeft">`;
}

// evento que escucha el click del btnPedir para que cuando este sea cliqueado se genere una carta

btnPedir.addEventListener('click', pedirCarta);

// ******************************************************************************
// En esta parte recibo los valores de los puntos tanto del usuario como el de la maquina para que el usuario pueda verificar su punte al costado de su nombre, recordar que el valor [0], sera el usuario y el valor [1], sera la maquina

let punteos = document.querySelectorAll('.puntos');

// Funcion que genera la cantidad de puntos para que el usuario pueda ver su punteo antes de hacer 21

const puntosUsuario = (num)=>{
    
    let resultado = punteos[0].textContent;
    resultado = parseInt(resultado);
    
    return parseInt(punteos[0].textContent = resultado+= num);
};

// Funcion que genera el mismo punteo de la funcion de arriba solo que es para la maquina
const puntosMaquina = ()=>{

    let resultado = punteos[1].textContent;
    resultado = parseInt(resultado);

    generarImagenMaquina(deckAleatorio());
    return parseInt(punteos[1].textContent = resultado += obtenerNumeroMaquina(deckAleatorio()));
};

// Funcion que deteniene el juego y reliza la comparacion
const detenerJuego = ()=>{
    botonesDisabel();
    puntosMaquina();

    let puntosComparar = puntosMaquina();

    if(puntosComparar === 21){
        generarModalGameOver(puntosComparar);
    }else{
        modalGanar();
    }
}

// Evento que deteniene la operacion y define quien gano
btnDetener.addEventListener('click', detenerJuego);

