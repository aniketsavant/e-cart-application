import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { UsersService } from './../../../services/users.service';
import { UserList } from '../../../interfaces/iAuthPages';
import { ToastrService } from 'ngx-toastr';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'user_id',
    'full_name',
    'phone',
    'email',
    'full_address',
    'status',
  ];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource();
  public userListForDeletUser: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
    this.usersService.getUserList().subscribe((res: UserList[]) => {
      if (res.length > 0) {
        this.userListForDeletUser = res;
        this.userListForDeletUser = this.userListForDeletUser.filter(user => user.role !== 'ADMIN');
        this.dataSource = new MatTableDataSource(this.userListForDeletUser);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        alert('no data found');
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

  public onDeletClick(value): void {
    if (
      confirm(
        'Orders related to this user will also deleted, if have any. Are you sure to delete user : ' +
          value.full_name
      )
    ) {
      const userDeletPayload = {
        user_id: value.user_id,
      };
      this.usersService.deleteUser(userDeletPayload).subscribe((res) => {
        if (res.status === 'Ok') {
          this.userListForDeletUser = this.userListForDeletUser.filter(
            ({ user_id }) => user_id !== value.user_id
          );
          this.dataSource = new MatTableDataSource(this.userListForDeletUser);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.toastr.success('User deleted successfully..', 'Done.!!');
        } else {
          this.toastr.success(res.message, 'Oops.!!');
        }
      }),
        (err) => {
          this.toastr.error('Somthing wrong', 'Oops.!!');
          console.log('Error', err);
        };
    }
  }
}
