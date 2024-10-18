package com.CRUDZZZ.CRUD.repository;

import com.CRUDZZZ.CRUD.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findByEdad(int edad);
    List<Empleado> findByAtc(String atc);
}
