import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANT } from '../../../../constants/constants';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../../../../services/product.service';
import { CategoryService } from './../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }],
})
export class AddProductComponent implements OnInit {
  @Input('isEdit') public isEdit: boolean = false;
  @Output('closeForm') public closeForm: EventEmitter<any> = new EventEmitter();
  public setProductValue: any = {
    saveButtonName: '',
    saveButtonClass: '',
    cardHeaderName: '',
  };
  public urls = new Array<string>();
  public productForm: FormGroup;
  public offerList = [];
  allCategoryList: any;
  allSubCategoryList: any;
  productQtyUnit = CONSTANT.FOR_PRODUCT_UNIT;
  discountRateUnit = CONSTANT.FOR_DISCOUNT_UNIT;
  public files: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productCategory: ['', Validators.required],
      productSubCategory: ['', Validators.required],
      productName: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productDescription: [''],
      productUnit: ['', Validators.required],
      offerName: [''],
      offerProductQuantity: ['', Validators.required],
      offerProductUnit: ['', Validators.required],
      productPrice: ['', Validators.required],
      discountRate: [''],
      discountRateUnit: [''],
      discountPrice: [{ value: '', disabled: true }],
      image: ['', Validators.required],
      offerList: [''],
    });

    this.setProductValue = this.isEdit
      ? CONSTANT.FOR_PRODUCT_EDIT
      : CONSTANT.FOR_PRODUCT_SAVE;

    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAllCategoryListCall().subscribe((res) => {
      if (res.status === 'Ok') {
        this.allCategoryList = res.data;
      } else {
        this.toastr.error('Somthing wrong', 'Oops.!!');
      }
    }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
      };
  }
  get f() {
    return this.productForm.controls;
  }
  public onCloseClick(): void {
    if (this.isEdit) {
      this.closeForm.emit(true);
    }
  }

  public onSaveChangesClick(): void {
    if (this.isEdit) {
      this.closeForm.emit(true);
    } else {
      this.productService
        .addProductCall(this.createAddProductPayload())
        .subscribe(
          (res) => {
            if (res.status === 'Ok') {
              let formData = new FormData();
              formData.append(
                'files',
                this.files,
                +new Date() + '.' + this.files.name.split('.')[1]
              );
              formData.append('product_id', res.Id);
              this.productService.uploadImageCall(formData).subscribe(
                (res) => {
                  this.productForm.reset();
                },
                (err) => {
                  this.toastr.error('Something wrong', 'Oops.!!');
                }
              );
            } else {
              this.toastr.error('Something wrong', 'Oops.!!');
            }
          },
          (err) => {
            this.toastr.error('Something wrong', 'Oops.!!');
          }
        );
    }
  }

  // public onImagechange(event): void {
  //   this.urls = [];
  //   let files = event.target.files;
  //   this.arrFiles = [];
  //   if (files) {
  //     for (let file of files) {
  //       var mimeType = file.type;
  //       if (mimeType.match(/image\/*/) == null) {
  //         alert('Only images are supported.');
  //         return;
  //       } else {
  //         this.arrFiles.push(file);
  //         let reader = new FileReader();
  //         reader.onload = (e: any) => {
  //           this.urls.push(e.target.result);
  //         };
  //         reader.readAsDataURL(file);
  //       }
  //     }
  //   }
  // }

  public onImagechange(event): void {
    this.urls = [];
    let file = event.target.files[0];
    if (file) {
      var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');
        return;
      } else {
        this.files = file;
        console.log(this.files);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public onAddOffer() {
    if (
      this.productForm.controls['offerProductQuantity'].valid &&
      this.productForm.controls['productPrice'].valid &&
      this.productForm.controls['offerProductUnit'].valid
    ) {
      let objOffer = {
        offer_name: this.productForm.get('offerName').value,
        item_quantity: this.productForm.get('offerProductQuantity').value,
        item_unit: this.productForm.get('offerProductUnit').value,
        // productPrice: this.productForm.get('productPrice').value,
        // discountRate: this.productForm.get('discountRate').value,
        // discountRateUnit: this.productForm.get('discountRateUnit').value,
        item_discount_price: this.productForm.get('discountPrice').value,
        item_discount_unit: this.productForm.get('discountRateUnit').value,
        item_discount_percent: '',
        item_discount_rupee: '',
      };
      if (this.productForm.get('discountRateUnit').value === 'Percentage') {
        objOffer.item_discount_percent = this.productForm.get(
          'discountRate'
        ).value;
        objOffer.item_discount_rupee = '';
      } else {
        objOffer.item_discount_percent = '';
        objOffer.item_discount_rupee = this.productForm.get(
          'discountRate'
        ).value;
      }
      this.offerList.push(objOffer);
    }
    [
      'offerName',
      'offerProductQuantity',
      'productPrice',
      'discountRate',
      'discountPrice',
    ].map((item) => {
      this.productForm.controls[item].reset();
    });
    this.productForm.controls['offerProductUnit'].patchValue('');
    this.productForm.controls['discountRateUnit'].patchValue('');
    this.productForm.controls['offerProductUnit'].clearValidators();
    this.productForm.controls['discountRateUnit'].clearValidators();
    this.productForm.controls['offerProductUnit'].updateValueAndValidity();
    this.productForm.controls['discountRateUnit'].updateValueAndValidity();
    this.productForm.controls['offerList'].patchValue(this.offerList);
  }

  public onRemoveOffer(idx) {
    this.offerList.splice(idx, 1);
    this.productForm.controls['offerList'].patchValue(this.offerList);
  }

  onCategoryChange(idex) {
    this.allSubCategoryList = this.allCategoryList[idex]?.subcategory;
  }

  public createAddProductPayload() {
    let params = {
      product_name: this.productForm.get('productName').value,
      subcategory_id: this.productForm.get('productSubCategory').value,
      product_description: this.productForm.get('productDescription').value,
      product_total_quantity: this.productForm.get('productQuantity').value,
      product_total_quantity_unit: this.productForm.get('productUnit').value,
      productSales: this.offerList,
    };
    return params;
  }
}
