export class CreditDTO {

  constructor(data:Partial<CreditDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  dateDemande?: string|null;
  statut?: string|null;
  dateAcceptation?: string|null;
  montant?: string|null;
  dureeRemboursement?: number|null;
  tauxInteret?: string|null;
  typeCredit?: string|null;
  client?: number|null;

}
