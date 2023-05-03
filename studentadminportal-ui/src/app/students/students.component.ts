import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/api-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  students:Student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile', 'profileImageUrl','gender'];
  dataSource: MatTableDataSource<Student>= new MatTableDataSource<Student>();
   
  //Paginator
  @ViewChild(MatPaginator) matPaginator! : MatPaginator;

  //Filter String to search
  filterString='';

  //Paginator Sorting
 // @ViewChild(MatSort) matSort! : MatSort;

  //Inject service to get
  constructor(private studentService: StudentService){}

  ngOnInit() {

   //Fetch Students
   this
      .studentService
      .getStudent()
      .subscribe(
        (successResponse)=>{
          this.students=successResponse;
          this.dataSource=new MatTableDataSource<Student>(this.students);
        
          if(this.matPaginator){
            this.dataSource.paginator=this.matPaginator;
          }

          //  if(this.matSort){
          //    this.dataSource.sort = this.matSort;
          //  }
        
        },
        (errorResponse)=>{
          console.log('err', errorResponse);
      }
   );

  }
 

  //Filter String to search
  filterStudents(){
    this.dataSource.filter=this.filterString.trim().toLowerCase();
  }

}
