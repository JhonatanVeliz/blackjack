// VALORES DEL MODAL DE DATOS
// valores de la ventana modal de datos del usuario, input y formulario
const ventanaContainer = document.querySelectorAll('.modal'),
      formulario       = document.querySelector('#form'),
      nombreUsuario    = formulario.querySelector('#name'),
      nombreMaquina    = document.querySelector('#maquina'),
      cajaDeResultado  = document.querySelector('#usuario'),
      btnAceptar       = document.querySelector('#aceptar'),
      btnCancelar      = document.querySelector('#cancelar'),
      btnAceptarAll    = document.querySelectorAll('.btn--aceptar');

// Esta funcion previene el comportamiento del navegador al evento submit
const formPreventDefault = (e)=>{
    e.preventDefault();
}
formulario.addEventListener('submit', formPreventDefault);

// Esta funcion genera un nombre aleatorio
const nombresAleatoios = ['Papitas Frias', 'Aitor Tilla', 'Rarolfo', 'Petrino', 'El "Sin Nombre"', 'Pantufla', 'Helen Chufe', 'Lola Mento', 'El "YO"'];
let nombreFinal;

const generadorDeNombres = ()=>{
    let contadorAleatorio = Math.floor(Math.random() * nombresAleatoios.length);
    return nombreFinal = nombresAleatoios[contadorAleatorio];
}
// Esta funcion remueve los modales
const removeModal = ()=>{
    ventanaContainer.forEach( (e)=>{
        e.classList.add('oculto');
    })
};
// FOREACH que estara escuchando el click de cada boton aceptar para remover el modal
btnAceptarAll.forEach( (elemnt)=>{
    elemnt.addEventListener('click', removeModal)
});

// Esta funcion removera la ventana modal
const ventanaModalRemove = ()=>{
    if(nombreUsuario.value === ''){
        cajaDeResultado.textContent = generadorDeNombres();
    }else{
        cajaDeResultado.textContent = nombreUsuario.value;
    }
    nombreMaquina.textContent = generadorDeNombres();
    removeModal()
}
btnAceptar.addEventListener('click', ventanaModalRemove);
btnCancelar.addEventListener('click', ventanaModalRemove);

// VALORES DEL MODAL DE GAME OVER