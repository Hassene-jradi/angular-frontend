import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../service/catalogue.service';
import {Route, Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public currentProduct: Product;
  public mode: number=1;

  constructor(private catalogueService:CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onSaveProduct(value: any) {
    this.catalogueService.saveResource(this.catalogueService.host+"/produits", value)
      .subscribe(res=>{
        console.log(res);
        //this.router.navigateByUrl("/products");
        this.currentProduct=res;
        this.mode=2;
      },err=>{
        console.log(err);
      })
  }

  onNewProduct() {
    this.mode = 1;
  }
}
