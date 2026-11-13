
const newColors = Swal.mixin({
    customClass: {
        confirmButton: "bg-danger btn-lg px-4 py-3"
    },
    buttonsStyling: false 
});

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid theme-success",
        cancelButton: "btn-solid theme-danger"
    },
    buttonsStyling: false
});

var dialogProducto = document.getElementById("addProducto");
var btnSave = document.getElementById("btnSave");
var btnAbrirModal = document.getElementById("btnAbrirModal");
var dialogEditar = document.getElementById("editProducto"); 
var btnEditar = document.getElementById("btnEditar");
var productos = [];


const cargarProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    var tbody = document.getElementById("tablaProductos"); 
    
    if (!tbody) {
        console.warn("No se encontró el tbody con id='tablaProductos' en el HTML.");
        return;
    }

    var tabla = "";
    let posicion = 0;

    productos.forEach((producto) => {
        var precioNum = parseFloat(producto.precio) || 0;
        var cantidadNum = parseFloat(producto.cantidad) || 0;
        
        tabla += `<tr class="text-center">
                    <td><b>${producto.nombre}</b></td>
                    <td><b>$ ${precioNum.toFixed(2)}</b></td>
                    <td><b>${cantidadNum.toFixed(2)}</b></td>
                    <td>
                        <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash"></i></button>
                        <button class="btn-solid theme-primary" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
                    </td>
                </tr>`;
        posicion++;
    });
    
    tbody.innerHTML = tabla;
};


if (btnAbrirModal && dialogProducto) {
    btnAbrirModal.onclick = () => {
        dialogProducto.showModal();
    };
}

if (btnSave) {
    btnSave.onclick = (e) => {
        e.preventDefault();

        var txtNombre = document.getElementById("nombre");
        var txtPrecio = document.getElementById("precio");
        var txtCantidad = document.getElementById("Cantidad");

        if (!txtNombre || !txtPrecio || !txtCantidad) {
            alert("ERROR: Faltan campos en el HTML");
            return;
        }

        if (txtNombre.value.trim() == "" || txtPrecio.value.trim() == "") {
            alert("ERROR: CAMPOS VACIOS");
            return;
        }

        const producto = {
            nombre: txtNombre.value.trim(),
            precio: txtPrecio.value.trim(),
            cantidad: txtCantidad.value.trim()
        };

        productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(producto);

        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos();

        txtNombre.value = "";
        txtPrecio.value = "";
        txtCantidad.value = "";

        if (dialogProducto) dialogProducto.close();
    };
}


if (dialogProducto) {
    const botonesCerrar = dialogProducto.querySelectorAll('[data-bs-dismiss="dialog"]');
    botonesCerrar.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("Cantidad").value = "";
            dialogProducto.close();
        };
    });
}


const eliminarProducto = (posicion) => {
    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "¿Estás seguro de que deseas eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
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
};


const editarProducto = (posicion) => {
    const producto = productos[posicion];
    if (!producto) return;

    document.getElementById("nombreEditar").value = producto.nombre || "";
    document.getElementById("precioEditar").value = producto.precio || "";
    document.getElementById("cantidadEditar").value = producto.cantidad || "";
    document.getElementById("posicion").value = posicion;

    if (dialogEditar) dialogEditar.showModal();
};


if (btnEditar) {
    btnEditar.onclick = (e) => {
        e.preventDefault();

        var txtNombre = document.getElementById("nombreEditar");
        var txtPrecio = document.getElementById("precioEditar");
        var txtCantidad = document.getElementById("cantidadEditar");
        var posicionInput = document.getElementById("posicion");

        if (!txtNombre || !txtPrecio || !posicionInput) {
            alert("ERROR: Faltan campos de edición en el HTML");
            return;
        }

        var posicion = posicionInput.value;

        if (txtNombre.value.trim() == "" || txtPrecio.value.trim() == "") {
            alert("ERROR: CAMPOS VACIOS");
            return;
        }

        productos = JSON.parse(localStorage.getItem("productos")) || [];

        
        productos[posicion] = {
            nombre: txtNombre.value.trim(),
            precio: txtPrecio.value.trim(),
            cantidad: txtCantidad ? txtCantidad.value.trim() : "0"
        };

        localStorage.setItem("productos", JSON.stringify(productos));
        cargarProductos();

        txtNombre.value = "";
        txtPrecio.value = "";
        if (txtCantidad) txtCantidad.value = "";
        
        if (dialogEditar) dialogEditar.close();
    };
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});