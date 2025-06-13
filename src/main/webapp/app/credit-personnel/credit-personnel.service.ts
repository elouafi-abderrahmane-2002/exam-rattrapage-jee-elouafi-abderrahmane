import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CreditPersonnelDTO } from 'app/credit-personnel/credit-personnel.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class CreditPersonnelService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/creditPersonnels';

  getAllCreditPersonnels() {
    return this.http.get<CreditPersonnelDTO[]>(this.resourcePath);
  }

  getCreditPersonnel(id: number) {
    return this.http.get<CreditPersonnelDTO>(this.resourcePath + '/' + id);
  }

  createCreditPersonnel(creditPersonnelDTO: CreditPersonnelDTO) {
    return this.http.post<number>(this.resourcePath, creditPersonnelDTO);
  }

  updateCreditPersonnel(id: number, creditPersonnelDTO: CreditPersonnelDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, creditPersonnelDTO);
  }

  deleteCreditPersonnel(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getCreditValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/creditValues')
        .pipe(map(transformRecordToMap));
  }

}
