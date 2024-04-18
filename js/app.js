//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    //Cuando agregas un curso presionano "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);//cuando hace click llama a agregarCurso

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito= [];//reseteamos arreglo

        limpiarHTML();//eliminamos residuos de html
    })
}

//Funciones
function agregarCurso(e){
    e.preventDefault();

    if ( e.target.classList.contains('agregar-carrito'))
    {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
 //elimina cursos del carrito presionando boton
 function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso'))
    {

        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId); //recorre arreglo y trae todos los cursos menos el del id a borrar

        carritoHTML();//llamamos funcion para mostrar los valores html a carrito
    }

 }

//lee contenido del html al que dimos click y extra info
function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un curso con el mismo id ya esta en carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);//some itera entre arreglo original y objeto y manda true si el id es igual

    if(existe) {
        //Actualizamos cantidad
        const cursos = articulosCarrito.map(curso => { //map itera sobre arreglo y crea otro
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el curso con cantidad actualizado
            } else {
                return curso;// retorna el curso como esta
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agrega elementos del arreglo al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    carritoHTML();

}

//muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            ${curso.titulo}
        </td>
        <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}" >X</a>
        </td>
        `;

        //agrega html del carrito en el body
        contenedorCarrito.appendChild(row);
    })
}

//elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}