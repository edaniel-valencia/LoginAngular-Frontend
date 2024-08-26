import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ErrorService } from 'src/app/services/error.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProduct: Product[] = []
  Pid?: number ;
  Pname: string = '';
  Pdescription: string = '';
  CategoryId: number = 0;
  
  PUid?: number ;
  PUname: string = '';
  PUdescription: string = '';
  UCategoryId: number = 0;

  loading: boolean = false;

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getProducts()

  }
  getProducts() {
    this._productService.getProducts().subscribe(data => {
      console.log(data);
      this.listProduct = data
    })
  }

  addProduct() {

    if (this.Pname == '' || this.Pdescription == '') {
      this.toastr.error('Todos los campos son obligatorios!', 'Error');
      return
    }

    const product: Product = {
      Pname: this.Pname,
      Pdescription: this.Pdescription,
      CategoryId: this.CategoryId
    }
    this.loading = true

    this._productService.register(product).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Producto ${this.Pname} fue registrado exitosamente", "Usuario Registrado`)
        this.router.navigate(['/dashboard/product/products'])
        this.getProducts()
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => console.info('complete')
    })
  }


  openModal(modalId: string, productId?: number) {
    if (productId !== undefined) {
      const modalElement = document.getElementById(`${modalId}-${productId}`);
      if (modalElement) {
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
      }
    } else {
      console.error('Product ID is undefined');
    }
  }
  
  updateProduct(productId: number) {
    console.log(this.PUname);
    

    if ( this.Pname == '' ) {
      this.toastr.error('Llena el nombre ', 'Error');
      return
    }

    
    const product: Product = {
      Pid: productId,
      Pname: this.Pname,
      Pdescription: this.Pdescription,
      CategoryId: this.CategoryId
    }

   
    this.loading = true

    this._productService.update(product).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Producto ${this.Pname} fue registrado actualizado", "Usuario Registrado`)
        this.router.navigate(['/dashboard/product/products'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => console.info('complete')
    })

  }
}
