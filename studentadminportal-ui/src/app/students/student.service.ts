import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  //Url of application link to angular app
  private baseApiUrl ='https://localhost:44389/';


  //Injection of HttpClient
  constructor(private httpClient : HttpClient) { }


  //method to get student List from DB
  getStudent(): Observable<Student[]> {


    return this.httpClient.get<Student[]>(this.baseApiUrl + 'students');
    
  }
}
