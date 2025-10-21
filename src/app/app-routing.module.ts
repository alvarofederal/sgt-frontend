import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TarefaCreateComponent } from './components/tarefas/tarefa-create/tarefa-create.component';
import { TarefaUpdateComponent } from './components/tarefas/tarefa-update/tarefa-update.component';
import { TarefaListComponent } from './components/tarefas/tarefa-list/tarefa-list.component';
import { TarefaDeleteComponent } from './components/tarefas/tarefa-delete/tarefa-delete.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',             component: RegisterComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'tarefas',             component: TarefaListComponent },
      { path: 'tarefas/create',      component: TarefaCreateComponent },
      { path: 'tarefas/update/:id',  component: TarefaUpdateComponent },
      { path: 'tarefas/delete/:id',  component: TarefaDeleteComponent },

      { path: 'usuarios',            component: UsuarioListComponent },
      { path: 'usuarios/create',     component: UsuarioCreateComponent },
      { path: 'usuarios/update/:id', component: UsuarioUpdateComponent },
      { path: 'usuarios/delete/:id', component: UsuarioDeleteComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
