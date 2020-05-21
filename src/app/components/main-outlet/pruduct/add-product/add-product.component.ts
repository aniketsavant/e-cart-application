import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { CONSTANT } from '../../../../constants/constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @Input('isEdit') public isEdit: boolean = false;
  @Output('closeForm') public closeForm: EventEmitter<any> = new EventEmitter();
  public setProductValue: any = {
    saveButtonName: '',
    saveButtonClass:'',
    cardHeaderName: ''
  }
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

}
