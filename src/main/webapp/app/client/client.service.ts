import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ClientDTO } from 'app/client/client.model';


@Injectable({
  providedIn: 'root',
})
export class ClientService {

  http = inject(HttpClient);
  resourcePath = environment.apiPath + '/api/clients';

  getAllClients() {
    return this.http.get<ClientDTO[]>(this.resourcePath);
  }

  getClient(id: number) {
    return this.http.get<ClientDTO>(this.resourcePath + '/' + id);
  }

  createClient(clientDTO: ClientDTO) {
    return this.http.post<number>(this.resourcePath, clientDTO);
  }

  updateClient(id: number, clientDTO: ClientDTO) {
    return this.http.put<number>(this.resourcePath + '/' + id, clientDTO);
  }

  deleteClient(id: number) {
    return this.http.delete(this.resourcePath + '/' + id);
  }

}
