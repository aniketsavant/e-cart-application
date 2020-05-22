import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { CONSTANT } from '../../../../constants/constants';
import { AlertConfig } from 'ngx-bootstrap/alert';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class AddProductComponent implements OnInit {

  @Input('isEdit') public isEdit: boolean = false;
  @Output('closeForm') public closeForm: EventEmitter<any> = new EventEmitter();
  public setProductValue: any = {
    saveButtonName: '',
    saveButtonClass:'',
    cardHeaderName: ''
  }
  public urls = new Array<string>();
  constructor() { }

  ngOnInit(): void {
    this.setProductValue = this.isEdit ? CONSTANT.FOR_PRODUCT_EDIT : CONSTANT.FOR_PRODUCT_SAVE;
  }

  public onCloseClick(): void {
    if(this.isEdit) {
      this.closeForm.emit(true);
    }
  }

  public onSaveChangesClick(): void {
    if(this.isEdit) {
      this.closeForm.emit(true);
    }
  }

  public onImagechange(event): void {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        var mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Only images are supported.");
        return;
      } else {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
        
      }
    }
  }
}
