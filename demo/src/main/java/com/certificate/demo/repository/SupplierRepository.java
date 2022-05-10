package com.certificate.demo.repository;

import com.certificate.demo.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    List<Supplier> findByNameContainingAllIgnoreCase(@Param("name") String name);

    List<Supplier> findByIndex(@Param("index") Integer index);

    List<Supplier> findByCityContainingAllIgnoreCase(@Param("city") String city);
}
