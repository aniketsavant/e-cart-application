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

  public onAvailableCheckboxChange(productValue, i): void {
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
          this.allProductList[i].status =
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
    this.productService.saveProductDetails(productData);
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
        if (res[0].status !== 'error') this.allProductList = res;
        else
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
    this.allSubCategoryList =
      idx === '0'
        ? []
        : this.allCategoryList.filter((x) => x.category_id === idx)[0]
            ?.subcategory;
    if (this.allSubCategoryList.length == 1) {
      this.getAllProducts(this.allSubCategoryList[0].subcategory_id);
    }
  }

  onProductDeleteClick(product) {
    if (confirm('Are you sure to delete ' + product.product_name)) {
      const tempForProductId = {
        product_id: product.product_id,
      };
      this.productService.deleteProduct(tempForProductId).subscribe((res) => {
        if (res.status === 'Ok') {
          this.toastr.success('Product deleted successfully', 'Done.!!');
          this.allProductList = this.allProductList.filter(
            ({ product_id }) => product_id !== product.product_id
          );
        } else {
          this.toastr.error('try again lalter', 'Oops.!!');
        }
      }),
        (err) => {
          this.toastr.error('Somthing went wrong', 'Oops.!!');
        };
    }
  }
}
