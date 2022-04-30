package com.certificate.demo.repository;

import com.certificate.demo.model.Cert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface CertificateRepository extends JpaRepository<Cert, Integer> {

}
