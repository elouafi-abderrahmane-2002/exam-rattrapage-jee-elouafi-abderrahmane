import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RemboursementDTO } from 'app/remboursement/remboursement.model';
import { map } from 'rxjs';
import { transformRecordToMap } from 'app/common/utils';


@Injectable({
  providedIn: 'root',
})
export class RemboursementService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/remboursements';

  getAllRemboursements() {
    return this.http.get<RemboursementDTO[]>(this.resourcePath);
  }

  getRemboursement(id: number) {
    return this.http.get<RemboursementDTO>(this.resourcePath + '/' + id);
  }

  createRemboursement(remboursementDTO: RemboursementDTO) {
    return this.http.post<number>(this.resourcePath, remboursementDTO);
  }

  updateRemboursement(id: number, remboursementDTO: RemboursementDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, remboursementDTO);
  }

  deleteRemboursement(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

  getCreditValues() {
    return this.http.get<Record<string, number>>(this.resourcePath + '/creditValues')
        .pipe(map(transformRecordToMap));
  }

}
