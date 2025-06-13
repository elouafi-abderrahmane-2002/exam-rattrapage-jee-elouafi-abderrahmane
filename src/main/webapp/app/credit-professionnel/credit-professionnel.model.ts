export class CreditProfessionnelDTO {

  constructor(data:Partial<CreditProfessionnelDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  raisonSociale?: string|null;
  motif?: string|null;
  credit?: number|null;

}
