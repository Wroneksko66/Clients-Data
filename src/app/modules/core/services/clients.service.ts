import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import {
  Client,
  ClientResponse,
  GetClientsResponse,
  PostClient,
} from '../../../../model/client.model';
import { environment } from '../../../../environments/environments.development';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClients(
    pageIndex: number,
    itemsPerPage: number,
    sortDirection: string,
    sortColumnName: string,
    value = '',
  ): Observable<GetClientsResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    if (sortColumnName) {
      params = params
        .append('_sort', sortColumnName)
        .append('_order', sortDirection);
    }
    if (value) {
      params = params.append('firstname', value);
    }

    return this.http
      .get<ClientResponse[]>(this.apiUrl + '/clients', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { clients: [], totalCount: 0 };

          const clientArr: Client[] = response.body.map(
            ({ id, firstname, surname, email, phone, address, postcode }) =>
              new Client(
                id,
                firstname,
                surname,
                email,
                phone,
                address,
                postcode,
              ),
          );
          const totalCount = Number(response.headers.get('X-Total-Count'));
          return { clients: clientArr, totalCount };
        }),
      );
  }

  getClient(id: number): Observable<Client> {
    return this.http
      .get<Client>(this.apiUrl + '/clients/' + id)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  deleteClient(id: number) {
    return this.http.delete(this.apiUrl + '/clients/' + id);
  }

  postClient(clientData: PostClient): Observable<Client> {
    return this.http
      .post<ClientResponse>(this.apiUrl + '/clients', clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }

  putClient(clientData: PostClient, id: number): Observable<Client> {
    return this.http
      .put<ClientResponse>(this.apiUrl + '/clients/' + id, clientData)
      .pipe(
        map(
          ({ id, firstname, surname, email, phone, address, postcode }) =>
            new Client(id, firstname, surname, email, phone, address, postcode),
        ),
      );
  }
}
