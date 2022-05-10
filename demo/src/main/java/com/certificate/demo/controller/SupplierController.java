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
@RequestMapping("/api/v1")
public class SupplierController {

    @Autowired
    SupplierRepository supplierRepository;

    @GetMapping("/suppliers")
    public List<Supplier> getAllSuppliers(){
        return this.supplierRepository.findAll();
    }

    @GetMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable(value = "id") Integer supplierId) throws ResourceNotFoundException {

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found for this id :: " + supplierId));
        return ResponseEntity.ok().body(supplier);
    }

    @PostMapping("/suppliers")
    public Supplier saveSupplier(@RequestBody Supplier supplier){
        return this.supplierRepository.save(supplier);
    }

    @GetMapping("/search")
    public List<Supplier> findByName(@RequestParam("name") String name) {
        return this.supplierRepository.findByNameContainingAllIgnoreCase(name);
    }

    @GetMapping("/searchByIndex")
    public List<Supplier> findByIndex(@RequestParam("index") Integer index) {
        return this.supplierRepository.findByIndex(index);
    }

    @GetMapping("/searchByCity")
    public List<Supplier> findByCity(@RequestParam("city") String city) {
        return this.supplierRepository.findByCityContainingAllIgnoreCase(city);
    }

}
