import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignForm } from 'src/app/models/signform';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  create(signForm: SignForm): Observable<SignForm> {
    return this.http.post<SignForm>(`${API_CONFIG.baseUrl}/usuarios/register`, signForm);
  }
}

