import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  id: number;
  name: string;
  progress: number;
  color: string;
  action: string;
}

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }],
})
export class OrderListComponent implements OnInit {
  columnsToDisplay: string[] = [
    'index',
    'product_id',
    'full_name',
    'phone',
    'full_address',
    'total_amount',
    'order_date',
    'status',
    'orderList',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  expandedElement: PeriodicElement | null;
  @ViewChild('openModelForOrderLimit')
  public openModelForOrderLimit: ModalDirective;
  @ViewChild('showOrderList')
  public showOrderList: ModalDirective;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public selectedOrder: any;
  public selectedOrderLimit: number;
  public delivery_charges: number;
  constructor(
    public orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllOrderList();
    this.getOrderLimit();
  }

  public getAllOrderList() {
    this.orderService.getAllOrder().subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.toastr.error('Somthing went wrong', 'Oops.!!');
      }
    }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onOrderListClick(selectedOrder): void {
    this.selectedOrder = selectedOrder;
    this.showOrderList.show();
  }

  public changeOrderStatus(order: any, statusValue: string): void {
    const tempPayloadForChangeStatus = {
      status: statusValue,
      id: order.id,
      user_id: order?.Users?.user_id
    };
    this.orderService
      .changeOrderStatus(tempPayloadForChangeStatus)
      .subscribe((res) => {
        if (res.status === 'Ok') {
          this.toastr.success('Status changed successfully', 'Done.!!');
          this.getAllOrderList();
        } else {
          this.toastr.error(res.message, 'Oops..!!');
        }
      }),
      (err) => {
        this.toastr.error('Somthing wrong', 'Oops.!!');
        console.log('Error', err);
      };
  }

  public getOrderLimit(): void {
    this.orderService.getOrderLimit().subscribe((res) => {
      if (res.status === 'Ok') {
        this.selectedOrderLimit = Number(res.data.order_limit_price);
        this.delivery_charges = Number(res.data.delivery_charges);
      } else {
        console.log('Somthing goes wrong..!!');
      }
      this.openModelForOrderLimit.hide();
    }),
      (err) => {
        console.log(err);
      };
  }

  public setOrderLimit(): void {
    const limitPayload = {
      order_limit: this.selectedOrderLimit,
      delivery_charges: this.delivery_charges
    };
    this.orderService.setOrderLimit(limitPayload).subscribe((res) => {
      if (res.status === 'Ok') {
        this.toastr.success('Oreder Limit set.', 'Done.!!');
      } else {
        this.toastr.error('Try agin later', 'Oops..!!');
      }
      this.openModelForOrderLimit.hide();
    }),
      (err) => {
        this.toastr.error('Try agin later', 'Oops..!!');
        console.log(err);
      };
  }

  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(
        `${this.selectedOrder?.Users?.full_name}_${this.selectedOrder?.Users?.phone}_${this.selectedOrder?.order_date}.pdf`
      ); // Generated PDF
    });
  }
}
