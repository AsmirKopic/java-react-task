import { t } from "i18next";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import CertificateService from "../services/CertificateService";
import CertificateData from "../types/Certificate";
import ISupplierData from "../types/Supplier";

const CertificateList: React.FC = () => {

    const [certificates, setCertificates] = useState<Array<CertificateData>>([]);
    useEffect(() => {
        retrieveCertificates();
    }, []);

    const navigate = useNavigate();
    const addNewCertificate = () => navigate('/newCertificate');
    const editCertificate = (id: number) => navigate(`/certificates/${id}`);

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

    // delete certificate
    const deleteCertificate = (id: number) => {
        CertificateService.remove(id)
          .then((response: any) => {
            console.log(response.data);
            retrieveCertificates();
          })
          .catch((e: Error) => {
            console.log(e);
          });
    };

    // update certificate 
    function updateCertificateClicked(id: number){
        console.log('update ' + id)
        editCertificate(id);
    }

    const { t } = useTranslation();

    return(
        
        <><h2>{t('list_certificates')}</h2>
        <div className="col-md-10">

            <button type="button" className="btn btn-success" onClick={() => addNewCertificate()}>{t('new_certificate')}</button>
            
            <div>
                <br></br>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">{t('supplier')}</th>
                        <th scope="col">{t('certificate_type')}</th>
                        <th scope="col">{t('valid_from')}</th>
                        <th scope="col">{t('valid_to')}</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.map(
                        tempCert => (

                            <tr key={tempCert.id}>
                                <td className="text-center align-middle">
                                    <div className="dropdown">
                                        <a href="/" type="button" className="btn" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i className="fa fa-gear"></i>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a className="dropdown-item" onClick={() => updateCertificateClicked(tempCert.id)}>{t('edit')}</a>
                                            <a className="dropdown-item" onClick={() => deleteCertificate(tempCert.id)}>{t('delete')}</a>
                                        </div>
                                    </div>
                                </td>

                                <td> {tempCert.supplier} </td>
                                <td> {tempCert.type} </td>
                                <td> {tempCert.validFrom}</td>
                                <td> {tempCert.validTo}</td>
                            </tr>
                        )
                    )}

                </tbody>
            </table>
        </div></>
    )
};

export default CertificateList;
