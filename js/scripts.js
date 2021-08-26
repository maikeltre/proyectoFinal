//Variables
const menuToggle = document.querySelector('.menuToggle');
const enlaces = document.querySelector('.contenedor__enlaces');
const carritoSubmenu = document.querySelector('.submenu');
const carritoImg = document.querySelector('#submenu__img')
const botonTop = document.querySelector('.contenedor__boton');
const enlaceTexto = document.querySelector('.enlace__producto--pg');
const barraNavegacion = document.querySelector('.navegacion');
const enlaceColor = document.querySelectorAll('.enlace');
const enlaceProductos = document.querySelector('#enlaces__productos')

const carrito = document.querySelector("#carrito");
const listaProductos = document.querySelector('#contenedor__productos--pg');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    vaciarCarritoBtn.addEventListener('click', limpiarHTML);
    carrito.addEventListener('click', eliminarCurso);
     // Dispara cuando se presiona "Agregar Carrito"
    try {
        listaProductos.addEventListener('click', agregarProducto);
    } catch(error) {
        console.log("da un error");
    }

}

// //Funciones

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('producto__btn--pg')) {
        const ProductoSeleccionado = e.target.parentElement.parentElement

        leerDatosProducto(ProductoSeleccionado);
        carritoHTML();

    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

//Lee el HTML al que le damos click
function leerDatosProducto(producto){
     
    //Crear un objeto con el contenido del curso actual 
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('.producto__btn--pg').getAttribute('data-id'),
        cantidad: 1 
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id)
    if (existe) {
        //Actualizamos cantidad
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos]
    } else {
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito)
    carritoHTML();
}

//Muestra el carrito de compras
function carritoHTML() {
    limpiarHTML();
    
    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, id, cantidad } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        //Agregar el HTML en el tbody
        contenedorCarrito.appendChild(row);
    });
}

    //Limpiar el HTML
    function limpiarHTML() {
        // contenedorCarrito.innerHTML = "";
        while(contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        }
    }

function ToggleMenu() {
    menuToggle.classList.toggle('active');
    enlaces.classList.toggle('active');
}

function submenu() {
    carritoSubmenu.onclick = function() {
        carritoSubmenu.classList.toggle('active');
        carrito.classList.toggle('active');
    }

}

function scrollUp(){
    window.onscroll = function () {
        let scroll = document.documentElement.scrollTop;
        // alert(scroll)
        if (scroll > 500) {
            botonTop.style.transform = "scale(1)";
            
        } else if(scroll < 500) {
            botonTop.style.transform = "scale(0)";
        }
        if (scroll > 50) {
            barraNavegacion.style.backgroundColor = "rgba(0, 0, 0, 0.726)";
            enlaceProductos.style.backgroundColor = "rgba(0, 0, 0, 0.726)";
            
        } else if(scroll < 50) {
            barraNavegacion.style.backgroundColor = "transparent";
            enlaceProductos.style.backgroundColor = "transparent";
        }

    }
}
scrollUp();