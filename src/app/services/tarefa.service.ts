import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from 'src/app/models/tarefa';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

  findAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${API_CONFIG.baseUrl}/tarefas`);
  }

  create(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${API_CONFIG.baseUrl}/tarefas`, tarefa);
  }

  update(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${tarefa.id}`, tarefa);
  }

  delete(id: any): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

// Update simples: envia só ID (backend seta o status)
  atualizarStatusConcluido(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}/concluir`, {});
  }
}
