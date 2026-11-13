var dialogProducto = document.getElementById("addProducto");
var btnSave = document.getElementById("btnSave");
var btnAbrirModal = document.getElementById("btnAbrirModal");
var productos = [];
var dialogEditar = document.getElementById("editProducto"); 
var btnEditar = document.getElementById("btnEditar");

if (btnAbrirModal) {
    btnAbrirModal.onclick = () => {
        dialogProducto.showModal();
    };
}

btnSave.onclick = (e) => {
    e.preventDefault();

    var txtNombre = document.getElementById("nombre");
    var txtPrecio = document.getElementById("precio");

    if (txtNombre.value.trim() == "" || txtPrecio.value.trim() == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    const producto = {
        nombre: txtNombre.value.trim(),
        precio: txtPrecio.value.trim()
    };

    productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();

    txtNombre.value = "";
    txtPrecio.value = "";

    dialogProducto.close();
};

const cargarProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    var tbody = document.getElementById("productos");
    var tabla = "";
    let posicion=0;

    productos.map((producto) => {
       
        var precioNum = parseFloat(producto.precio) || 0;
        tabla += `<tr class="text-center">
                    <td><b>${producto.nombre}</b></td>
                    <td><b>$ ${precioNum.toFixed(2)}</b></td>
                    <td>
                        <button class=" btn-solid theme-danger" onclick="eliminarProducto(${posicion})"> <i class="bi bi-trash"></i></button>
                        <button class=" btn-solid theme-primary" onclick="editarProducto(${posicion})"> <i class="bi bi-pencil"></i></button>

                    </td>
                </tr>`;
                posicion++;
    });
    tbody.innerHTML = tabla;
};

cargarProductos();



const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn-solid theme-success",
    cancelButton: "btn-solid theme-danger"
  },
  buttonsStyling: false
});

const botonesCerrar = dialogProducto.querySelectorAll('[data-bs-dismiss="dialog"]');
botonesCerrar.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        dialogProducto.close();
    };
});


const eliminarProducto = (posicion) => {
swalWithBootstrapButtons.fire({
  title: "ELIMINARF REGISTRO",
  text: "Estás seguro de que deseas eliminar este registro?",
  icon: "error",
  showCancelButton: true,
  confirmButtonText: "si, eliminar!",
  cancelButtonText: "No, eliminar!",
  reverseButtons: true
}).then((result) => {
 if (result.isConfirmed) {

    productos.splice(posicion, 1);
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid theme-success"
    },
    buttonsStyling: false
    });
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
   newColors.fire({
    title: '<i class="bi bi-check-square-fill me-2"></i> ¡Éxito!', 
    text: "El registro ha sido eliminado", 
    icon: "success",
    confirmButtonText: "Ok"
});
    
 }
});

}

const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombreEditar").value = producto.nombre;
    document.getElementById("precioEditar").value = producto.precio;
    document.getElementById("posicion").value = posicion;

    dialogEditar.showModal();
}

var dialogEditar = document.getElementById("editProducto");
var btnEditar = document.getElementById("btnEditar");



btnEditar.onclick = (e) => {
    e.preventDefault();

    var txtNombre = document.getElementById("nombreEditar");
    var txtPrecio = document.getElementById("precioEditar");
    var posicion = document.getElementById("posicion").value;

    if (txtNombre.value.trim() == "" || txtPrecio.value.trim() == "") {
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos[posicion] = {
        nombre: txtNombre.value.trim(),
        precio: txtPrecio.value.trim()
    };

    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();

    txtNombre.value = "";
    txtPrecio.value = "";
    dialogEditar.close();
};
const newColors = Swal.mixin({
    customClass: {
        confirmButton: "bg-danger btn-lg px-4 py-3"

    },
    buttonsStyling: false 
});