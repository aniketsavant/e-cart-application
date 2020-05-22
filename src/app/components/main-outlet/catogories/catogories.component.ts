import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CONSTANT } from '../../../constants/constants';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

export interface ModelValue {
  modelClass: string,
  modelTitle: string,
  saveButtonName: string,
  saveButtonClass: string
}

@Component({
  selector: 'app-catogories',
  templateUrl: './catogories.component.html',
  styleUrls: ['./catogories.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class CatogoriesComponent implements OnInit {

  @ViewChild('modelForAddEditCategory') public modelForAddEditCategory: ModalDirective;
  public modelValues: ModelValue = {
    modelClass: '',
    modelTitle: '',
    saveButtonName: '',
    saveButtonClass:''
  }
  public isSubCategoryForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onAddCategoryClick(): void {
    this.modelValues = CONSTANT.FOR_CATEGORY_SAVE;
    this.modelForAddEditCategory.show();
  }

  public onAddSubCategoryClick(): void {
    this.isSubCategoryForm = true;
  }

  public onEditCategoryClick(): void{
    this.modelValues = CONSTANT.FOR_CATEGORY_EDIT;
    this.modelForAddEditCategory.show();
  }

}
