package com.certificate.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Column(name = "email")
    private String email;

    @Column(name = "plant")
    private String plant;
}
