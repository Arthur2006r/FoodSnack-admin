import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  produtos: Produto[];

  constructor(private produtoservice: ProdutoService, private toastController: ToastController, private alertController: AlertController) { 
    this.produtos = [];
  }

  ngOnInit() {
    this.produtos = this.produtoservice.listar();
  }

  ionViewWillEnter(){
    this.produtos = this.produtoservice.listar();
  }

  async excluir(produto: Produto){    
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: produto.nome,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.produtos = this.produtoservice.excluir(produto.id);
            this.exibirMensagem('Produto excluído com sucesso!!!')
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
