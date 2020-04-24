import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SorlingasService {
  items = ["guy","78"];

  constructor() { }

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
