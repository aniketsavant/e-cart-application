import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { OrderService } from '../../../services/order.service';
import { ToastrService } from 'ngx-toastr';

 const tableDataC : any =   [
  {id: 1, name: 'Hydrogen', progress: 1.0079, color: 'H', action:'dispachted'},
  {id: 2, name: 'Helium', progress: 4.0026, color: 'He', action:'dispachted'},
  {id: 3, name: 'Lithium', progress: 6.941, color: 'Li', action:'dispachted'},
  {id: 4, name: 'Beryllium', progress: 9.0122, color: 'Be', action:'dispachted'},
  {id: 5, name: 'Boron', progress: 10.811, color: 'B', action:'dispachted'},
  {id: 6, name: 'Carbon', progress: 12.0107, color: 'C', action:'dispachted'},
  {id: 7, name: 'Nitrogen', progress: 14.0067, color: 'N', action:'dispachted' }, 
  {id: 8, name: 'Oxygen', progress: 15.9994, color: 'O', action:'dispachted'},
  {id: 9, name: 'Fluorine', progress: 18.9984, color: 'F', action:'dispachted'},
  {id: 10, name: 'Neon', progress: 20.1797, color: 'Ne', action:'dispachted'},
  {id: 1, name: 'Hydrogen', progress: 1.0079, color: 'H', action:'dispachted'},
  {id: 2, name: 'Helium', progress: 4.0026, color: 'He', action:'dispachted'},
  {id: 3, name: 'Lithium', progress: 6.941, color: 'Li', action:'dispachted'},
  {id: 4, name: 'Beryllium', progress: 9.0122, color: 'Be', action:'dispachted'},
  {id: 5, name: 'Boron', progress: 10.811, color: 'B', action:'dispachted'},
  {id: 6, name: 'Carbon', progress: 12.0107, color: 'C', action:'dispachted'},
  {id: 7, name: 'Nitrogen', progress: 14.0067, color: 'N', action:'dispachted'},
  {id: 8, name: 'Oxygen', progress: 15.9994, color: 'O', action:'dispachted'},
  {id: 9, name: 'Fluorine', progress: 18.9984, color: 'F', action:'dispachted'},
  {id: 10, name: 'Neon', progress: 20.1797, color: 'Ne', action:'dispachted'},
  {id: 1, name: 'Hydrogen', progress: 1.0079, color: 'H', action:'dispachted'},
  {id: 2, name: 'Helium', progress: 4.0026, color: 'He', action:'dispachted'},
  {id: 3, name: 'Lithium', progress: 6.941, color: 'Li', action:'dispachted'},
  {id: 4, name: 'Beryllium', progress: 9.0122, color: 'Be', action:'dispachted'},
  {id: 5, name: 'Boron', progress: 10.811, color: 'B', action:'dispachted'},
  {id: 6, name: 'Carbon', progress: 12.0107, color: 'C', action:'dispachted'},
  {id: 7, name: 'Nitrogen', progress: 14.0067, color: 'N', action:'dispachted'},
  {id: 8, name: 'Oxygen', progress: 15.9994, color: 'O', action:'dispachted'},
  {id: 9, name: 'Fluorine', progress: 18.9984, color: 'F', action:'dispachted'},
  {id: 10, name: 'Neon', progress: 20.1797, color: 'Ne', action:'dispachted'},
];

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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class OrderListComponent implements OnInit {

  columnsToDisplay : string[] = ['id', 'name', 'progress', 'color', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(tableDataC);
  expandedElement: PeriodicElement | null;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public orderService: OrderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllOrderList();
  }

  public getAllOrderList(){
    this.orderService.getAllOrder().subscribe(res=>{
      if(res){
        console.log(res);
      }else{
        this.toastr.error('Somthing went wrong','Oops.!!');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}