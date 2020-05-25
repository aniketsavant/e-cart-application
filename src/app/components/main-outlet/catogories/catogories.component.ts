import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CONSTANT } from '../../../constants/constants';
import { ModelValue } from '../../../interfaces/iCategory';

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
  public modelValues: ModelValue = {
    modelClass: '',
    modelTitle: '',
    saveButtonName: '',
    saveButtonClass: '',
    name: '',
    discription: '',
  };
  public isSubCategoryForm: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onAddCategoryClick(): void {
    this.modelValues = CONSTANT.FOR_CATEGORY_SAVE;
    this.modelForAddEditCategory.show();
  }

  public onAddSubCategoryClick(): void {
    this.isSubCategoryForm = true;
    this.modelValues = CONSTANT.FOR_SUB_CATEGORY_SAVE;
    this.modelForAddEditCategory.show();
  }

  public onEditCategoryClick(): void {
    this.modelValues = CONSTANT.FOR_CATEGORY_EDIT;
    this.modelForAddEditCategory.show();
  }
}
