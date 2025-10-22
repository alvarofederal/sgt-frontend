import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from 'src/app/models/tarefa';
import { API_CONFIG } from '../config/api.config';
import { DatePipe } from '@angular/common';  // ← Importe isso

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  findById(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

  findAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${API_CONFIG.baseUrl}/tarefas`);
  }

  create(tarefa: Tarefa): Observable<Tarefa> {
    if (tarefa.dataVencimento) {
      tarefa.dataVencimento = this.datePipe.transform(tarefa.dataVencimento, 'dd/MM/yyyy', 'pt-BR');  // ← Formata
    }
    console.log("Criando tarefa:", tarefa);
    return this.http.post<Tarefa>(`${API_CONFIG.baseUrl}/tarefas`, tarefa);
  }

  update(tarefa: Tarefa): Observable<Tarefa> {
    if (tarefa.dataVencimento) {
      tarefa.dataVencimento = this.datePipe.transform(tarefa.dataVencimento, 'dd/MM/yyyy', 'pt-BR');  // ← Formata
    }
    return this.http.put<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${tarefa.id}`, tarefa);
  }

  delete(id: any): Observable<Tarefa> {
    return this.http.delete<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}`);
  }

  atualizarStatusConcluido(id: number): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${API_CONFIG.baseUrl}/tarefas/${id}/concluir`, {});
  }
}
