import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { SignForm } from 'src/app/models/signform';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private toast: ToastrService,
    private registerService: RegisterService,
    private router: Router) { }

  ngOnInit(): void { }

  userCreate: SignForm = {
    nome:        '',
    cpf:         '',
    email:       '',
    password:    '',
    perfis:      []
  }

  nome:         UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));
  cpf:          UntypedFormControl = new UntypedFormControl(null, Validators.required);
  email:        UntypedFormControl = new UntypedFormControl(null, Validators.email);
  password:     UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));

  registry(): void {
    this.addPerfil(1);
    this.registerService.create(this.userCreate).subscribe(() => {
      console.log("Objeto do usuário: ", this.userCreate);
      this.toast.success('Usuário cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
    }, ex => {
        this.toast.error(ex.error.message);
    })
  }

  addPerfil(perfil: any): void {
    if (this.userCreate.perfis.includes(perfil)) {
      this.userCreate.perfis.splice(this.userCreate.perfis.indexOf(perfil), 1);
    } else {
      this.userCreate.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.email.valid && this.password.valid
  }

}
