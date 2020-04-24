import { Component, OnInit } from '@angular/core';
import { SorlingasService } from '../../_services/sorlingas.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name="brett"
  products
  
  constructor(private sorlingasSvc: SorlingasService) { 
    this.products = sorlingasSvc.items
  }
  share() {
    window.alert('The product has been shared!');
  }

  ngOnInit() {
  }

}
