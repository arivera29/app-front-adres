import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:5000/api'; // URL de la API
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    console.log('Intentando autenticar con:', username, password);
    return this.http.post<{ token: string }>(`${this.apiUrl}/autenticar`, { username, password })
      .pipe(
        tap(res => {
          console.log('Respuesta de autenticación:', res);
          localStorage.setItem('token', res.token);
        })
      );
  }
  
  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
