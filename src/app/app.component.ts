import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm';
  employeeForm:FormGroup;
  data:any=[];
  submitted:boolean=false;
  gender:any;

  constructor(public fb:FormBuilder, private userService: UserService){
    this.gender = [
      {id:1, name:'Male'},
      {id:2, name:'Female'},
      {id:3, name:'Others'},
    ];
  }
  ngOnInit(): void {
    this.addEmployeeForm();
    this.getEmployesData();  
 
  }
  addEmployeeForm(){
    this.employeeForm = this.fb.group({
      id:[0],
      firstName:[null,Validators.required],
      lastName:[null,Validators.required],
      dob:[null,Validators.required],
      gender:[null,Validators.required],
      company:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      mobileNumber:[null,[Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10), Validators.maxLength(12)]],
    }, { 
      validator: this.ConfirmedValidator('password', 'confirm_password')
    })
  }
  ConfirmedValidator(controlName: any, matchingControlName: any){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
editUser(e:any){
  
     this.employeeForm.patchValue(e);
 
  }
  onAddEmployeeData(){
    this.submitted = true;
    if(this.employeeForm.value.id>0){
      this.userService.updateEmployee(this.employeeForm.value.id,this.employeeForm.value).subscribe(res=>{ 
        this.getEmployesData();
        
    this.submitted = false;
    this.employeeForm.reset();
       });
    }
    console.log(this.employeeForm.value);
    this.userService.addEmployee(this.employeeForm.value).subscribe(res=>{
      console.log(res);
      this.getEmployesData();
      
    this.submitted = false;
    this.employeeForm.reset();
     
    })
  }

  getEmployesData(){
    this.userService.getAll().subscribe(res=>{
      console.log(res);
      this.data = res;
    })
  }

  get f(): any {
    return this.employeeForm.controls;
  }
  deleteUser(e:any) {
    this.userService.deleteEmployee(e.id).subscribe(res=>{ 
      console.log(res);
      this.getEmployesData();
     });
  }

}

