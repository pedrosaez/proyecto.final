const muebles = [
    { id: 1, nombre: "Mesa Julia", precio: 50000, imagen: "mesaJulia.jpg" },
    { id: 2, nombre: "Rack Tv", precio: 45000, imagen: "rack.jpg" },
    { id: 3, nombre: "Sofá Barcelona", precio: 85000, imagen: "sillon2.jpg" },
    { id: 4, nombre: "Sofá Chester", precio: 105000, imagen: "sillon5.jpg" },
    { id: 5, nombre: "Mesa Ratona", precio: 20000, imagen: "mesaRatona.jpg" },
    { id: 6, nombre: "Vanitory", precio: 30000, imagen: "vanitory.jpg" },
    { id: 7, nombre: "Sofa Liverpool", precio: 20000, imagen: "rack.jpg" },
    { id: 8, nombre: "Silla Bertoia", precio: 30000, imagen: "sillon2.jpg" },
];

function guardarMueblesLs(muebles){
    localStorage.setItem("muebles", JSON.stringify(muebles));
}

function cargarMueblesLs(){
    return JSON.parse(localStorage.getItem("muebles")) || [];
}

function guardarMueblesCarrito(muebles){
    localStorage.setItem("mueblesCarrito", JSON.stringify(muebles));
}

function cargarMueblesCarrito(){
    return JSON.parse(localStorage.getItem("mueblesCarrito")) || [];
}

function buscarMueble(id){
    const muebles = cargarMueblesLs();

    return muebles.find(item => item.id === id);
}

// Agregar muebles que ya esten en el carrito

function agregarMuebles(id){
    const mueblesCarrito = cargarMueblesCarrito();
    let pos = mueblesCarrito.findIndex(item=> item.id === id);

    if(pos > -1){
        mueblesCarrito[pos].cantidad += 1;
    }else{
        const mueble = buscarMueble(id);
        mueble.cantidad = 1;
        mueblesCarrito.push(mueble);
    }

    guardarMueblesCarrito(mueblesCarrito);
    botonCarrito();

}

// Eliminar muebles del carrito

function eliminarMuebles(id){
    const mueblesCarrito = cargarMueblesCarrito();
    let pos = mueblesCarrito.findIndex(item=> item.id === id);
    mueblesCarrito[pos].cantidad -= 1;

    if( mueblesCarrito[pos].cantidad == 0){
        mueblesCarrito.splice(pos, 1);
    }

    guardarMueblesCarrito(mueblesCarrito);
    renderMueblesCarrito();
    botonCarrito();

}

// Render boton carrito

function botonCarrito(){
    let contenido = `
    <button type="button" class="carrito1 border border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" position-relative"><i class="imgCarrito fa-solid fa-basket-shopping"></i><span class=" span1  start-100 translate-middle badge rounded-pill bg-danger">${mueblesTotal()}</span>
</button>
<div class="canvas1 offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style="width: 600px;">
<div class="offcanvas-header">
<h5 id="offcanvasRightLabel">Carrito de compras</h5>
<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
</div>
<div class="offcanvas-body">
    ${renderMueblesCarrito()}
</div>
</div>
    `;

    document.getElementById("seccionMuebles").innerHTML = contenido;
}

// funcion para sumar todos los muebles del carrito

function mueblesTotal(){
    const mueblesCarrito = cargarMueblesCarrito();

    return mueblesCarrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
}

// Render muebles en Carrito

function renderMueblesCarrito(){
    const muebles = cargarMueblesCarrito();
    let mueblesEnCarrito = "";

    if(muebles.length == 0){
        mueblesEnCarrito = `<div class="alert alert-secondary" text-center role="alert">No hay productos en el carrito!</div>`;
    }else{
        mueblesEnCarrito += `<table class="table">`;
        
        muebles.forEach(mueble => {
            mueblesEnCarrito += `<tr> 
                <td><img src="./img/${mueble.imagen}" class="imgVistaCarritoCompra" alt="${mueble.nombre}"></td>
                <td> ${mueble.nombre}</td>
                <td>$${mueble.precio}</td>
                <td><button type="button" class="btn btn-outline-dark title="Eliminar" onclick="eliminarMuebles(${mueble.id});">-</button> ${mueble.cantidad} <button type="button" class="btn btn-outline-dark title="Agregar"  onclick="agregarMuebles(${mueble.id});">+</button></td>
                <td>$${mueble.precio * mueble.cantidad}</td>
                <td><button class="btn btn-outline-danger" onclick="eliminarMuebles(${mueble.id});"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`; 
        });
        mueblesEnCarrito += `<tr>
        <td class= "text-end" colspan="6"><a href="#" class="btn btn-outline-danger" onclick="vaciarCarrito()">Vaciar Carrito</a></td>
        </tr>
        <tr>
        <td colspan="4">Total a pagar:</td>
        <td>$${TotalAPagar()}</td>
        </tr>
        <tr>
        <td class= "text-end" colspan="6"><a href="#" class="btn btn-outline-success" onclick="alerta()">Finalizar compra</a></td>
        </tr>
        </table>`;
    }
    

    return mueblesEnCarrito;
}

// Alerta compra finalizada

function alerta(){
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Gracias por tu compra!',
        showConfirmButton: false,
        timer: 1000
    })
}

// Vaciar Carrito

function vaciarCarrito(){
    localStorage.removeItem("mueblesCarrito");
    renderMueblesCarrito();
    botonCarrito();
}

// Total

function TotalAPagar(){
    const mueblesCarrito = cargarMueblesCarrito();

    return mueblesCarrito.reduce((acumulador, item) => acumulador + (item.cantidad * item.precio), 0);
}

// Render Sección muebles

function renderMuebles(){
    const muebles = cargarMueblesLs();
    let catalogo = "";

    muebles.forEach(mueble => {
        catalogo +=  
        `<div class="col-md-3 justify-content-center">
            <div class="card text-center border border-0">
                <img src="./img/${mueble.imagen}" class="card-img-top" alt="${mueble.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${mueble.nombre}</h5>
                    <p class="card-text">$${mueble.precio}</p>
                    <a href="#" class="agregarAlCarrito rounded-pill btn btn-outline-dark" title="Agregar" onclick="agregarMuebles(${mueble.id});compraAprobada()">Agregar al carrito</a>
                </div>
            </div>
        </div>`;
        
    });

    document.getElementById("muebles").innerHTML = catalogo; 
}

function compraAprobada(){
    Toastify({
        text: "Producto agregado",
        className: "info",
        style: {
        gravity: "top",
        background: "#aa896d",
        timer: 500
    }
    }).showToast();
};

guardarMueblesLs(muebles);
renderMuebles(); 
botonCarrito();
