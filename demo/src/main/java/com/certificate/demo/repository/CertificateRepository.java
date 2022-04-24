package com.certificate.demo.repository;

import com.certificate.demo.model.Cert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends JpaRepository<Cert, Integer> {
}
