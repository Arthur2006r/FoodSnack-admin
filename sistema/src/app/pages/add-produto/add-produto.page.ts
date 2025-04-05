import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage implements OnInit {
  modo: string;
  produto: Produto;
  formGroup: FormGroup;
  tipos: string[];
  imagePreview: string | ArrayBuffer | null = null;

  readonly precoMask: MaskitoOptions = {
    mask: [
      'R', '$', ' ', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, ',', /\d/, /\d/
    ]
  };
  readonly predicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController) {
    this.modo = "";
    this.produto = new Produto();
    this.formGroup = this.formBuilder.group({
      'imagem': [null, Validators.compose([Validators.required])],
      'nome': [this.produto.nome, Validators.compose([Validators.required])],
      'descricao': [this.produto.descricao, Validators.compose([Validators.required])],
      'preco': [this.produto.preco <= 0 ? null : this.produto.preco, Validators.compose([Validators.required])],
      'tipo': [this.produto.tipo, Validators.compose([Validators.required])],
    })

    this.tipos = [
      'Pratos', 'Lanches', 'Doces', 'Bebidas'
    ];
  }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.modo = "Edição"
      this.produto = this.produtoService.buscarPorId(id);
      this.formGroup.get('nome')?.setValue(this.produto.nome);
      this.formGroup.get('descricao')?.setValue(this.produto.descricao);
      this.formGroup.get('preco')?.setValue(this.produto.preco);
      this.formGroup.get('tipo')?.setValue(this.produto.tipo);
    } else {
      this.imagePreview = 'assets/imagens/produto.jpeg';
      this.modo = "Cadastro"
    }
  }

  salvar() {
    this.produto.nome = this.formGroup.value.nome;
    this.produto.descricao = this.formGroup.value.descricao;
    this.produto.preco = this.formGroup.value.preco;
    this.produto.tipo = this.formGroup.value.tipo;

    this.produtoService.salvar(this.produto);
    this.exibirMensagem('Registro salvo com sucesso!!!')
    this.navController.navigateBack('/produtos')
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
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
