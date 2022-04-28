import React, { useEffect, useState, ChangeEvent } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from '../types/Supplier';
import CertificateData from '../types/Certificate';
import CertificateService from "../services/CertificateService";

const AddCertificate: React.FC =() => {

    const supplier;

    const initialCertificate = {
        id: null,
        supplier: null,
        type: "",
        validFrom: "",
        validTo: ""
    };

    // testing
    const [suppliers, setSuppliers] = useState<Array<ISupplierData>>([]);
    useEffect(() => {
        retrieveSuppliers();
    }, []);

    const retrieveSuppliers = () => {
        SupplierService.getAll()
        .then((response: any) => {
            setSuppliers(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    // end testing

    const [certificate, setCertificate] = useState<CertificateData>(initialCertificate);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const selectSupplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.supplier = event.target;
        const { name, value } = event.target;
        setSupplier({ ...this.supplier, [name]: value});
      };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCertificate({ ...certificate, [name]: value});
    };


    const saveCertificate = () => {
      var data = {
        supplier: certificate.supplier,
        type: certificate.type,
        validFrom: certificate.validFrom,
        validTo: certificate.validTo
      };

      CertificateService.create(data)
        .then((response: any) => {
          setCertificate({
            id: response.data.id,
            supplier: response.data.supplier,
            type: response.data.type,
            validFrom: response.data.validFrom,
            validTo: response.data.validTo
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    const newCertificate = () => {
      setCertificate(initialCertificate);
      setSubmitted(false);
    };

    return (

        <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newCertificate}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="supplier"></label>

              <select onChange={selectSupplier}>
                <option selected disabled>
                Choose supplier
                </option>
                    { suppliers.map(tempSupplier => (
                                <option key={tempSupplier.id} value={tempSupplier.id}>
                                    {tempSupplier.name}
                                </option>
                            )
                        )
                    } 
            </select>
              

            </div>

        
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select>
                <option selected disabled>
                Choose one
                </option >
                <option value={certificate.type}>Test cert 1</option>
                <option value="Test Cert 2">Test cert 2</option>
            </select>
            </div>

            <div className="form-group">
              <label htmlFor="validFrom">Valid from</label>
              <input
                type="date"
                className="form-control"
                id="validFrom"
                required
                value={certificate.validFrom}
                onChange={handleInputChange}
                name="validFrom"
              />
            </div>
            <div className="form-group">
              <label htmlFor="validFrom">Valid to</label>
              <input
                type="date"
                className="form-control"
                id="validTo"
                required
                value={certificate.validTo}
                onChange={handleInputChange}
                name="validTo"
              />
            </div>

            <button onClick={saveCertificate} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
};

  export default AddCertificate;