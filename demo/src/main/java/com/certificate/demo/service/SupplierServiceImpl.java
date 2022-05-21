package com.certificate.demo.service;

import com.certificate.demo.model.Supplier;
import com.certificate.demo.repository.SupplierRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import javax.persistence.criteria.Predicate;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    // Method for dynamic search
    @Override
    public List<Supplier> getSuppliers(String name, Integer index, String city) {

        List<Supplier> suppliers = supplierRepository.findAll((Specification<Supplier>) (root, cq, cb) -> {
        Predicate p = cb.conjunction();

        // filter input fields
        if (!StringUtils.isEmpty(name)) {
            p = cb.and(p, cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase().trim() + "%"));
        }
        if (index != null) {
            p = cb.and(p, cb.like(root.get("index").as(String.class), "%" + index + "%"));
        }
        if (!StringUtils.isEmpty(city)) {
            p = cb.and(p, cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase().trim() + "%"));
        }
        return p;
    });
        // return list of suppliers based on filter inputs
        return suppliers;
    }
}
