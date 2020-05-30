import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONSTANT } from '../../../../constants/constants';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './../../../../services/product.service';

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
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productCategory: ['', Validators.required],
      productSubCategory: ['', Validators.required],
      productName: ['', Validators.required],
      productQuantity: ['', Validators.required],
      productUnit: ['', Validators.required],
      offerName: ['', Validators.required],
      offerProductQuantity: ['', Validators.required],
      offerProductUnit: ['', Validators.required],
      productPrice: ['', Validators.required],
      discountRate: ['', Validators.required],
      discountRateUnit: ['', Validators.required],
      discountPrice: ['', Validators.required],
      image: ['', Validators.required],
      offerList: [''],
    });

    this.setProductValue = this.isEdit
      ? CONSTANT.FOR_PRODUCT_EDIT
      : CONSTANT.FOR_PRODUCT_SAVE;
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
    }
    console.log(this.productForm.controls.value);
  }

  public onImagechange(event): void {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        var mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
          alert('Only images are supported.');
          return;
        } else {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  public onAddOffer() {
    if (
      this.productForm.controls['offerName'].valid &&
      this.productForm.controls['offerProductQuantity'].valid &&
      this.productForm.controls['productPrice'].valid &&
      this.productForm.controls['discountRate'].valid &&
      this.productForm.controls['discountPrice'].valid &&
      this.productForm.controls['offerProductUnit'].valid &&
      this.productForm.controls['discountRateUnit'].valid
    ) {
      this.offerList.push(this.productForm.value);
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
}
