import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private toastController: ToastController, private navController: NavController) {
    this.formGroup = this.formBuilder.group({
      'codigo': [null, Validators.compose([Validators.required])],
      'senha': [null, Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.adminService.encerrarAutenticacao();
  }

  autenticar() {
    let codigo = this.formGroup.value.codigo;
    let senha = this.formGroup.value.senha;
    let resultado = this.adminService.autenticar(codigo, senha);

    if (!resultado) {
      this.exibirMensagem('Código e/ou senha inválidos!!!')
    } else {
      this.adminService.registrarAutenticacao();
      this.navController.navigateBack('/produtos')
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
