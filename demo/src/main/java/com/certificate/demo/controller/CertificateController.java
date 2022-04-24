package com.certificate.demo.controller;

import com.certificate.demo.exception.ResourceNotFoundException;
import com.certificate.demo.model.Cert;
import com.certificate.demo.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CertificateController {

    @Autowired
    CertificateRepository certificateRepository;

    @GetMapping("/certificates")
    public List<Cert> getAllCertificates(){
        return certificateRepository.findAll();
    }

    @GetMapping("/certificates/{id}")
    public ResponseEntity<Cert> getCertById(@PathVariable(value = "id") Integer certId) throws ResourceNotFoundException {

        Cert cert = certificateRepository.findById(certId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found for this id :: " + certId));
        return ResponseEntity.ok().body(cert);
    }

    @PostMapping("/certificates")
    public Cert saveCertificate(@RequestBody Cert certificate){
        return this.certificateRepository.save(certificate);
    }

}
