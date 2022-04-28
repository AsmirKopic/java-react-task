import React, { useEffect, useState } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from "../types/Supplier";

const SupplierList: React.FC = () => {

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

    return(
        <div className="col-md-6">
            <h4>List suppliers</h4>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Action </th>
                            <th> Supplier name </th>
                            <th> Supplier index </th>
                            <th> Supplier city </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            suppliers.map(
                                supplier => (
                                    <tr key={supplier.id}>
                                    <td> {supplier.id} </td>    
                                    <td> { supplier.name }</td>
                                    <td> { supplier.index }</td>
                                    <td> { supplier.city }</td>
                                </tr>
                                )  
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default SupplierList;