import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "../services/authentication.service";
import { SignInData } from "../model/signInData";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isFormValid = false;
  areCredentialsInvalid = false;

  user = {
    login: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(signInForm: NgForm) {
    console.log('Datos del formulario:', this.user); // Asegúrate de registrar los datos del usuario
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    const signInData = new SignInData(this.user.login, this.user.password);
    this.authenticationService.authenticate(signInData).subscribe({
      next: (data) => {
        console.log(data); // Asegúrate de registrar los datos recibidos
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error de autenticación:', error);
        if (error.status === 0) {
          console.error('Error de red o CORS:', error.message);
        } else if (error.status === 401) {
          console.error('Credenciales incorrectas:', error.message);
        } else {
          console.error('Error del servidor:', error.message);
        }
        this.areCredentialsInvalid = true;
      }
    });
  }

  reloadPage(event: Event): void {
    event.preventDefault();
    window.location.reload();
  }
}
