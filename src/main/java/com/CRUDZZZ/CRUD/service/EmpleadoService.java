package com.CRUDZZZ.CRUD.service;

import com.CRUDZZZ.CRUD.model.Empleado;
import com.CRUDZZZ.CRUD.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    public List<Empleado> obtenerTodosLosEmpleados() {
        return empleadoRepository.findAll();
    }

    public Empleado crearEmpleado(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    public Empleado actualizarEmpleado(Long id, Empleado empleado) {
        Empleado empleadoExistente = empleadoRepository.findById(id).orElseThrow();
        empleadoExistente.setNombre(empleado.getNombre());
        empleadoExistente.setApellido(empleado.getApellido());
        empleadoExistente.setEdad(empleado.getEdad());
        empleadoExistente.setAtc(empleado.getAtc());
        return empleadoRepository.save(empleadoExistente);
    }

    public void eliminarEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }

    public List<Empleado> filtrarPorEdad(int edad) {
        return empleadoRepository.findByEdad(edad);
    }

    public List<Empleado> filtrarPorAtc(String atc) {
        return empleadoRepository.findByAtc(atc);
    }

    public Map<String, List<Empleado>> obtenerMapaEmpleadosPorAtc() {
        return empleadoRepository.findAll()
            .stream()
            .collect(Collectors.groupingBy(Empleado::getAtc));
    }

    public Empleado obtenerEmpleadoPorId(Long id) {
        return empleadoRepository.findById(id).orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
    }
    
}
