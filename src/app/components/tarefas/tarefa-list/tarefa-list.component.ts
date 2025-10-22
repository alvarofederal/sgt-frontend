import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Tarefa } from 'src/app/models/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrl: './tarefa-list.component.css'
})
export class TarefaListComponent  implements OnInit {

  ELEMENT_DATA: Tarefa[] = []
  FILTERED_DATA: Tarefa[] = []
  
  displayedColumns: string[] = ['statusTarefaCheckbox', 'titulo', 'descricao', 'dataCriacao', 'dataVencimento', 'statusTarefa', 'acoes'];
  dataSource = new MatTableDataSource<Tarefa>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TarefaService,
    private toast:    ToastrService,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Tarefa>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(statusTarefa: any): string {
    if(statusTarefa == '0') {
      return 'Pendente'
    } else if(statusTarefa == '1') {
      return 'Em andamento'
    } else {
      return 'Concluída'
    }
  }

atualizarStatusTarefa(concluido: boolean, tarefa: Tarefa): void {
    if (!concluido || tarefa.statusTarefa === 2) return;
    console.log("Atualizando status da tarefa:", tarefa);

    this.service.atualizarStatusConcluido(tarefa.id).subscribe({
      next: () => this.findAll(),  // Reload direto
      error: (erro) => console.error('Erro:', erro)
    });
    this.toast.success('Concluída com sucesso', 'Concluída!');
  }

  orderByStatus(status: any): void{
    let list: Tarefa[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.statusTarefa == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Tarefa>(list);
    this.dataSource.paginator = this.paginator;
  }
}
