import React, { useEffect, useState, ChangeEvent, Fragment, Component } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from '../types/Supplier';
import CertificateData from '../types/Certificate';
import CertificateService from "../services/CertificateService";
import { Navigate, useNavigate } from "react-router-dom";

interface IProps { 
    //Map properties match
    match:{ 
      
      params: {
          id?:any
      }
     
    }
}

interface IState {
    suppliers: Array<ISupplierData>,
    currentCertificate: CertificateData
}


export default class UpdateCertificate extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.onChangeSupplier = this.onChangeSupplier.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeValidFrom = this.onChangeValidFrom.bind(this);
        this.onChangeValidTo = this.onChangeValidTo.bind(this);
        this.updateCertificate = this.updateCertificate.bind(this);
        
        this.state = {
            suppliers: [],
            currentCertificate: {
                id: null,
                supplier: "",
                type: "",
                validFrom: "",
                validTo: ""
            }
        }

    }


    retrieveSuppliers() {
        SupplierService.getAll()
          .then((response: any) => {
            this.setState({
              suppliers: response.data
            });
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }

    public componentDidMount() { 
      CertificateService.get(this.props.match.params.id as any).then(
        (rp) => {
            
                const certificate = rp.data;
                this.setState({ currentCertificate: new CertificateData()});
            } 
    );
        
    }

    getCertificate(id: string) {
        CertificateService.get(id)
          .then((response: any) => {
            this.setState({
              currentCertificate: response.data,
            });
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }

      onChangeSupplier(e: ChangeEvent<HTMLInputElement>) {
        const supplier = e.target.value;
    
        this.setState((prevState) => ({
          currentCertificate: {
            ...prevState.currentCertificate,
            supplier: supplier,
          },
        }));
      }

      onChangeType(e: ChangeEvent<HTMLSelectElement>) {
        const type = e.target.value;
    
        this.setState((prevState) => ({
          currentCertificate: {
            ...prevState.currentCertificate,
            type: type,
          },
        }));
      }

      onChangeValidFrom(e: ChangeEvent<HTMLInputElement>) {
        const validFrom = e.target.value;
    
        this.setState((prevState) => ({
          currentCertificate: {
            ...prevState.currentCertificate,
            validFrom: validFrom,
          },
        }));
      }

      onChangeValidTo(e: ChangeEvent<HTMLInputElement>) {
        const validTo = e.target.value;
    
        this.setState((prevState) => ({
          currentCertificate: {
            ...prevState.currentCertificate,
            validTo: validTo,
          },
        }));
      }

      updateCertificate() {
        CertificateService.update(
          this.state.currentCertificate.id,
          this.state.currentCertificate,
        )
          .then((response: any) => {
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }


  render(){


      return (
        <main className="col bg-faded py-3">

        <div>
           <h4>New Certificate</h4>
        </div>
   
   <div className="row fst-italic">
       <div className="col-5">
           
           <small>Supplier</small>
           <div className="input-group mb-3"><input placeholder="Search for supplier" value={this.state.currentCertificate.supplier} type="text" className="form-control"/>
               <div>
                   <button className="btn btn-outline-secondary" data-toggle="modal"
                           data-target=".bd-example-modal-lg"><i className="fa fa-search"></i></button>
                   <button className="btn btn-outline-secondary" name="supplier" value="" ><i className="fa fa-close"></i></button>
               </div>
           </div>

           <div className="form-group">
               <small id="certType">Certificate type</small>
               <select name="type" id="certType" className="form-control" onChange={this.onChangeType} value={this.state.currentCertificate.type}>
                   <option selected>Select your option</option>
                   <option value="CCA Certificate">CCA Certificate</option>
                   <option value="ISO 9001">ISO 9001</option>
                   <option value="1AA Cert">1AA Cert</option>
                   <option value="Other type placeholder">Other type placeholder</option>
               </select>
           </div>

           <div className="form-group">
               <small>Valid from</small>
               <input type="date" className="form-control" id="validFrom" name="validFrom" value={this.state.currentCertificate.validFrom} onChange={this.onChangeValidFrom} placeholder="Click to select date"/>
           </div>

           <div className="form-group">
               <small>Valid to</small>
               <input type="date" name="validTo" value={this.state.currentCertificate.validTo} onChange={this.onChangeValidTo} className="form-control" id="validTo" placeholder="Click to select date"/>
           </div>
           <br></br>

           <button onClick={this.updateCertificate} className="btn btn-success">
                    Submit
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

                                   {  this.state.suppliers.map (
                                       tempSupplier => (

                                       <tr key={tempSupplier.id}>
                                           <td className="text-center align-middle">
                                               <div>

                                                   <input type="radio" name="supplier" id="supplier" onChange={this.onChangeSupplier} value={tempSupplier.name} />
               
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
                           
                           <button className="btn btn-success" onClick={() => SubmitEvent} data-dismiss="modal">Submit</button>
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
     
        

}


