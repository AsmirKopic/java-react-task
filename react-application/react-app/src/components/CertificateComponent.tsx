import { Component, useEffect, useState } from "react"
import React from 'react'
import { render } from 'react-dom'
import { useNavigate, useParams } from "react-router-dom"
import CertificateService from "../services/CertificateService"
import CertificateData from "../types/Certificate"
import SupplierService from "../services/SupplierService"
import ISupplierData from "../types/Supplier"

const CertificateComponent: React.FC = () => {
    
    const { id } = useParams();
    const [currentCertificate = {
        supplier: "",
        type: "",
        validFrom: "",
        validTo: ""
    }, setCurrentCertificate] = useState<CertificateData>();

    const [suppliers, setSuppliers] = useState<Array<ISupplierData>>([]);
    
    const navigate = useNavigate();
    const goToListPage = () => navigate('/certificates');
    
    useEffect(() => {
        retrieveCertificate();
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

    const retrieveCertificate = () => {
        CertificateService.get(id)
        .then((response: any) => {
            setCurrentCertificate(response.data);

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
            setCurrentCertificate({
        ...currentCertificate,
        [evt.target.name]: value
        });
    }   

  // update certificate

    const updateCertificate = () => {
        var data = {
            supplier: currentCertificate.supplier,
            type: currentCertificate.type,
            validFrom: currentCertificate.validFrom,
            validTo: currentCertificate.validTo
        };

        CertificateService.update(id, data)
            .then((response: any) => {
            setCurrentCertificate({
                id: response.data.id,
                supplier: response.data.supplier,
                type: response.data.type,
                validFrom: response.data.validFrom,
                validTo: response.data.validTo
            });

            goToListPage();
            console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        };

    return (

        <main className="col bg-faded py-3">

        <div>
           <h4>New Certificate</h4>
        </div>
   
        <div className="row fst-italic">
        <div className="col-5">
           
           <small>Supplier</small>
           <div className="input-group mb-3"><input placeholder="Search for supplier" value={currentCertificate.supplier} type="text" className="form-control"/>
               <div>
                   <button className="btn btn-outline-secondary" data-toggle="modal"
                           data-target=".bd-example-modal-lg"><i className="fa fa-search"></i></button>
                   <button className="btn btn-outline-secondary" name="supplier" value="" onClick={handleChange}><i className="fa fa-close"></i></button>
               </div>
           </div>

           <div className="form-group">
               <small id="certType">Certificate type</small>
               <select name="type" id="certType" className="form-control" onChange={handleChange} defaultValue={currentCertificate.type} value={currentCertificate.type}>
                   <option selected>Select your option</option>
                   <option value="CCC Certificate">CCC Certificate</option>
                   <option value="Permission of printing">Permission of printing</option>
                   <option value="OHSAS 180001">OHSAS 180001</option>
                   <option value="Other type placeholder">Other type placeholder</option>
               </select>
           </div>

           <div className="form-group">
               <small>Valid from</small>
               <input type="date" className="form-control" id="validFrom" name="validFrom" defaultValue={currentCertificate.validFrom} value={currentCertificate.validFrom} onChange={handleChange} placeholder="Click to select date"/>
           </div>

           <div className="form-group">
               <small>Valid to</small>
               <input type="date" name="validTo" defaultValue={currentCertificate.validTo} value={currentCertificate.validTo} onChange={handleChange} className="form-control" id="validTo" placeholder="Click to select date"/>
           </div>
           <br></br>

           <button onClick={updateCertificate} className="btn btn-success">
                    Update
           </button>

       </div>
       <div className="col-5">
           <button className="btn btn-primary btn-sm" type="submit">Upload</button>
           <div className="image-preview">
           </div>
       </div>  
        </div>
   
   <br></br>
   <div className="col-10 border">

       <table className="table">
           <thead>
           <tr>
               <th>   </th>
               <th>Name</th>
               <th>Department</th>
               <th>E-mail</th>
           </tr>
           </thead>
           <tbody>
           <tr>
               <td>  </td>
               <td>Name placeholder</td>
               <td>DEPT </td>
               <td>test@email.com</td>
           </tr>
           </tbody>
       </table>

   </div>

   <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
       <div className="modal-dialog modal-lg">
           <div className="modal-content">
               <div className="modal-header bg-light">
                   <h5 className="modal-title" id="exampleModalLabel">Search for suppliers</h5>
                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                   </button>
               </div>
               <div className="modal-body">

                   <div className="card">
                       <div className="card-header bg-info text-white">
                           <i className="fa fa-angle-down"></i> Search criteria
                       </div>
                       <div className="card-body">

                           <form>
                               <div className="row font-italic">
                                   <div className="col">
                                       <small id="certType">Supplier name</small>
                                       <input type="text" className="form-control"/>
                                   </div>
                                   <div className="col">
                                       <small id="certType">Supplier index</small>
                                       <input type="text" className="form-control"/>
                                   </div>
                                   <div className="col">
                                       <small id="certType">City</small>
                                       <input type="text" className="form-control"/>
                                   </div>
                               </div>
                           </form>
                           <br></br>
                           
                           <a href="#" className="btn btn-primary">Search</a>
                           
                           <a href="#" className="btn btn-secondary">Reset</a>
                       </div>
                   </div>

                   <div className="card">
                       <div className="card-header bg-info text-white">
                           <i className="fa fa-angle-down"></i> Supplier list
                       </div>
                       <div className="card-body">

                           <div>
                               <table className="table">
                                   <thead>
                                   <tr>
                                       <th></th>
                                       <th> Supplier name</th>
                                       <th> Supplier index</th>
                                       <th> Supplier city</th>
                                   </tr>
                                   </thead>
                                   <tbody>

                                   {suppliers.map(
                                       tempSupplier => (

                                       <tr key={tempSupplier.id}>
                                           <td className="text-center align-middle">
                                               <div>

                                                   <input type="radio" name="supplier" id="supplier" onChange={handleChange} value={tempSupplier.name} />
               
                                               </div>
                                           </td>
                                           <td> {tempSupplier.name} </td>
                                           <td> {tempSupplier.index} </td>
                                           <td> {tempSupplier.city}</td>
                                       </tr>
                                           )
                                       )}

                                   </tbody>
                                   
                               </table>
                               
                           </div>
                           
                           <button className="btn btn-success" onClick={() => setCurrentCertificate} data-dismiss="modal">Submit</button>
                           <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                       </div>

                   </div>
               </div>

           </div>
       </div>
   </div>
</main>

);


}

export default CertificateComponent


