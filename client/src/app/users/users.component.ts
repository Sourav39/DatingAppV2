import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserTable } from '../models/userTable';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {

  displayedColumns = [ 'username', 'age', 'created', 'gender', 'country', 'Action' ];
  dataSource = new MatTableDataSource<any>();
  user = {};
  userDisplay : any = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    debugger;
    this.http.get('https://localhost:5001/api/Users')
      .subscribe({
        next: (response : any) => {
          if (response != null) {
            response.forEach((element: any) => {
              this.user = {
                'username' : element.userName,
                'age' : element.age,
                'created' : element.created,
                'gender' : element.gender,
                'country' : element.country,
                'isEdit' : false
              }
              this.userDisplay.push(this.user)
            });
          }
          debugger;
          console.log("Data: " + this.userDisplay);
          this.dataSource.data = this.userDisplay;
        }
      }
      )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
}
// addEmployee(): void {
//   const dialogRef = this.dialog.open(EmployeeAddFormComponent);

//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');      
//   });
// } 

  onEdit(row: any) {
    row.isEdit = true
  }

  onCancel(row: any) {
    row.isEdit = false;
    }

  addEmployee() {
    throw new Error('Method not implemented.');
  }
  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
