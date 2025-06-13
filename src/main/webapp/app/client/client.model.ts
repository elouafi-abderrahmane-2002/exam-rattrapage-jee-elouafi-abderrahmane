export class ClientDTO {

  constructor(data:Partial<ClientDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  nom?: string|null;
  email?: string|null;

}
