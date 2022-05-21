package com.certificate.demo.controller;

import com.certificate.demo.exception.ResourceNotFoundException;
import com.certificate.demo.model.Cert;
import com.certificate.demo.model.Person;
import com.certificate.demo.model.Supplier;
import com.certificate.demo.repository.PersonRepository;
import com.certificate.demo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PersonController {

    PersonRepository personRepository;
    PersonService personService;

    @Autowired
    public PersonController(PersonRepository personRepository, PersonService personService) {
        this.personRepository = personRepository;
        this.personService = personService;
    }

    @GetMapping("/persons")
    public List<Person> getAllPersons(){
        return personRepository.findAll();
    }

    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "id") Integer personId) throws ResourceNotFoundException {

        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));
        return ResponseEntity.ok().body(person);
    }

    @PostMapping("/persons")
    public Person savePerson(@RequestBody Person person){
        return this.personRepository.save(person);
    }

    @GetMapping("/searchPersons")
    public List<Person> getPersons(@RequestParam(required = false) String name,
                                   @RequestParam(required = false) String firstName,
                                   @RequestParam(required = false) String userId,
                                   @RequestParam(required = false) String department,
                                   @RequestParam(required = false) String plant
                                    ){
        return personService.getPersons(name, firstName, userId, department, plant);
    }

}
