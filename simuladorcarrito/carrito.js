class Producto {
  constructor(codigo, sabor, precio) {
    this.codigo = codigo;
    this.sabor = sabor;
    this.precio = precio;
    this.cantidad = 0;
  }

  agregarCantidad(cantidadDeseada) {
    this.cantidad = this.cantidad + cantidadDeseada;
  }

  descripcion() {
    return (
      "Código: " +
      this.codigo +
      " Sabor: " +
      this.sabor +
      " Precio: $" +
      this.precio +
      "\n"
    );
  }

  descripcionCarrito() {
    return (
      "Código: " +
      this.codigo +
      " Sabor: " +
      this.sabor +
      " Precio: $" +
      this.precio +
      " Cantidad: " +
      this.cantidad +
      "\n"
    );
  }
}

class Carrito {
  constructor() {
    this.listaCarrito = [];
  }

  agregar(productoNuevo) {
    let existe = this.listaCarrito.some(
      (producto) => producto.codigo == productoNuevo.codigo
    );
    if (!existe) {
      this.listaCarrito.push(productoNuevo);
    }
  }

  mostrar() {
    let descripcionListaCompra = "Su compra: \n\n";
    this.listaCarrito.forEach((producto) => {
      descripcionListaCompra =
        descripcionListaCompra + producto.descripcionCarrito();
    });
    return descripcionListaCompra;
  }

  calcularTotal() {
    return this.listaCarrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  }
}

class ProductoController {
  constructor() {
    this.listaProductos = [];
  }

  agregar(producto) {
    this.listaProductos.push(producto);
  }

  mostrar() {
    let descripcionListaProductos =
      "Recuerde el Código del vaporizador que desea comprar\n\n";
    this.listaProductos.forEach((producto) => {
      descripcionListaProductos =
        descripcionListaProductos + producto.descripcion();
    });
    return descripcionListaProductos;
  }

  buscarCodigo(codigo) {
    return this.listaProductos.find((producto) => producto.codigo == codigo);
  }
}

const vaporizador1 = new Producto(1, "Blueberry Ice,", 1490);
const vaporizador2 = new Producto(2, "Tropical Rainbow Blast,", 1590);
const vaporizador3 = new Producto(3, "Black Ice,", 1400);
const vaporizador4 = new Producto(4, "Ice Mint,", 1600);

const carrito = new Carrito();
const controladorP = new ProductoController();

controladorP.agregar(vaporizador1);
controladorP.agregar(vaporizador2);
controladorP.agregar(vaporizador3);
controladorP.agregar(vaporizador4);

let rta;

do {
  alert(controladorP.mostrar());

  let codigo = Number(
    prompt("Ingrese el Código del vaporizador que desea comprar")
  );
  const producto = controladorP.buscarCodigo(codigo);

  if (producto) {
    let cantidadDeseada = Number(
      prompt("Ingrese que cantidad de este sabor desea")
    );

    if (!isNaN(cantidadDeseada) && cantidadDeseada > 0) {
      producto.agregarCantidad(cantidadDeseada);
      carrito.agregar(producto);
      alert(carrito.mostrar());
    } else {
      alert("Cantidad inválida. Por favor, ingrese una cantidad válida.");
    }
  } else {
    alert(
      "El Código ingresado no corresponde a ningún vaporizador de la lista."
    );
  }

  rta = prompt(
    "¿Desea finalizar la compra? (escriba 'SI' para finalizar)"
  ).toUpperCase();
} while (rta !== "SI");

alert("El total es de su compra es de: $" + carrito.calcularTotal());
