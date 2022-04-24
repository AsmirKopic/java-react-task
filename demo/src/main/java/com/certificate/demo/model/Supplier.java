package com.certificate.demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "supplier_name")
    private String name;

    @Column(name = "index")
    private Integer index;

    @Column(name = "city")
    private String city;

    @OneToMany(mappedBy = "supplier")
    private Set<Cert> certificates;

    public Supplier() {
    }

    public Supplier(String name, Integer index, String city) {
        this.name = name;
        this.index = index;
        this.city = city;
    }
}
