package com.certificate.demo.controller;

import com.certificate.demo.exception.ResourceNotFoundException;
import com.certificate.demo.model.Cert;
import com.certificate.demo.repository.CertificateRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                .orElseThrow(() -> new ResourceNotFoundException("Cert not found for this id :: " + certId));
        return ResponseEntity.ok().body(cert);
    }

    @PostMapping("/certificates")
    public Cert saveCertificate(@RequestBody Cert certificate){
        return this.certificateRepository.save(certificate);
    }

    @SneakyThrows
    @PutMapping("/certificates/{id}")
    public ResponseEntity<Cert> updateCertificate(@PathVariable Integer id, @RequestBody Cert certDetails) {
        Cert certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not exist with id :" + id));

        certificate.setSupplier(certDetails.getSupplier());
        certificate.setType(certDetails.getType());
        certificate.setValidFrom(certDetails.getValidFrom());
        certificate.setValidTo(certDetails.getValidTo());
        //certificate.setData(certDetails.getData());

        Cert updatedCertificate = certificateRepository.save(certificate);
        return ResponseEntity.ok(updatedCertificate);
    }

    @SneakyThrows
    @DeleteMapping("/certificates/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCertificate(@PathVariable Integer id) {
        Cert certificate = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not exist with id :" + id));

        certificateRepository.delete(certificate);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
