import React, { useEffect, useState, ChangeEvent } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from '../types/Supplier';
import CertificateData from '../types/Certificate';
import CertificateService from "../services/CertificateService";

export default function AddCertificate() {

  const [state, setState] = React.useState({
    id: null,
    supplier: "",
    type: "",
    validFrom: "",
    validTo: ""
  });

  const [submitted, setSubmitted] = useState<boolean>(false);


  // retrieve suppliers
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

  // save certificate

  const saveCertificate = () => {
    var data = {
      supplier: state.supplier,
      type: state.type,
      validFrom: state.validFrom,
      validTo: state.validTo
    };

    CertificateService.create(data)
      .then((response: any) => {
        setState({
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

  // handle input change

  function handleChange(evt: any) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  // HTML return 

  return (
    <div className="submit-form">

        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={saveCertificate}>
              Add
            </button>
          </div>
        ) : (
      <div>
      <form>

      <label>
          <div className="heading">Select supplier</div>
          <select name="supplier" onChange={handleChange} value={state.supplier}>
          { suppliers.map(tempSupplier => (
                                <option key={tempSupplier.id} value={tempSupplier.name}>
                                    {tempSupplier.name}
                                </option>
                            )
                        )
          } 
          </select>
        </label>

        <label>
          <div className="heading">Certificate type</div>
          <select name="type" onChange={handleChange} value={state.type}>
            <option value="CCA Certificate">CCA Certificate</option>
            <option value="ISO 9001">ISO 9001</option>
            <option value="1AA Cert">1AA Cert</option>
          </select>
        </label>

        <label>
          <div className="heading">Valid from</div>
          <input
            type="date"
            name="validFrom"
            value={state.validFrom}
            onChange={handleChange}
          />
        </label>

        <label>
          <div className="heading">Valid to</div>
          <input
            type="date"
            name="validTo"
            value={state.validTo}
            onChange={handleChange}
          />
        </label>
        
      </form>
      <pre>{JSON.stringify(state, null, 2)}</pre>

      <button onClick={saveCertificate} className="btn btn-success">
              Submit
      </button>
      </div>
        )}


    </div>
  );
}


