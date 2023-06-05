export enum IContactStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum Path {
  Contact = "/",
  Map = "/map"
}
export const TitleDisplayNameMap = {
  [Path.Contact]: "Contact Management",
  [Path.Map]: "Map & Charts"
}