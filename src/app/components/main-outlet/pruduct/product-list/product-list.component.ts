import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  public availableStatus: string;
  public availableSwitchValue: boolean = true;
  public isEdit: boolean = false;
  filterProductForm: FormGroup;
  allCategoryList: any;
  allSubCategoryList: any;
  allProductList: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.availableStatus = this.availableSwitchValue
      ? 'Available'
      : 'Not Available';

    this.getAllCategory();
    this.getAllProducts('39');
  }

  filterProductFormInitialized() {
    this.filterProductForm = this.formBuilder.group({
      category_id: [this.allCategoryList[0].category_id, Validators.required],
      subcategory_id: [
        this.allSubCategoryList[0].subcategory_id,
        Validators.required,
      ],
    });
  }
  getAllCategory() {
    this.categoryService.getAllCategoryListCall().subscribe((res) => {
      if (res.status === 'Ok') {
        this.allCategoryList = res.data;
        this.allSubCategoryList = this.allCategoryList[0].subcategory;
        this.filterProductFormInitialized();
      } else {
        this.toastr.error('Something wrong', 'Oops.!!');
      }
    }),
      (err) => {
        this.toastr.error('Something wrong', 'Oops.!!');
      };
  }

  public onAvailableCheckboxChange(event): void {
    this.availableStatus = this.availableSwitchValue
      ? 'Available'
      : 'Not Available';
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
    const formData = new FormData();
    formData.append('subcategory_id', subcategory_id);
    this.productService.getAllProductsCall(formData).subscribe((res) => {
      this.allProductList = res;

      // if (res.status === 'Ok') {
      //   this.allProductList = res.data;
      // } else {
      //   this.toastr.error('Something wrong3344', 'Oops.!!');
      // }
    }),
      (err) => {
        this.toastr.error('Something wrong', 'Oops.!!');
      };
  }

  onCategoryChange(idx) {
    this.allSubCategoryList = this.allCategoryList.filter(
      (x) => x.category_id === idx
    )[0]?.subcategory;
  }

  onProductDeleteClick() {}
}
