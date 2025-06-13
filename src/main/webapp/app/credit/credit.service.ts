import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CreditDTO } from 'app/credit/credit.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class CreditService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/credits';

  getAllCredits() {
    return this.http.get<CreditDTO[]>(this.resourcePath);
  }

  getCredit(id: number) {
    return this.http.get<CreditDTO>(this.resourcePath + '/' + id);
  }

  createCredit(creditDTO: CreditDTO) {
    return this.http.post<number>(this.resourcePath, creditDTO);
  }

  updateCredit(id: number, creditDTO: CreditDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, creditDTO);
  }

  deleteCredit(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getClientValues() {
    return this.http.get<Record<string, string>>(this.resourcePath + '/clientValues')
        .pipe(map(transformRecordToMap));
  }

}
