import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'add-produto',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'add-produto/:id',
    loadChildren: () => import('./pages/add-produto/add-produto.module').then( m => m.AddProdutoPageModule)
  },
  {
    path: 'ver-mais/:tipo',
    loadChildren: () => import('./pages/ver-mais/ver-mais.module').then( m => m.VerMaisPageModule)
  },
  {
    path: 'ver-mais',
    loadChildren: () => import('./pages/ver-mais/ver-mais.module').then( m => m.VerMaisPageModule)
  },
  {
    path: 'produto/:id',
    loadChildren: () => import('./pages/produto/produto.module').then( m => m.ProdutoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
