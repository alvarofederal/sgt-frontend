import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa-update',
  templateUrl: './tarefa-update.component.html',
  styleUrl: './tarefa-update.component.css'
})
export class TarefaUpdateComponent  implements OnInit {

  tarefa: Tarefa = {
    id:              '',
    titulo:           '',
    descricao:        '',
    dataCriacao:      '',
    dataVencimento:   '',
    statusTarefa:     0
  }

  titulo:       FormControl =  new FormControl(null, Validators.minLength(3));
  descricao:    FormControl =  new FormControl(null, Validators.minLength(3));
  statusTarefa: FormControl = new FormControl(null, [Validators.required]);

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

  update(): void {
    this.service.update(this.tarefa).subscribe(() => {
      console.log("Tarefa atualizada:", this.tarefa);
      this.toast.success('Tarefa atualizada com sucesso', 'Update');
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

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'Pendente'
    } else if(status == '1') {
      return 'Em andamento'
    } else {
      return 'Concluído'
    }
  }
}
