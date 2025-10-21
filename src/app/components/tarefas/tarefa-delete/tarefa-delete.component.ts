import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa-delete',
  templateUrl: './tarefa-delete.component.html',
  styleUrl: './tarefa-delete.component.css'
})
export class TarefaDeleteComponent implements OnInit {

    tarefa: Tarefa = {
      id:              '',
      titulo:           '',
      descricao:        '',
      dataCriacao:      '',
      dataVencimento:   '',
      statusTarefa:     0
    }
  
  constructor(
    private service: TarefaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.tarefa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.tarefa.id).subscribe(resposta => {
      this.tarefa = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.tarefa.id).subscribe(() => {
      this.toast.success('Tarefa deletada com sucesso', 'Delete');
      this.router.navigate(['tarefas'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

}
