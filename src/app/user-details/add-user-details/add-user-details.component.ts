import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-details',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user-details.component.html',
  styleUrl: './add-user-details.component.scss'
})
export class AddUserDetailsComponent implements OnInit, AfterViewInit {
  userDetails!: FormGroup;
  editMode: boolean | undefined;
  EditDataId: any;
  enableForm = false;

  constructor(public fb: FormBuilder, public userDetailService: UserDetailsService, public router: Router) { }
  ngAfterViewInit(): void {
    this.checkCreateUserorEditUser();
  }
  ngOnInit() {
    this.intializeForm();
  }

  intializeForm() {
    this.userDetails = this.fb.group({
      'username': [],
      'email': [],
      'password': [],
    });
  }

  checkCreateUserorEditUser() {
    this.userDetailService.data.subscribe(data => {
      this.EditDataId = data?.id;
      if (data) {
        this.editMode = true;
        this.editIntialiseForm(data);
      } else {
        this.editMode = false;
      }
    })
  }
  editIntialiseForm(data: any) {
    this.userDetails.get('username')?.patchValue(data.username);
    this.userDetails.get('email')?.patchValue(data.email);
    this.userDetails.get('password')?.patchValue(data.password);
  }


  onSubmit() {
    if (!this.editMode) {
      let createRequestBody = this.userDetails.value;
      createRequestBody.id = 0;
      this.userDetailService.createUser(createRequestBody).subscribe(data => {
        this.userDetails.reset();
        this.router.navigate(["/users"]);
      }, error => {
        alert(error);
      })
    } else {
      let createRequestBody = this.userDetails.value;
      createRequestBody.id = 0;
      this.userDetailService.editUser(this.EditDataId, createRequestBody).subscribe(data => {
        this.userDetails.reset();
        this.router.navigate(["/users"]);
      }, error => {
        alert(error);
      })
    }
  }


}
