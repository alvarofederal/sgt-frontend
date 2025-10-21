import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (resposta: HttpResponse<any>) => {  // ← resposta é HttpResponse
        const authHeader = resposta.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);  // Remove "Bearer " (7 chars)
          this.service.successfulLogin(token);
          this.router.navigate(['']);
        } else {
          console.error('Header Authorization inválido ou ausente:', authHeader);
          this.toast.error('Falha no login: Token não encontrado');
        }
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        this.toast.error('Usuário e/ou senha inválidos');
      }
    });
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }

}
