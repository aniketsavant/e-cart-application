import { Component, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';

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

  constructor() {}

  ngOnInit(): void {
    this.availableStatus = this.availableSwitchValue
      ? 'Available'
      : 'Not Available';
  }

  public onAvailableCheckboxChange(event): void {
    this.availableStatus = this.availableSwitchValue
      ? 'Available'
      : 'Not Available';
    console.log(event);
    console.log(this.availableSwitchValue);
  }

  public onProductEditClick(): void {
    this.isEdit = true;
  }

  public closeFormCheck(value: boolean): void {
    this.isEdit = !value;
    console.log(value);
  }
}
