package com.certificate.demo.service;

import com.certificate.demo.model.Supplier;

import java.util.List;

public interface SupplierService {

    List<Supplier> getSuppliers(String name, Integer index, String city);
}
