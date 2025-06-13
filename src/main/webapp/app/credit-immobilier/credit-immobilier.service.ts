import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CreditImmobilierDTO } from 'app/credit-immobilier/credit-immobilier.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class CreditImmobilierService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/creditImmobiliers';

  getAllCreditImmobiliers() {
    return this.http.get<CreditImmobilierDTO[]>(this.resourcePath);
  }

  getCreditImmobilier(id: number) {
    return this.http.get<CreditImmobilierDTO>(this.resourcePath + '/' + id);
  }

  createCreditImmobilier(creditImmobilierDTO: CreditImmobilierDTO) {
    return this.http.post<number>(this.resourcePath, creditImmobilierDTO);
  }

  updateCreditImmobilier(id: number, creditImmobilierDTO: CreditImmobilierDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, creditImmobilierDTO);
  }

  deleteCreditImmobilier(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getCreditValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/creditValues')
        .pipe(map(transformRecordToMap));
  }

}
