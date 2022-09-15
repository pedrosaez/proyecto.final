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

function agregarMuebles(id){
    const mueblesCarrito = cargarMueblesCarrito();
    let pos = mueblesCarrito.findIndex(item=> item.id === id);

    if(pos > -1){
        mueblesCarrito[pos].cantidad += 1;
    }else{
        const mueble = buscarMueble(id);
        muebles.cantidad = 1;
        mueblesCarrito.push(mueble);
    }

    guardarMueblesCarrito(mueblesCarrito);
    botonCarrito();

}

// Render boton carrito

function botonCarrito(){
    const mueblesCarrito = cargarMueblesCarrito();
    let total = mueblesCarrito.length;
    let contenido = `
    <button type="button" class="carrito1 border border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" position-relative"><i class="imgCarrito fa-solid fa-basket-shopping"></i><span class=" span1  start-100 translate-middle badge rounded-pill bg-danger">${total}</span>
</button>
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
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

// Render muebles en Carrito

function renderMueblesCarrito(){
    const muebles = cargarMueblesCarrito();
    let mueblesEnCarrito = "";

    if(muebles.length == 0){
        mueblesEnCarrito = `<div class="alert alert-secondary" role="alert">No hay productos en el carrito!</div>`;
    }else{
        mueblesEnCarrito += `<table class="table">`;
        
        muebles.forEach(mueble => {
            mueblesEnCarrito +=  
            `<tr>
                    <td><img src="./img/${mueble.imagen}" class="imgVistaCarritoCompra" alt="${mueble.nombre}"></td>
                    <td>${mueble.nombre}</td>
                    <td>$${mueble.precio}</td>
                </tr>
                <tr>
                    <td><a href = "#" class="btn btn-outline-dark ">-</a> ${muebles.cantidad} <a href = "#" class="btn btn-outline-dark ">+</a></td>
                </tr>`;    
        });
        
        mueblesEnCarrito += ` </table>`;
    }
    

    return mueblesEnCarrito;
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
                    <a href="#" class="agregarAlCarrito rounded-pill btn btn-outline-dark" title="Agregar" onclick="agregarMuebles(${mueble.id})" >Agregar al carrito</a>
                </div>
            </div>
        </div>`;
        
    });

    document.getElementById("muebles").innerHTML = catalogo; 
}

guardarMueblesLs(muebles);
renderMuebles(); 
botonCarrito();
