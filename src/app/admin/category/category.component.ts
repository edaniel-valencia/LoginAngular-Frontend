import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listCategory: Category[] = []
  Pid: number = 0;
  Cname: string = '';
  Cdescription: string = '';
  CategoryId: number = 0;


  loading: boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.readCategory()

  }

  readCategory() {
    this._categoryService.readCategory().subscribe(data => {
      console.log(data);
      
      this.listCategory = data
    })
  }

  createCategory() {

    if (this.Cname == '' || this.Cdescription == '') {
      this.toastr.error('Todos los campos son obligatorios!', 'Error');
      return
    }

    const category: Category = {
      Cname: this.Cname,
      Cdescription: this.Cdescription,
    }

    this.loading = true

    this._categoryService.createCategory(category).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Category ${this.Cname} fue registrado exitosamente", "Categoria Registrado`)
        this.router.navigate(['/dashboard/category/listCategory'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => console.info('complete')
    })
  }


  updateCategory(categoryId: number,) {

    if (this.Cname == '') {
      this.toastr.error('Llena el nombre ', 'Error');
      return
    }

    const category: Category = {
      Cid: categoryId,
      Cname: this.Cname,
      Cdescription: this.Cdescription
    }

    this.loading = true

    this._categoryService.updateCategory(category).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Category ${this.Cname} fue registrado actualizado", "Category Registrado`)
        this.router.navigate(['/dashboard/category/listCategory'])

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => {
        this.readCategory(),
          console.info('complete')
      }
    })
  }

  deleteCategory(categoryId: number) {

    const category: Category = {
      Cid: categoryId
    }

    this.loading = true

    this._categoryService.deleteCategory(category).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Categoria ${this.Cname} fue eliminado exitosamente", "Categoria Eliminado`)
        this.router.navigate(['/dashboard/category/listCategory'])
        this.readCategory()

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => {
        this.loading = false
        console.info('complete')
      }
    })
  }
}
