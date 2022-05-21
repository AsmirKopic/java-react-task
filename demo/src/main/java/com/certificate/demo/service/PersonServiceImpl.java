package com.certificate.demo.service;

import com.certificate.demo.model.Person;
import com.certificate.demo.model.Supplier;
import com.certificate.demo.repository.PersonRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Predicate;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    // Method for Person dynamic search
    @Override
    public List<Person> getPersons(String name, String firstName, String userId, String department, String plant) {

        List<Person> persons = personRepository.findAll((Specification<Person>) (root, cq, cb) -> {
            Predicate p = cb.conjunction();

            // filter input fields
            if (!StringUtils.isEmpty(name)) {
                p = cb.and(p, cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase().trim() + "%"));
            }
            if (!StringUtils.isEmpty(firstName)) {
                p = cb.and(p, cb.like(cb.lower(root.get("firstName")), "%" + firstName.toLowerCase().trim() + "%"));
            }
            if (!StringUtils.isEmpty(userId)) {
                p = cb.and(p, cb.like(cb.lower(root.get("userId")), "%" + userId.toLowerCase().trim() + "%"));
            }
            if (!StringUtils.isEmpty(department)) {
                p = cb.and(p, cb.like(cb.lower(root.get("department")), "%" + department.toLowerCase().trim() + "%"));
            }
            if (!StringUtils.isEmpty(plant)) {
                p = cb.and(p, cb.like(cb.lower(root.get("plant")), "%" + plant.toLowerCase().trim() + "%"));
            }
            return p;
        });
        // return list of persons based on input filter search
        return persons;
    }
}
