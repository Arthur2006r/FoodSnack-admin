import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor() { }

  salvar(produto: Produto): Produto {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    if (produto.id === 0) {
      produto.id = (new Date().getTime() / 1000) * Math.random();
      produtos.push(produto);
    } else {
      let posicao = produtos.findIndex((temp: Produto) => temp.id === produto.id);
      produtos[posicao] = produto;
    }
    localStorage.setItem('produtos', JSON.stringify(produtos));
    return produto;
  }

  listar(): Produto[] {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    return produtos;
  }

  buscarPorId(id: number): Produto {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    let produto = new Produto();
    produto = produtos.find((temp: Produto) => temp.id === id);
    return produto;
  }

  excluir(id: number): Produto[] {
    let produtos = JSON.parse(localStorage.getItem('produtos') || '[]');
    produtos = produtos.filter((temp: Produto) => temp.id !== id);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    return produtos;
  }

  listarPorTipo(tipo: string): Produto[] {
    let produtos: Produto[] = JSON.parse(localStorage.getItem('produtos') || '[]');
    let produtosFiltrados: Produto[] = produtos.filter((produto: Produto) => produto.tipo === tipo);
    return produtosFiltrados;
  }

}
