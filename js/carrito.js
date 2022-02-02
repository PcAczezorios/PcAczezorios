
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var eliminarElementosDelCarrito = document.getElementsByClassName('borrar-carrito')
    console.log(eliminarElementosDelCarrito)
    for (var i = 0; i < eliminarElementosDelCarrito.length; i++) {
        var boton = eliminarElementosDelCarrito[i]
        boton.addEventListener('click', eliminarDelCarrito)
    }

    var cantidadInputs = document.getElementsByClassName('cantidad-producto')
    for (var i = 0; i < cantidadInputs.length; i++) {
        var input = cantidadInputs[i]
        input.addEventListener('change', cambioCantidad)
    }

    var añadidosCarrito = document.getElementsByClassName('añadir-carrito')
    for (var i = 0; i < añadidosCarrito.length; i++) {
        var boton = añadidosCarrito[i]
        boton.addEventListener('click', añadirAlCarritoClickado)
    }
    
    document.getElementsByClassName('comprar')[0].addEventListener('click', comprarTodoClickado)
}

function comprarTodoClickado(){
    alert('Gracias por su compra!')
    var itemsCarrito = document.getElementsByClassName('objetos-carrito')[0]
    while (itemsCarrito.hasChildNodes()) {
        itemsCarrito.removeChild(itemsCarrito.firstChild)
    }
    actualizarPrecioTotalCarrito()
}

function eliminarDelCarrito(event){
    var botonClickado = event.target
    botonClickado.parentElement.remove()
    actualizarPrecioTotalCarrito()
}

function añadirAlCarritoClickado(event){
    var botonClickado = event.target
    var articuloTienda = botonClickado.parentElement.parentElement
    var titulo = articuloTienda.getElementsByClassName('nombre-producto')[0].innerText
    console.log(titulo)
	var precio = parseFloat(articuloTienda.getElementsByClassName('precio-producto')[0].innerText.replace(',', '.').replace(' €', '')).toFixed(2)
    var imagenSrc = articuloTienda.getElementsByClassName('imagen-articulo')[0].src
    añadirItemAlCarrito(titulo, precio.toString().replace('.', ','), imagenSrc)
    actualizarPrecioTotalCarrito()
}

function añadirItemAlCarrito(titulo, precio, imagenSrc){
    var carritoItem = document.createElement('div')
    carritoItem.classList.add('articulo-en-carrito')
    var objetosCarrito = document.getElementsByClassName('objetos-carrito')[0]
    var objetosCarritoNombres = objetosCarrito.getElementsByClassName('nombre-producto')
    for (var i = 0; i < objetosCarritoNombres.length; i++){
        console.log(objetosCarritoNombres[i])
        if (objetosCarritoNombres[i].innerText == titulo) {
            alert('Este articulo ya esta añadido al carrito')
            return
        }
    }
    var carritoItemContenido = 
		`<img src="${imagenSrc}" width="128" height="128" class="imagen-articulo">
		<span class="nombre-producto">${titulo}</span>
		<span class="precio-producto">${precio} €</span>
		<input type="number" min="1" value="1" class="cantidad-producto">
		<button class="borrar-carrito boton-terciario">Borrar</button>`
    carritoItem.innerHTML = carritoItemContenido
    objetosCarrito.append(carritoItem)
    carritoItem.getElementsByClassName('borrar-carrito')[0].addEventListener('click', eliminarDelCarrito)
    carritoItem.getElementsByClassName('cantidad-producto')[0].addEventListener('change', cambioCantidad)
}

function cambioCantidad(event){
    var input = event.target
    if (isNaN(input.value)) {
        input.value = 1
    }
    actualizarPrecioTotalCarrito()
}

function actualizarPrecioTotalCarrito(){
    var contenedorObjetosCarrito = document.getElementsByClassName('objetos-carrito')[0]
    var productos = contenedorObjetosCarrito.getElementsByClassName('articulo-en-carrito')
    var total = 0;
    for (var i = 0; i < productos.length; i++){
        var carritoItem = productos[i]
        var precioElemento = carritoItem.getElementsByClassName('precio-producto')[0]
        var cantidadProductos = carritoItem.getElementsByClassName('cantidad-producto')[0]
        var cantidad = cantidadProductos.value
        var precio = parseFloat(precioElemento.textContent.replace(',', '.').replace(' €', '')).toFixed(2)
        total = total + (precio * cantidad)
    }
    total = (Math.round(total * 100) / 100).toFixed(2)
    document.getElementsByClassName('precio-total')[0].innerText = total.toString().replace('.', ',') + " €"
}