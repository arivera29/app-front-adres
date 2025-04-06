import { Injectable } from '@angular/core';
import { Adquisiciones } from '../models/adquisiciones';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionesService {
  private readonly apiUrl = 'http://localhost:5000/api/adquisiciones'; // URL de la API
  
  constructor(private authSevrice: AuthService, private http: HttpClient) { }

  private headers = () => {
    const token = this.authSevrice.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll() {
    return this.http.get<Adquisiciones[]>(this.apiUrl, { headers: this.headers() });
  }

  getById(id: number) {
    return this.http.get<Adquisiciones>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }
  create(adquisiciones: Adquisiciones) {
    return this.http.post<Adquisiciones>(this.apiUrl, adquisiciones, { headers: this.headers() });
  }
  update(adquisiciones: Adquisiciones) {
    return this.http.put<Adquisiciones>(`${this.apiUrl}/${adquisiciones.id}`, adquisiciones, { headers: this.headers() });
  }
  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }

}
