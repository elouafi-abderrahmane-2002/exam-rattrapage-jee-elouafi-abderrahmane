export class CreditImmobilierDTO {

  constructor(data:Partial<CreditImmobilierDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  type?: string|null;
  credit?: number|null;

}
