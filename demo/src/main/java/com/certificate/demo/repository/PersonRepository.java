package com.certificate.demo.repository;

import com.certificate.demo.model.Cert;
import com.certificate.demo.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface PersonRepository extends JpaRepository<Person, Integer> {

}
