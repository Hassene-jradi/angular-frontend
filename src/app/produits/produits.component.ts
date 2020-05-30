import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../service/catalogue.service';
import {newArray} from '@angular/compiler/src/util';
import {Product} from '../model/product.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  public produits:any;
  public size : number = 5;
  public currentPage : number = 0;
  public totalPages : number;
  public pages:Array<number>;
  private currentKeyword: string="";
  constructor(private  catalogueService : CatalogueService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetProducts() {
    this.catalogueService.getProducts(this.currentPage, this.size)
      .subscribe(data=>{
        this.produits=data;
        this.totalPages=data["page"].totalPages;
        this.pages=newArray(this.totalPages);
      },err=> {
        console.log(err);
      });
  }

  onPageProduct(i) {

      this.currentPage = i;
      this.chercherProduits();
  }

  onChercher(form : any) {
    this.currentKeyword = form.keyword;
    this.currentPage=0;
    this.chercherProduits();
  }
  chercherProduits() {

      this.catalogueService.getProductsByKeyword(this.currentKeyword, this.currentPage,this.size)
      .subscribe(data=> {
        this.produits=data;
        this.totalPages=data["page"].totalPages;
        this.pages=newArray(this.totalPages);
      }, err=>{
        console.log(err);
      })
  }

  onDeleteProduct(p) {
    let conf = confirm("Etes vous sûr de vouloir supprimer le produit : " + p.designation);
    if (conf) {

      this.catalogueService.deleteResource(p._links.self.href)
        .subscribe(data => {
          this.chercherProduits();
        }, err => {
          console.log(err);
        });
  }
  }

  onEditProduct(p) {
    let url = p._links.self.href;
    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }
}
