import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule } from '@ionic/angular';

import { AddProdutoPageRoutingModule } from './add-produto-routing.module';

import { AddProdutoPage } from './add-produto.page';
import {MaskitoDirective} from '@maskito/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProdutoPageRoutingModule,
    ReactiveFormsModule,
    MaskitoDirective
  ],
  declarations: [AddProdutoPage]
})
export class AddProdutoPageModule { }
