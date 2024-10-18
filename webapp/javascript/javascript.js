const apiUrl = "http://localhost:8080/api/empleados";

// Función para obtener todos los empleados y mostrarlos en la tabla HTML
async function getAllEmpleados() {
    try {
        const response = await fetch(apiUrl);
        const empleados = await response.json();
        let tableBody = document.getElementById("empleados-table-body");
        tableBody.innerHTML = ""; // Limpiar la tabla antes de rellenarla
        empleados.forEach((empleado) => {
            let row = `<tr>
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.atc}</td>
                <td>
                    <button onclick="updateEmpleado(${empleado.id})">Actualizar</button>
                    <button onclick="deleteEmpleado(${empleado.id})">Eliminar</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al obtener empleados:", error);
    }
}

// Función para crear o actualizar un empleado
document.getElementById('empleadoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener el valor del campo ID
    const id = document.getElementById('id').value;

    // Crear el objeto empleado con los datos del formulario
    const empleado = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        atc: document.getElementById('atc').value
    };

    // Determinar si es un nuevo empleado (POST) o una actualización (PUT)
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    // Enviar la solicitud al backend
    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empleado)
    });

    if (response.ok) {
        alert(id ? 'Empleado actualizado' : 'Empleado creado');
        document.getElementById('empleadoForm').reset(); // Limpiar el formulario
        document.getElementById('submitButton').textContent = 'Agregar'; // Cambiar el botón a 'Agregar'
        document.getElementById('id').value = ''; // Asegurarse de que el campo ID esté vacío
        getAllEmpleados(); // Refrescar la lista de empleados
    }
});

// Función para actualizar un empleado
async function updateEmpleado(id) {
    const nombre = prompt("Ingrese nuevo nombre:");
    const apellido = prompt("Ingrese nuevo apellido:");
    const edad = prompt("Ingrese nueva edad:");
    const atc = prompt("Ingrese nuevo ATC:");

    const empleado = { nombre, apellido, edad, atc };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(empleado),
        });
        if (response.ok) {
            alert("Empleado actualizado exitosamente");
            getAllEmpleados();
        } else {
            alert("Error al actualizar empleado");
        }
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
    }
}

// Función para eliminar un empleado
async function deleteEmpleado(id) {
    const confirmation = confirm("¿Está seguro de que desea eliminar este empleado?");
    if (confirmation) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Empleado eliminado exitosamente");
                getAllEmpleados();
            } else {
                alert("Error al eliminar empleado");
            }
        } catch (error) {
            console.error("Error al eliminar empleado:", error);
        }
    }
}

// Función para obtener empleados filtrados por edad
async function getEmpleadosByEdad() {
    const edad = document.getElementById("filtro-edad").value;
    try {
        const response = await fetch(`${apiUrl}?edad=${edad}`);
        const empleados = await response.json();
        let tableBody = document.getElementById("empleados-table-body");
        tableBody.innerHTML = ""; 
        empleados.forEach((empleado) => {
            let row = `<tr>
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.atc}</td>
                <td>
                    <button onclick="updateEmpleado(${empleado.id})">Actualizar</button>
                    <button onclick="deleteEmpleado(${empleado.id})">Eliminar</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al filtrar empleados por edad:", error);
    }
}

// Función para obtener empleados filtrados por ATC
async function getEmpleadosByATC() {
    const atc = document.getElementById("filtro-atc").value;
    try {
        const response = await fetch(`${apiUrl}?atc=${atc}`);
        const empleados = await response.json();
        let tableBody = document.getElementById("empleados-table-body");
        tableBody.innerHTML = ""; 
        empleados.forEach((empleado) => {
            let row = `<tr>
                <td>${empleado.id}</td>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.atc}</td>
                <td>
                    <button onclick="updateEmpleado(${empleado.id})">Actualizar</button>
                    <button onclick="deleteEmpleado(${empleado.id})">Eliminar</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error al filtrar empleados por ATC:", error);
    }
}

// Función para obtener el mapa de empleados por ATC
async function getMapaEmpleados() {
    try {
        const response = await fetch(`${apiUrl}/mapa`);
        const mapa = await response.json();
        let mapaDiv = document.getElementById("mapa-empleados");
        mapaDiv.innerHTML = ""; 
        for (const [atc, empleados] of Object.entries(mapa)) {
            let list = `<h4>${atc}</h4><ul>`;
            empleados.forEach((empleado) => {
                list += `<li>${empleado.nombre}</li>`;
            });
            list += "</ul>";
            mapaDiv.innerHTML += list;
        }
    } catch (error) {
        console.error("Error al obtener mapa de empleados:", error);
    }
}

// Llamar a la función para obtener todos los empleados cuando se cargue la página
document.addEventListener("DOMContentLoaded", getAllEmpleados);
