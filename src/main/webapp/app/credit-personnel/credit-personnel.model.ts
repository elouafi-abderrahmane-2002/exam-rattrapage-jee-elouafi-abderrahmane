export class CreditPersonnelDTO {

  constructor(data:Partial<CreditPersonnelDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  motif?: string|null;
  credit?: number|null;

}
