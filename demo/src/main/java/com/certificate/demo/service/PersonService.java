package com.certificate.demo.service;

import com.certificate.demo.model.Person;
import com.certificate.demo.repository.PersonRepository;

import javax.persistence.Column;
import java.util.List;

public interface PersonService {

    List<Person> getPersons(String name, String firstName, String userId, String department, String plant);
}

