package com.CRUDZZZ.CRUD.controller;

import com.CRUDZZZ.CRUD.model.Empleado;
import com.CRUDZZZ.CRUD.service.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public List<Empleado> obtenerTodosLosEmpleados() {
        return empleadoService.obtenerTodosLosEmpleados();
    }

    @PostMapping
    public Empleado crearEmpleado(@RequestBody Empleado empleado) {
        return empleadoService.crearEmpleado(empleado);
    }

    @PutMapping("/{id}")
    public Empleado actualizarEmpleado(@PathVariable Long id, @RequestBody Empleado empleado) {
        return empleadoService.actualizarEmpleado(id, empleado);
    }

    @DeleteMapping("/{id}")
    public void eliminarEmpleado(@PathVariable Long id) {
        empleadoService.eliminarEmpleado(id);
    }

    @GetMapping("/filtrar/edad/{edad}")
    public List<Empleado> filtrarPorEdad(@PathVariable int edad) {
        return empleadoService.filtrarPorEdad(edad);
    }

    @GetMapping("/filtrar/atc/{atc}")
    public List<Empleado> filtrarPorAtc(@PathVariable String atc) {
        return empleadoService.filtrarPorAtc(atc);
    }

    @GetMapping("/mapa")
    public Map<String, List<Empleado>> obtenerMapaEmpleadosPorAtc() {
        return empleadoService.obtenerMapaEmpleadosPorAtc();
    }

    @GetMapping("/{id}")
    public Empleado obtenerEmpleadoPorId(@PathVariable Long id) {
        return empleadoService.obtenerEmpleadoPorId(id);
    }

    @GetMapping("/buscar")
    public List<Empleado> buscarEmpleados(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String apellido,
            @RequestParam(required = false) Integer edad,
            @RequestParam(required = false) String atc) {
        return empleadoService.buscarEmpleados(nombre, apellido, edad, atc);
    }
    

}
