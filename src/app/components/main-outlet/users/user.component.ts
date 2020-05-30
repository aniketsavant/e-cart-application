import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { UsersService } from './../../../services/users.service';

const tableDataC: any = [
  {
    id: 1,
    name: 'Jhon',
    phone: 444545353535,
    email: 'jhon@gmail.com',
    action: 'delete',
  },
  {
    id: 2,
    name: 'walker',
    phone: 444545653535,
    email: 'walker@gmail.com',
    action: 'delete',
  },
  {
    id: 3,
    name: 'aniket',
    phone: 444545653535,
    email: 'aniket@gmail.com',
    action: 'delete',
  },
  {
    id: 4,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 5,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 6,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 7,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 8,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 9,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
  {
    id: 10,
    name: 'savant',
    phone: 444545653535,
    email: 'savant@gmail.com',
    action: 'delete',
  },
];

export interface PeriodicElement {
  id: number;
  name: string;
  phone: number;
  email: string;
  action: string;
}

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
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
export class UserComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'name', 'phone', 'email', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(tableDataC);
  expandedElement: PeriodicElement | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
