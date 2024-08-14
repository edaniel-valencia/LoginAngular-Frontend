import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _productService: ProductService){}

  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this._productService.getProducts().subscribe(data =>{
      console.log(data);
      
    })
  }
}
