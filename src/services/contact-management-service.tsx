import { ContactManagementApp, IContact } from "../models/contact-model";

class ContactManagementService implements ContactManagementApp {
  private static contacts: IContact[] = [];

  constructor() {

  }

  getAllContacts(): IContact[] {
    return ContactManagementService.contacts;
  }

  getContactById(id: string): IContact | undefined {
    return ContactManagementService.contacts.find((contact) => contact.id === id);
  }

  addContact(contact: IContact): void {
    ContactManagementService.contacts.push(contact);
  }

  updateContact(contact: IContact): void {
    const index = ContactManagementService.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      ContactManagementService.contacts[index] = contact;
    }
  }

  deleteContact(id: string): void {
    ContactManagementService.contacts = ContactManagementService.contacts.filter((contact) => contact.id !== id);
  }
}

export default ContactManagementService;
