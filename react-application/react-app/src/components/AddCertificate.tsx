import React, { useEffect, useState, ChangeEvent, Fragment } from "react";
import SupplierService from "../services/SupplierService";
import ISupplierData from '../types/Supplier';
import CertificateData from '../types/Certificate';
import CertificateService from "../services/CertificateService";
import { BrowserRouter, Navigate, useNavigate } from "react-router-dom";
//import Person from "../types/Person";
import PersonService from "../services/PersonService";
import { t } from "i18next";
import { useTranslation, withTranslation, WithTranslation } from 'react-i18next';


interface Person {
    
    id: number;
    name: string;
    firstName: string;
    userId: string;
    department: string;
    plant: string;
    email: string;
}

export default function AddCertificate() {
  
  const [state, setState] = React.useState({
    id: null,
    supplier: "",
    type: "",
    validFrom: "",
    validTo: "",
    persons: [],
    image: null
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const goToListPage = () => navigate('/certificates');

  // search supplier values
  const [searchSupplierName, setSearchSupplierName] = useState<string>("");
  const [searchSupplierIndex, setSearchSupplierIndex] = useState<string>("");
  const [searchSupplierCity, setSearchSupplierCity] = useState<string>("");

  // retrieve suppliers
  const [suppliers, setSuppliers] = useState<Array<ISupplierData>>([]);
  useEffect(() => {
      retrieveSuppliers();
  }, []);


  const onChangeSearchSupplierName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchSupplierName = e.target.value;
    setSearchSupplierName(searchSupplierName);
  }; 

  const onChangeSearchSupplierIndex = (e: ChangeEvent<HTMLInputElement>) => {
    const searchSupplierIndex = e.target.value;
    setSearchSupplierIndex(searchSupplierIndex);
  }; 

  const onChangeSearchSupplierCity = (e: ChangeEvent<HTMLInputElement>) => {
    const searchSupplierCity = e.target.value;
    setSearchSupplierCity(searchSupplierCity);
  }; 

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

  const retrievePersons = () => {
    PersonService.getAll()
    .then((response: any) => {
        setPersonList(response.data);
        console.log(response.data);
    })
    .catch((e: Error) => {
        console.log(e);
    });
};

// Add and remove participan functions 

  // retrieve persons who are displayed in the list
  const [personList, setPersonList] = useState<Array<Person>>([]);
  useEffect(() => {
      retrievePersons();
  }, []);

  // The ids of users who will be added to the list
  const [ids, setIds] = useState<Array<number>>([]);
  const [checked, setChecked] = useState<Array<Person>>([]);

  // This function will be triggered when a checkbox changes its state
  const selectUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);

    // Check if "ids" contains "selectedIds"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids];
      newIds.push(selectedId);
      setIds(newIds);
    }
  };

  // This function will be called when the "SELECT USERS" is clicked
  const sselectParticipans = () => {
    // Only keep the users whose ids are in the "ids" array
    const selectedPersons: Person[] = personList.filter(
      (person) => ids.includes(person.id)
    ); <div className="btn btn-primary btn-sm">
                      <input type="file" onChange={fileSelectHandler}  />
                    </div>

    setChecked(selectedPersons);
  };

  // remove participant
  const removeParticipant = (e: number) => {

    const newIds = [...ids];
    const index = newIds.indexOf(e);

    newIds.splice(index, 1);

    const newChecked: Person[] = checked.filter(
      (person) => newIds.includes(person.id)
    ); 

    setChecked(newChecked);
  };


  const findByName = () => {
    SupplierService.findByName(searchSupplierName)
      .then((response: any) => {
        setSuppliers(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByIndex = () => {
    SupplierService.findByIndex(searchSupplierIndex)
      .then((response: any) => {
        setSuppliers(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByCity = () => {
    SupplierService.findByCity(searchSupplierCity)
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
      validTo: state.validTo,
      persons: checked,
      image: imageUrl
    };

    CertificateService.create(data)
      .then((response: any) => {
        setState({
          id: response.data.id,
          supplier: response.data.supplier,
          type: response.data.type,
          validFrom: response.data.validFrom,
          validTo: response.data.validTo,
          persons: response.data.persons,
          image: response.data.data

        }); 
        setSubmitted(true);
        goToListPage();
    
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // TODO
  // need to fix this function
  function onClickSearch() {

    if(searchSupplierName != "") {
        findByName();
    }
    if (searchSupplierIndex != "") {
        findByIndex();
    }
    if(searchSupplierCity != "") {
        findByCity();
    }  
  }

  // handle input 

  function handleChange(evt: any) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  // upload file functions

  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const fileSelectHandler = (event: any) => {
    
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

   const fileUploadHandler = () => {

    const formData = new FormData();
    formData.append('File', selectedFile as Blob);

    fetch(
        //'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
        'http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5',
        
        {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'application/json'
            },
            
        }
    )
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
            setImageUrl("IMAGE URL UPLOADED")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
  }

  const { t } = useTranslation();

  return (
     
     <main className="col bg-faded py-3">

                 <div>
                    <h3> {t('new_certificate')} </h3>
                 </div>
            
            <div className="row fst-italic">
                <div className="col-5">
                    
                    <small>{t('supplier')}</small>
                    <div className="input-group mb-3"><input placeholder={t('search_for_supplier')} value={state.supplier} type="text" className="form-control"/>
                        <div>
                            <button className="btn btn-outline-secondary" data-toggle="modal"
                                    data-target=".bd-supplier-modal-lg"><i className="fa fa-search"></i></button>
                            <button className="btn btn-outline-secondary" name="supplier" value="" onClick={handleChange}><i className="fa fa-close"></i></button>
                        </div>
                    </div>

                    <div className="form-group">
                        <small id="certType">{t('certificate_type')} </small>
                        <select name="type" id="certType" className="form-control" onChange={handleChange} value={state.type}>
                            <option selected>{t('select_option')} </option>
                            <option value="CCC Certificate">CCC Certificate</option>
                            <option value="Permission of printing">Permission of printing</option>
                            <option value="OHSAS 180001">OHSAS 180001</option>
                            <option value="Other type placeholder">Other type placeholder</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <small>{t('valid_from')}</small>
                        <input type="date" className="form-control" id="validFrom" name="validFrom" value={state.validFrom} onChange={handleChange} placeholder="Click to select date"/>
                    </div>

                    <div className="form-group">
                        <small>{t('valid_to')}</small>
                        <input type="date" name="validTo" value={state.validTo} onChange={handleChange} className="form-control" id="validTo" placeholder="Click to select date"/>
                    </div>
                    <br></br>

              
                </div>
                <div className="col-5">
                    <div className="btn btn-primary btn-sm">
                      <input type="file" onChange={fileSelectHandler}  />
                    </div>

                    <div className="btn btn-primary btn-sm">
                      <button onClick={fileUploadHandler}>Upload</button>
                    </div>

                        
                    <div className="image-preview">
                    </div>
                </div>  
            </div>
            
            <br></br>

            <small>Assigned ussers</small>
                    <div className="input-group mb-3 ">
                        <div>
                            <button className="btn btn-outline-secondary" data-toggle="modal"
                                    data-target=".bd-persons-modal-lg"><i className="fa fa-search"></i> Add participant</button>
                        </div>
                    </div>

            <div className="col-10 border">
            
            <div>
                               
                <table className="table my-3">
                    <thead>
                    <tr>
                        <th>   </th>
                        <th>{t('personName')}</th>
                        <th>{t('personDepartment')}</th>
                        <th>E-mail</th>
                    </tr>
                    </thead>
                        <tbody>
                                            {checked.map(
                                                (tempChecked) => (

                                                <tr key={tempChecked.id} >
                                                    <td  className="text-center ">
                                                        
                                                      <a type="button" className="btn" onClick={() => removeParticipant(tempChecked.id)}>
                                                        <i className="fa-solid fa-xmark"></i>
                                                      </a>
                                                    </td>
                                                    <td> {tempChecked.name}, {tempChecked.firstName}, {tempChecked.plant} </td>
                                                    <td> {tempChecked.department} </td>
                                                    <td> {tempChecked.email}</td>
                                                </tr>
                                                    )
                                                )}
                        </tbody>
                    </table>
                </div>

            </div>
            <br></br>

            <button onClick={saveCertificate} className="btn btn-success mt-3">
                        {t('submit')}
            </button>
        
            {/* SUPPLIER MODAL FORM  */}
            <div className="modal fade bd-supplier-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="exampleModalLabel">{t('search_for_supplier')}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="card">
                                <div className="card-header bg-info text-white">
                                    <i className="fa fa-angle-down"></i> {t('search_criteria')}
                                </div>
                                <div className="card-body">

                                    <form>
                                        <div className="row font-italic">
                                            <div className="col">
                                                <small id="supplierName">{t('supplier_name')}</small>
                                                <input type="text" className="form-control" value={searchSupplierName} onChange={onChangeSearchSupplierName}/>
                                            </div>
                                            <div className="col">
                                                <small id="supplierIndex">{t('supplier_index')}</small>
                                                <input type="number" className="form-control" value={searchSupplierIndex} onChange={onChangeSearchSupplierIndex}/>
                                            </div>
                                            <div className="col">
                                                <small id="supplierCity">{t('city')}</small>
                                                <input type="text" className="form-control" value={searchSupplierCity} onChange={onChangeSearchSupplierCity}/>
                                            </div>
                                        </div>
                                    </form>
                                    <br></br>
                                    
                                    <button className="btn btn-primary" onClick={onClickSearch}>{t('search')}</button>
                                    
                                    <a href="#" className="btn btn-secondary">{t('reset')}</a>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header bg-info text-white">
                                    <i className="fa fa-angle-down"></i> {t('supplier_list')}
                                </div>
                                <div className="card-body">

                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th> {t('supplier_name')}</th>
                                                <th> {t('supplier_index')}</th>
                                                <th> {t('city')}</th>
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
                                    
                                    <button className="btn btn-success" onClick={() => setState} data-dismiss="modal">{t('submit')}</button>
                                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* PERSON SEARCH MODAL FORM */}
            <div className="modal fade bd-persons-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="exampleModalLabel">Search for persons</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="card">
                                <div className="card-header bg-info text-white">
                                    <i className="fa fa-angle-down"></i> {t('search_criteria')}
                                </div>
                                <div className="card-body">

                                    <form>
                                        <div className="row font-italic">
                                            <div className="col">
                                                <small id="supplierName">{t('person_name')}</small>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col">
                                                <small id="supplierIndex">{t('person_firstName')}</small>
                                                <input type="number" className="form-control" value={searchSupplierIndex} onChange={onChangeSearchSupplierIndex}/>
                                            </div>
                                            <div className="col">
                                                <small id="supplierCity">{t('userID')}</small>
                                                <input type="text" className="form-control" value={searchSupplierCity} onChange={onChangeSearchSupplierCity}/>
                                            </div>
                                        </div>
                                        <div className="row font-italic">
                                            <div className="col-4">
                                                <small id="supplierName">{t('department')}</small>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col-4">
                                                <small id="supplierIndex">{t('plant')}</small>
                                                <input type="number" className="form-control" value={searchSupplierIndex} onChange={onChangeSearchSupplierIndex}/>
                                            </div>
                                            
                                        </div>
                                    </form>
                                    <br></br>
                                    
                                    <button className="btn btn-primary" onClick={onClickSearch}>{t('search')}</button>
                                    
                                    <a href="#" className="btn btn-secondary">{t('reset')}</a>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header bg-info text-white">
                                    <i className="fa fa-angle-down"></i> {t('person_list')}
                                </div>
                                <div className="card-body">

                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th> {t('name')}</th>
                                                <th> {t('first_name')}</th>
                                                <th> {t('userID')}</th>
                                                <th> {t('department')}</th>
                                                <th> {t('plant')}</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {personList.map(
                                                (tempPerson) => (

                                                <tr key={tempPerson.id}>
                                                    <td className="text-center align-middle">
                                                        <div>
                                                        <input
                                                            type="checkbox"
                                                            value={tempPerson.id}
                                                            onChange={selectUser}
                                                            checked={ids.includes(tempPerson.id) ? true : false}
                                                        />
                                                        </div>
                                                    </td>
                                                    <td> {tempPerson.name} </td>
                                                    <td> {tempPerson.firstName}  </td>
                                                    <td> {tempPerson.userId}</td>
                                                    <td> {tempPerson.department} </td>
                                                    <td> {tempPerson.plant} </td>
                                                    
                                                </tr>
                                                    )
                                                )}
                                            </tbody>
                                            
                                        </table>
                                        
                                    </div>
                                    
                                    <button className="btn btn-success" onClick={sselectParticipans} 
                                         data-dismiss="modal">{t('select')}</button>
                                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                
            </div>


            <div className="col-10">
            <button className="btn btn-primary float-end">New comment</button>
            </div>
            

            <div className="col-10 border mt-5">
            
              <div className="m-3">
                UserName placeholder
              </div>

              <textarea className="form-control my-3" id="exampleFormControlTextarea1" ></textarea>
              <button className="btn btn-danger my-3">Comment</button>

            </div>
            
        </main>

  );
}





