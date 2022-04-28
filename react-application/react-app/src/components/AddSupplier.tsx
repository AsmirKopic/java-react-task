import React, { useState, ChangeEvent } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from '../types/Supplier';

const AddSupplier: React.FC =() => {

    const initialSupplier = {
        id: null,
        name: "",
        index: 0,
        city: ""
    };

    const [supplier, setSupplier] = useState<ISupplierData>(initialSupplier);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setSupplier({ ...supplier, [name]: value });
    };

    const saveSupplier = () => {
      var data = {
        name: supplier.name,
        index: supplier.index,
        city: supplier.city
      };

      SupplierService.create(data)
        .then((response: any) => {
          setSupplier({
            id: response.data.id,
            name: response.data.name,
            index: response.data.index,
            city: response.data.city
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    const newSupplier = () => {
      setSupplier(initialSupplier);
      setSubmitted(false);
    };

    return (

        <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newSupplier}>
              Add
            </button>
          </div>
        ) : (
          <div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={supplier.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="index">Index</label>
              <input
                type="number"
                className="form-control"
                id="index"
                required
                value={supplier.index}
                onChange={handleInputChange}
                name="index"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                required
                value={supplier.city}
                onChange={handleInputChange}
                name="city"
              />
            </div>

            <button onClick={saveSupplier} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
};

  export default AddSupplier;