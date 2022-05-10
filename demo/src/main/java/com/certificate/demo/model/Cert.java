package com.certificate.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "certificates")
public class Cert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type")
    private String type;

    @Column(name = "supplier")
    private String supplier;

    @Column(name = "valid_from")
    private String validFrom;

    @Column(name = "valid_to")
    private String validTo;

    @OneToMany
    List<Person> persons = new ArrayList<>();

    @Lob
    private byte[] data;

}
