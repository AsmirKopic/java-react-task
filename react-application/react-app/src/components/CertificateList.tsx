import React, { useEffect, useState } from "react";
import CertificateService from "../services/CertificateService";
import CertificateData from "../types/Certificate";
import ISupplierData from "../types/Supplier";

const CertificateList: React.FC = () => {

    const [certificates, setCertificates] = useState<Array<CertificateData>>([]);
    useEffect(() => {
        retrieveCertificates();
    }, []);

    const retrieveCertificates = () => {
        CertificateService.getAll()
        .then((response: any) => {
            setCertificates(response.data);
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
                            <th> Type </th>
                            <th> Valid from </th>
                            <th> Valid to </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            certificates.map(
                                tempCert => (
                                    <tr key={tempCert.id}>
                                        <td> { tempCert.supplier} </td>
                                        <td> { tempCert.type } </td>
                                        <td> { tempCert.validFrom }</td>
                                        <td> { tempCert.validTo }</td>
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

export default CertificateList;