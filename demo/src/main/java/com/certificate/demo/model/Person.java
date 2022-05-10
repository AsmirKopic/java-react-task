package com.certificate.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "userId")
    private String userId;

    @Column(name = "department")
    private String department;

    @Column(name = "plant")
    private String plant;

//    @ManyToMany(mappedBy = "persons", fetch=FetchType.EAGER)
//    List<Cert> certificates = new ArrayList<>();
}
