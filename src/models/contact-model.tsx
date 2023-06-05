import { IContactStatus } from "../utils/enum";

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  status: IContactStatus;
}

export interface ContactManagementApp {
  getAllContacts(): IContact[];
  getContactById(id: string): IContact | undefined;
  addContact(contact: IContact): void;
  updateContact(contact: IContact): void;
  deleteContact(id: string): void;
}
