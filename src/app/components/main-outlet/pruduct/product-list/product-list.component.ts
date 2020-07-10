import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }],
})
export class ProductListComponent implements OnInit {
  public isEdit: boolean = false;
  public allCategoryList: any = [];
  public allSubCategoryList: any = [];
  public allProductList: any = [];
  public filteredAllProductList: any = [];
  public selectedProductDataForEdit: any;
  public searchValue: string = '';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategoryListCall().subscribe((res) => {
      if (res.status === 'Ok') {
        this.allCategoryList = res.data;
      } else {
        this.toastr.error('Something wrong', 'Oops.!!');
      }
    }),
      (err) => {
        this.toastr.error('Something wrong', 'Oops.!!');
      };
  }

  public onAvailableCheckboxChange(productValue): void {
    const index = this.allProductList.findIndex(
      (x) => x.product_id === productValue.product_id
    );
    const tempPayloadForChangeOrderStatus = {
      product_id: productValue.product_id,
      status: productValue.status === '1' ? '0' : '1',
    };
    this.productService
      .changeProductStatus(tempPayloadForChangeOrderStatus)
      .subscribe((res) => {
        if (res.status === 'Ok') {
          this.toastr.success(
            'Status changed for ' + productValue.product_name,
            'Done.!!'
          );
          this.allProductList[index].status =
            productValue.status === '1' ? '0' : '1';
        } else {
          this.toastr.error('Try again later', 'Oops.!!');
        }
      }),
      (err) => {
        this.toastr.error('Something went wrong.', 'Oops.!!');
      };
  }

  public onProductEditClick(productData): void {
    this.isEdit = true;
    this.allProductList = [];
    this.assignProductListCopy();
    this.selectedProductDataForEdit = productData;
  }

  public closeFormCheck(value: boolean): void {
    this.isEdit = !value;
    console.log(value);
  }

  public getAllProducts(subcategory_id) {
    if (subcategory_id !== '0') {
      const formData = new FormData();
      formData.append('subcategory_id', subcategory_id);
      this.productService.getAllProductsCall(formData).subscribe((res) => {
        if (res[0].status !== 'error') {
          this.allProductList = res;
          this.assignProductListCopy();
        } else
          this.toastr.error(
            'Product not available for this categrory',
            'Oops..!!'
          );
      }),
        (err) => {
          this.toastr.error('Something wrong', 'Oops.!!');
        };
    }
  }

  onCategoryChange(idx) {
    this.allProductList = [];
    this.assignProductListCopy();
    const tempArray =
      idx === '0'
        ? []
        : this.allCategoryList.filter((x) => x.category_id === idx)[0]
            ?.subcategory;
    const index = this.allCategoryList.findIndex(
      (cat) => cat.category_id === idx
    );

    const tempArrayForAllSubCat = tempArray.filter(
      ({ subcategory_name }) =>
        subcategory_name.toLowerCase() !==
        this.allCategoryList[index]?.category_name.toLowerCase()
    );
    this.allSubCategoryList = tempArrayForAllSubCat;
    const indexForSubCat = tempArray.findIndex(
      (subCat) =>
        subCat.subcategory_name.toLowerCase() ===
        this.allCategoryList[index]?.category_name.toLowerCase()
    );
    if (this.allSubCategoryList.length == 0) {
      this.getAllProducts(tempArray[indexForSubCat].subcategory_id);
    }
  }

  onProductDeleteClick(product) {
    if (
      confirm(
        'No longer available for customer, are you sure to delete -' +
          product.product_name
      )
    ) {
      const tempForProductId = {
        product_id: product.product_id,
      };
      this.productService.deleteProduct(tempForProductId).subscribe((res) => {
        if (res.status === 'Ok') {
          this.toastr.success('Product deleted successfully', 'Done.!!');
          this.allProductList = this.allProductList.filter(
            ({ product_id }) => product_id !== product.product_id
          );
          this.assignProductListCopy();
        } else {
          this.toastr.error('try again lalter', 'Oops.!!');
        }
      }),
        (err) => {
          this.toastr.error('Somthing went wrong', 'Oops.!!');
        };
    }
  }

  public applyFilter(value: string): void {
    if (!value) {
      this.assignProductListCopy();
    }
    this.filteredAllProductList = Object.assign([], this.allProductList).filter(
      (item) =>
        item.product_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  assignProductListCopy(): void {
    this.filteredAllProductList = Object.assign([], this.allProductList);
  }
}
