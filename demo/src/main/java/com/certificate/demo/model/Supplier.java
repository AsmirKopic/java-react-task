package com.certificate.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "supplier_name")
    private String name;

    @Column(name = "index")
    private Integer index;

    @Column(name = "city")
    private String city;

    @OneToMany(mappedBy = "supplier",
            fetch = FetchType.LAZY,
            cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                      CascadeType.DETACH, CascadeType.REFRESH})
    @JsonIgnore
    private Set<Cert> certificates;

    public Supplier(String name, Integer index, String city) {
        this.name = name;
        this.index = index;
        this.city = city;
    }
}
