import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CreditProfessionnelDTO } from 'app/credit-professionnel/credit-professionnel.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class CreditProfessionnelService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/creditProfessionnels';

  getAllCreditProfessionnels() {
    return this.http.get<CreditProfessionnelDTO[]>(this.resourcePath);
  }

  getCreditProfessionnel(id: number) {
    return this.http.get<CreditProfessionnelDTO>(this.resourcePath + '/' + id);
  }

  createCreditProfessionnel(creditProfessionnelDTO: CreditProfessionnelDTO) {
    return this.http.post<number>(this.resourcePath, creditProfessionnelDTO);
  }

  updateCreditProfessionnel(id: number, creditProfessionnelDTO: CreditProfessionnelDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, creditProfessionnelDTO);
  }

  deleteCreditProfessionnel(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getCreditValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/creditValues')
        .pipe(map(transformRecordToMap));
  }

}
