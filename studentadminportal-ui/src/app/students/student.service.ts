import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  //Url of application link to angular app
  private baseApiUrl ='https://localhost:44389/Student/';


  //Injection of HttpClient
  constructor(private httpClient : HttpClient) { }


  //method to get All student List from Database
  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + 'students'); 
  }

  //method to get Single student from DB
  getStudent(studentId:string): Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseApiUrl}${studentId}`);  //`${this.baseApiUrl}${studentId}` this.baseApiUrl + studentId
  }


  //Update All Details of Student using studentId and Student Name
  updateStudent(studentId:string, studentRequest:Student):Observable<Student>{
    const updateStudentRequest : UpdateStudentRequest={
      firstName: studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }

   return this.httpClient.put<Student>(this.baseApiUrl  + studentId, updateStudentRequest);
  }


  //Delete Student id
  deleteStudent(studentId:string): Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl + studentId);
}

  //Add Student
  addStudent(studentRequest:Student):Observable<Student> {
    const addStudentRequest : AddStudentRequest={
      firstName: studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + 'Add', addStudentRequest);

  }
  
}
