package com.certificate.demo.model;

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

    @Lob
    private byte[] data;

}
