import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/api-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId : string | null |undefined;
  //READ Single Student using CRUD
  student:Student={
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id:'',
      description:''
    },
    address: {
      id:'',
      physicalAddress:'',
      postalAddress:''
    }
  }

  genderList:Gender []=[];
  

  constructor(private readonly studentService:StudentService,
              private readonly route:ActivatedRoute,
              private readonly genderService:GenderService,
              private snackbar: MatSnackBar,
              private router:Router){}

  isNewStudent = false;
  header='';

  ngOnInit() :void{
    this.route.paramMap.subscribe(
      (params)=>{
        this.studentId=params.get('id');

        if(this.studentId){

          //If the route contains the 'Add'      
          if(this.studentId.toLowerCase() === 'Add'.toLowerCase()){
           // -> new Student Functionality
           this.isNewStudent=true;
           this.header='Add New Student';
          }

          //otherwise         
          else{
           // -> Existing Student Functinality
           this.isNewStudent=false;
           this.header='Edit Student';
           this.studentService
          .getStudent(this.studentId).subscribe( 
            (successResponse)=>{

              let _student: Student = successResponse;

                if (_student.address == null || _student.address == undefined)
                {
                  _student.address = {
                    id:'',
                    physicalAddress:'',
                    postalAddress:''
                  };
                }

                if (_student.gender == null || _student.gender == undefined)
                {
                  _student.gender = {
                    id:'',
                    description:''
                  };
                }

             this.student = _student;

            }
          );    
          }

          
           
          
          this.genderService.getGenderList()
          .subscribe(
            (successResponse)=>{
            this.genderList=successResponse;
          });
        }
      }
    );
  }


  onUpdate():void{
    //Update Student
   this.studentService.updateStudent(this.student.id,this.student)
   .subscribe(
    (successResponse)=>{
     this.snackbar.open("Successfully Updated!!!", undefined,{
      duration:2000
    });
   },
   (errorResponse)=>{

   });
   
  }

  onDelete(){
    this.studentService.deleteStudent(this.student.id)
    .subscribe((successResponse)=>{
      this.snackbar.open("Deleted Successfully!!!",undefined,{
        duration:2000
      });
      //delete and return to students page

      setTimeout(()=>{
        this.router.navigateByUrl('students');
      },2000);
      
    },
    (errorResponse)=>{

    }
  );
   
  }


  onAdd():void{
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse)=>{
        this.snackbar.open("Added Successfully!!!",undefined,{
          duration:2000
        });
        //Add and return to students page
  
        setTimeout(()=>{
          this.router.navigateByUrl(`students/${successResponse.id}`);
        },2000);
      
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
      );
    }
  }

    
