package com.certificate.demo.controller;

import com.certificate.demo.exception.ResourceNotFoundException;
import com.certificate.demo.model.Supplier;
import com.certificate.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SupplierController {

    @Autowired
    SupplierRepository supplierRepository;

    @GetMapping("/suppliers")
    public List<Supplier> getAllSuppliers(){
        return this.supplierRepository.findAll();
    }

    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable(value = "id") Long supplierId) throws ResourceNotFoundException {

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found for this id :: " + supplierId));
        return ResponseEntity.ok().body(supplier);
    }

    @PostMapping("/suppliers")
    public Supplier saveSupplier(@RequestBody Supplier supplier){
        return this.supplierRepository.save(supplier);
    }


}
