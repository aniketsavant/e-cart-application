import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';

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

  @ViewChild('showOrderList')
  public showOrderList: ModalDirective;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public selectedOrderList: any;

  constructor(
    public orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllOrderList();
  }

  public getAllOrderList() {
    this.orderService.getAllOrder().subscribe((res) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
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
    this.selectedOrderList = selectedOrder.orderList;
    console.log(this.selectedOrderList);
    this.showOrderList.show();
  }

  public changeOrderStatus(orderId: string, statusValue: string): void {
    const tempPayloadForChangeStatus = {
      status: statusValue,
      id: orderId,
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
}
