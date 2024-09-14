import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private apiUrl = 'https://api.seudominio.com/dashboard'; // URL da API

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
