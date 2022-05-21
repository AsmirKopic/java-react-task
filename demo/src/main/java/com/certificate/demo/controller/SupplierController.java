package com.certificate.demo.controller;

import com.certificate.demo.exception.ResourceNotFoundException;
import com.certificate.demo.model.Supplier;
import com.certificate.demo.repository.SupplierRepository;
import com.certificate.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class SupplierController {

    SupplierRepository supplierRepository;

    SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierRepository supplierRepository, SupplierService supplierService) {
        this.supplierRepository = supplierRepository;
        this.supplierService = supplierService;
    }

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
    public List<Supplier> findByNameContainingAllIgnoreCase(@RequestParam("name") String name) {
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

    @GetMapping("/searchSuppliers")
    public List<Supplier> getSuppliers(@RequestParam(required = false) String name,
                                       @RequestParam(required = false) Integer index,
                                       @RequestParam(required = false) String city
                                        ){

        return supplierService.getSuppliers(name, index, city);
    }

}
