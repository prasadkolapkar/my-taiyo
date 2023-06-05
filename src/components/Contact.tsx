import React, { useState } from 'react'
import { IContact } from '../models/contact-model';
import { IContactStatus } from '../utils/enum';
import { Button, Modal, ModalHeader, Form, FormGroup, Label, Input, FormText, ModalBody, ModalFooter, BreadcrumbItem, Breadcrumb, Col, } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import ContactManagementService from '../services/contact-management-service';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../redux/action';

function Contact() {

  const contactService = new ContactManagementService();
  const dispatch = useDispatch();
  const reduxData = useSelector((state: any) => state.data);
  //column array for rendering table columns
  const cols: string[] = ["ID", "FIRSTNAME", "LASTNAME", "STATUS", "ACTION"];

  //state for handling list of contacts
  const [contacts, setContacts] = useState<IContact[]>([]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const notify = (msg: string) => toast(msg);


  const { handleSubmit, register, getValues, control, reset, clearErrors, setValue,
    formState: { errors }, } = useForm<IContact>();

  const fetchData = async () => {
    try {
      const contacts = await contactService.getAllContacts();
      setContacts(contacts);
      dispatch(addData(contacts));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: IContact) => {
    const newContact: IContact = {
      id: !!data.id ? data.id : "",
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status
    };
    if (!!data.id) {
      contactService.updateContact(newContact);
      notify("Contact updated successfully");
    }
    else {
      newContact.id = uuidv4();
      contactService.addContact(newContact);
      notify("Contact added successfully");
    }
    fetchData();
    togglePopover();
    reset();
    clearErrors();
  };

  const deleteContact = (id: string) => {
    contactService.deleteContact(id);
    notify("Contact deleted successfully");
    fetchData();
  }

  const getBackGroundolor = (status: IContactStatus) => {
    if (status == IContactStatus.Active)
      return 'bg-green-500 text-white';
    else return 'bg-red-500 text-white'
  }

  const onUpdate = (data: IContact) => {
    togglePopover();
    setValue("id", data.id);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("status", data.status);
  }


  return (
    <React.Fragment>

      <ToastContainer />
      <Breadcrumb>
        <BreadcrumbItem><a href="/">Overview</a></BreadcrumbItem>
        <BreadcrumbItem active>Contact Management</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex items-center justify-between bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <button id="popover-btn" className="h-10 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
          togglePopover();
          reset();
          clearErrors();
        }}>
          Add Contact
        </button>

        <Modal isOpen={popoverOpen} toggle={togglePopover}>
          <ModalHeader toggle={togglePopover}>Add Contact</ModalHeader>
          <ModalBody>
            <Form id="addContactForm" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup row>
                <Col sm={12}>
                  <Label htmlFor="firstName">
                    First Name <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="firstName"
                    rules={{ required: "Please enter first name" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Please enter first name..."
                        {...field}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <p className="error m-0">{errors.firstName.message}</p>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  <Label htmlFor="lastName">
                    Last Name <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="lastName"
                    rules={{ required: "Please enter last name" }}
                    render={({ field }) => (
                      <Input
                        type="text"
                        placeholder="Please enter lastName..."
                        {...field}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <p className="error m-0">{errors.lastName.message}</p>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={12}>
                  <Label htmlFor="status">
                    Status <span className="text-danger">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="status"
                    rules={{ required: "Please select status" }}
                    render={({ field }) => (
                      <Input
                        type="select"
                        placeholder="Please select status..."
                        {...field}
                      >
                        <option value="" disabled selected>Please select status</option>
                        <option value={IContactStatus.Active}>{IContactStatus.Active}</option>
                        <option value={IContactStatus.Inactive}>{IContactStatus.Inactive}</option>
                      </Input>
                    )}
                  />
                  {errors.status && (
                    <p className="error m-0">{errors.status.message}</p>
                  )}
                </Col>
              </FormGroup>
              <Button color="primary"
                form="addContactForm" type="submit">Save</Button>{' '}
              <Button color="secondary" onClick={togglePopover}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {cols.map((col: string, index) => (
              <th className="py-2 px-4 border-b">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!contacts.length ? <>
            <tr>
              <td className="border px-4 py-2 text-center font-bold" colSpan={5}>
                No data available
              </td>
            </tr>
          </> :
            contacts.map((item: IContact, index: number) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b">{item.firstName}</td>
                <td className="py-2 px-4 border-b">{item.lastName}</td>
                <td className="py-2 px-4 border-b"><span className={`p-2 h-8 rounded ${getBackGroundolor(item.status)}`}>{item.status}</span></td>
                <td className="py-2 px-4 border-b">
                  <div className="flex">

                    <button className="h-8 bg-blue-500 hover:bg-blue-700 text-white mr-2 font-bold py-2 px-4 rounded" onClick={() => onUpdate(item)}>
                      Edit
                    </button>
                    <button className="h-8 bg-red-500 hover:bg-green-700 text-white mr-2 font-bold py-2 px-4 rounded" onClick={() => deleteContact(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Contact