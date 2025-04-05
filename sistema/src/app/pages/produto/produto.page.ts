import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {
  produto: Produto;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private produtoService: ProdutoService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {
    this.produto = new Produto();
  }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.produto = this.produtoService.buscarPorId(id);
    }
  }

  async excluir() {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão permanente?',
      message: this.produto.nome,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.produtoService.excluir(this.produto.id);
            this.exibirMensagem('Produto excluído com sucesso!')
            this.navController.navigateBack('/produtos')
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
