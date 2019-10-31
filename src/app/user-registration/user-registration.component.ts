import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Observable }    from 'rxjs';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import { UserRegistration } from '../services/user-registration.service';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [DatePipe]

})
export class UserRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private datePipe : DatePipe,private router : Router,private userRegistration: UserRegistration) { }

  ngOnInit() {

    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.firstFormGroup = this.formBuilder.group({
      'userName': ['', Validators.required],
      'password': ['', [Validators.required, this.checkPassword]],
      'email': ['', [Validators.required,Validators.pattern(emailregex)], this.checkInUseEmail]
        });
   
    this.secondFormGroup = this.formBuilder.group({
      'name': ['', Validators.required],
      'date': ['', Validators.required],
      'validate':''
    });
    this.thirdFormGroup = this.formBuilder.group({
    
    });
  }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  hide = true;
  submitted = false;
  selectedOptions: string[] = [];
  selectedOption;

  taskTypeAreas: {
    name: string;
  }[] = [
    {
      name: 'National'
    },
    {
      name: 'International'
    },
    {
      name: 'Sports'
    },
    {
      name: 'Business'
    },
    {
      name: 'Movies'
    },
    {
      name: 'Technology'
    },
    {
      name: 'Economy'
    },
  ];


  onNgModelChange($event){
    console.log($event);
    this.selectedOption=$event;

  }
  
  
  setChangeValidate() {
    this.firstFormGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.firstFormGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.firstFormGroup.get('name').setValidators(Validators.required);
        }
        this.firstFormGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.firstFormGroup.get('name') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control) {
    // mimic http database access
    let db = ['tonasy@gmAASail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.firstFormGroup.get('email').hasError('required') ? 'Field is required' :
      this.firstFormGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.firstFormGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.firstFormGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.firstFormGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.firstFormGroup.invalid) {
          return;
      }

      // display form values on success
      // alert('SUCCESS!! :-)\n\n');
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.firstFormGroup.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.thirdFormGroup.reset();
  }

  userObject:any;
  register(name,userName,email,dateOfBirth,password,newsPreferences){

    dateOfBirth=this.datePipe.transform(dateOfBirth,"yyyy-MM-dd");
    this.userObject={
      "name":name,
      "username":userName,
      "email":email,
      "password": password,
      "dateOfBirth": dateOfBirth,
      "newsPreferences": newsPreferences
    } ;
    console.log(this.userObject);

    this.userRegistration.saveUser(this.userObject)
    .subscribe(
      ()=>{this.ngOnInit();
        this.router.navigateByUrl('/login');
      }
    );


}
}
