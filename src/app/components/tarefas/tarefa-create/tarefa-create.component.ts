import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarefaService } from 'src/app/services/tarefa.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrl: './tarefa-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarefaCreateComponent implements OnInit {

  tarefa: Tarefa = {
    id:              '',
    titulo:           '',
    descricao:        '',
    dataCriacao:      '',
    dataVencimento:   '',
    statusTarefa:     0
  }

  titulo:         FormControl = new FormControl(null, Validators.minLength(3));
  descricao:      FormControl = new FormControl(null, Validators.minLength(3));
  statusTarefa:   FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private service:  TarefaService,
    private toast:    ToastrService,
    private router:   Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.tarefa).subscribe(() => {
      this.toast.success('Tarefa cadastrada com sucesso', 'Cadastro');
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

  validaCampos(): boolean {
    return this.titulo.valid && this.descricao.valid && this.statusTarefa.valid;
  }

}
