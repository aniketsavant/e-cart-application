import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

import { CategoryService } from '../../../services/category.service';
import { CONSTANT } from '../../../constants/constants';
import {
  ModelValue,
  GetCategoryList,
  Category,
  SubCategory,
} from '../../../interfaces/iCategory';
import { element } from 'protractor';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-catogories',
  templateUrl: './catogories.component.html',
  styleUrls: ['./catogories.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }],
})
export class CatogoriesComponent implements OnInit {
  @ViewChild('modelForAddEditCategory')
  public modelForAddEditCategory: ModalDirective;
  @ViewChild('modelForAddEditSubCategory')
  public modelForAddEditSubCategory: ModalDirective;
  public modelValues: ModelValue = {
    modelClass: '',
    modelTitle: '',
    saveButtonName: '',
    saveButtonClass: '',
    name: '',
    discription: '',
  };
  public isSubCategoryForm: boolean = false;
  public addMainCategoryForm: FormGroup;
  public addSubCategoryForm: FormGroup;
  public allCategoryList: Category[] = [];
  public isSubCategoryShow = false;
  public arrSubCategoryList: SubCategory[];
  public editMainCategory: any;
  public isEditForm = false;
  public subCategoryList: any;
  public selectedCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // this.ngxLoader.start();
    this.addMainCategoryForm = this.formBuilder.group({
      categoryId: [''],
      categoryName: ['', Validators.required],
      categoryDiscription: [''],
      categoryImage: ['', Validators.required],
      categoryImageFileSource: [''],
    });
    this.addSubCategoryForm = this.formBuilder.group({
      subCategoryId: [''],
      selectedcategoryId: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      subCategoryDiscription: [''],
      subCategoryImage: ['', Validators.required],
      subCategoryImageFileSource: [''],
    });
    this.getCategoryList();
  }

  private getCategoryList(): void {
    this.categoryService
      .getAllCategoryListCall()
      .subscribe((res: GetCategoryList) => {
        if (res.status === 'Ok') {
          this.allCategoryList = res.data;
          this.ngxLoader.stop();
        } else {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          this.ngxLoader.stop();
        }
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
        this.ngxLoader.stop();
      };
  }

  public onAddCategoryClick(): void {
    this.modelValues = CONSTANT.FOR_CATEGORY_SAVE;
    this.modelForAddEditCategory.show();
  }

  public onAddSubCategoryClick(): void {
    this.isSubCategoryForm = true;
    this.modelValues = CONSTANT.FOR_SUB_CATEGORY_SAVE;
    this.modelForAddEditSubCategory.show();
  }

  public onEditCategoryClick(objCategory): void {
    this.isEditForm = true;
    this.modelValues = CONSTANT.FOR_CATEGORY_EDIT;
    this.addMainCategoryForm
      .get('categoryId')
      .patchValue(objCategory.category_id);
    this.addMainCategoryForm
      .get('categoryName')
      .patchValue(objCategory.category_name);
    this.addMainCategoryForm
      .get('categoryDiscription')
      .patchValue(objCategory.category_description);
    this.addMainCategoryForm.controls['categoryName'].updateValueAndValidity();
    this.addMainCategoryForm.controls[
      'categoryDiscription'
    ].updateValueAndValidity();

    this.modelForAddEditCategory.show();
  }

  public onEditSubCategoryClick(objCategory, categoryId): void {
    console.log(objCategory, categoryId);
    this.isEditForm = true;
    this.modelValues = CONSTANT.FOR_SUB_CATEGORY_EDIT;
    this.addSubCategoryForm.get('selectedcategoryId').patchValue(categoryId);
    this.addSubCategoryForm
      .get('subCategoryId')
      .patchValue(objCategory.subcategory_id);
    this.addSubCategoryForm
      .get('subCategoryName')
      .patchValue(objCategory.subcategory_name);
    this.addSubCategoryForm
      .get('subCategoryDiscription')
      .patchValue(objCategory.subcategory_description);
    this.addSubCategoryForm.controls[
      'subCategoryName'
    ].updateValueAndValidity();
    this.addSubCategoryForm.controls[
      'subCategoryDiscription'
    ].updateValueAndValidity();

    this.modelForAddEditSubCategory.show();
  }

  public onMainCategoryCloseClick(): void {
    this.modelForAddEditCategory.hide();
    this.addMainCategoryForm.reset();
  }

  public onSubCategoryCloseClick(): void {
    this.modelForAddEditSubCategory.hide();
    this.addSubCategoryForm.reset();
  }

  public onAddEditMainCategoryClick(): void {
    // this.ngxLoader.start();
    if (this.isEditForm) {
      this.categoryService
        .editCategoryCall(this.createFormData())
        .subscribe((res) => {
          if (res.status !== 'error') {
            this.toastr.success('Category edited successfully.', 'Done.!!');
            this.getCategoryList();
            this.onMainCategoryCloseClick();
            // this.ngxLoader.stop();
          } else {
            this.toastr.error(res.message, 'Oops.!!');
            // this.ngxLoader.stop();
          }
        }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          // this.ngxLoader.stop();
        };
    } else {
      this.categoryService
        .createCategoryCall(this.createFormData())
        .subscribe((res) => {
          if (res.status !== 'error') {
            this.toastr.success('Category added successfully.', 'Done.!!');
            this.getCategoryList();
            this.onMainCategoryCloseClick();
            this.ngxLoader.stop();
          } else {
            this.toastr.error(res.message, 'Oops.!!');
            this.ngxLoader.stop();
          }
        }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          this.ngxLoader.stop();
        };
    }
  }

  public onAddEditSubCategoryClick(): void {
    this.ngxLoader.start();
    if (this.isEditForm) {
      this.categoryService
        .editSubCategoryCall(this.createFormData())
        .subscribe((res) => {
          if (res.status !== 'error') {
            this.toastr.success('Sub category edited successfully.', 'Done.!!');
            this.getCategoryList();
            this.onSubCategoryCloseClick();
            this.ngxLoader.stop();
          } else {
            this.toastr.error(res.message, 'Oops.!!');
            this.ngxLoader.stop();
          }
        }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          this.ngxLoader.stop();
        };
    } else {
      this.categoryService
        .createSubCaegoryCall(this.createFormData())
        .subscribe((res) => {
          if (res.status !== 'error') {
            this.toastr.success('Sub category added successfully.', 'Done.!!');
            this.getCategoryList();
            this.onSubCategoryCloseClick();
            this.ngxLoader.stop();
          } else {
            this.toastr.error(res.message, 'Oops.!!');
            this.ngxLoader.stop();
          }
        }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          this.ngxLoader.stop();
        };
    }
  }

  onFileChange(event) {
    if (
      this.addMainCategoryForm.controls['categoryImage'].value !== '' &&
      this.addMainCategoryForm.controls['categoryImage'].value !== null &&
      this.addMainCategoryForm.controls['categoryImage'].value !== undefined
    ) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.addMainCategoryForm.patchValue({
          categoryImageFileSource: file,
        });
      }
    } else {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.addSubCategoryForm.patchValue({
          subCategoryImageFileSource: file,
        });
      }
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    if (
      this.addMainCategoryForm.controls['categoryImage'].value !== '' &&
      this.addMainCategoryForm.controls['categoryImage'].value !== null &&
      this.addMainCategoryForm.controls['categoryImage'].value !== undefined
    ) {
      if (this.isEditForm) {
        formData.append(
          'category_id',
          this.addMainCategoryForm.controls['categoryId'].value
        );
      }

      formData.append(
        'files',
        this.addMainCategoryForm.controls['categoryImageFileSource'].value
      );
      formData.append(
        'category_name',
        this.addMainCategoryForm.controls['categoryName'].value
      );
      formData.append(
        'description',
        this.addMainCategoryForm.controls['categoryDiscription'].value
      );
    } else {
      formData.append(
        'files',
        this.addSubCategoryForm.controls['subCategoryImageFileSource'].value
      );
      formData.append(
        'subcategory_name',
        this.addSubCategoryForm.controls['subCategoryName'].value
      );
      formData.append(
        'description',
        this.addSubCategoryForm.controls['subCategoryDiscription'].value
      );
      formData.append(
        'category_id',
        this.addSubCategoryForm.controls['selectedcategoryId'].value
      );
      if (this.isEditForm) {
        formData.append(
          'subcategory_id',
          this.addSubCategoryForm.controls['subCategoryId'].value
        );
      }
    }
    return formData;
  }

  public onMainCategoryClick(idx) {
    if (this.allCategoryList[idx]?.subcategory.length === 1) {
      this.toastr.error(
        'No sub category available for this category',
        'NO DATA..!!'
      );
    } else {
      this.selectedCategoryId = this.allCategoryList[idx].category_id;
      const tempForsubCatList = this.allCategoryList[idx].subcategory;
      this.subCategoryList = tempForsubCatList.filter(
        ({ status }) => status !== '0'
      );
      this.isSubCategoryShow = true;
    }
  }

  public onDeleteCategoryClick(cat): void {
    if (confirm('Are you sure to delete ' + cat.category_name)) {
      // this.ngxLoader.start();
      let params = { category_id: cat.category_id };
      console.log(params);
      this.categoryService.deleteCategoryCall(params).subscribe((res) => {
        if (res.status == 'Ok') {
          this.allCategoryList = this.allCategoryList.filter(
            ({ category_id }) => category_id !== cat.category_id
          );
          this.toastr.error('Category deleted successfully', 'Done.!!');
          // this.ngxLoader.stop();
        } else {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          // this.ngxLoader.stop();
        }
      }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          // this.ngxLoader.stop();
        };
    }
  }

  public onDeleteSubCategoryClick(subCat): void {
    if (confirm('Are you sure to delete ' + subCat.subcategory_name)) {
      // this.ngxLoader.start();
      let params = { subcategory_id: subCat?.subcategory_id };
      console.log(params);
      this.categoryService.deleteSubCategoryCall(params).subscribe((res) => {
        if (res.status == 'Ok') {
          this.subCategoryList = this.subCategoryList.filter(
            ({ subcategory_id }) => subcategory_id !== subCat?.subcategory_id
          );
          if (this.subCategoryList.length === 0) this.backToCategoryList();
          this.toastr.error('Sub category deleted successfully', 'Done.!!');
          // this.ngxLoader.stop();
        } else {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          // this.ngxLoader.stop();
        }
      }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
          // this.ngxLoader.stop();
        };
    }
  }

  public backToCategoryList() {
    this.isSubCategoryShow = false;
  }

  public applyFilter(filterValue: string): void {
    // const tempArrayForAllCategory = this.allCategoryList;
    // this.allCategoryList = this.allCategoryList.filter(ele=>ele.category_name.includes(filterValue));
  }
}
