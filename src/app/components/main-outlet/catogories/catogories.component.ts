import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { CONSTANT } from '../../../constants/constants';
import { ModelValue, GetCategoryList, Category} from '../../../interfaces/iCategory';

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

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.addMainCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryDiscription: [''],
      categoryImage: ['', Validators.required],
      categoryImageFileSource: [''],
    });
    this.addSubCategoryForm = this.formBuilder.group({
      selectedcategoryId: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      subCategoryDiscription: [''],
      subCategoryImage: ['', Validators.required],
      subCategoryImageFileSource: [''],
    });
    this.getCategoryList();
  }

  private getCategoryList(): void {
    this.categoryService.getAllCategoryListCall().subscribe((res: GetCategoryList) => {
      console.log(res);
      if(res.status == 'Ok'){
        this.allCategoryList = res.data;
      } else {
        this.toastr.error('Somthing wrong', 'Oops.!!');
      }
      
    }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
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

  public onEditCategoryClick(): void {
    this.modelValues = CONSTANT.FOR_CATEGORY_EDIT;
    this.modelForAddEditCategory.show();
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
    console.log(this.createFormData().get('files'));
    const temp = {
      category_name: 'asgdj',
      description: "kashdkjhas",
      files:"maasjd"
    }
    this.categoryService
      .createCategoryCall(this.createFormData())
      .subscribe((res) => {
        console.log(res);
        this.onMainCategoryCloseClick();
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }

  public onAddEditSubCategoryClick(): void {
    console.log(this.addSubCategoryForm.value);
    this.categoryService
      .createSubCaegoryCall(this.createFormData())
      .subscribe((res) => {
        console.log(res);
        this.onSubCategoryCloseClick();
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
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
        this.addMainCategoryForm.patchValue({
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
      formData.append(
        'files',
        this.addMainCategoryForm.controls['categoryImage'].value
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
        this.addMainCategoryForm.controls['subCategoryImageFileSource'].value
      );
      formData.append(
        'subcategory_name',
        this.addMainCategoryForm.controls['subCategoryName'].value
      );
      formData.append(
        'description',
        this.addMainCategoryForm.controls['subCategoryDiscription'].value
      );
      formData.append(
        'category_id',
        this.addMainCategoryForm.controls['selectedcategoryId'].value
      );
    }
    return formData;
  }
}
