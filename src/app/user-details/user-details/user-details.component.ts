import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userDetails:any;

  constructor(public userDetailsService:UserDetailsService,public router:Router) { }
  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userDetailsService.getUsers().subscribe(data=>{
      this.userDetails = data;
    },error=>{
      alert(error);
    })
  }

  edit(data:any){
    this.userDetailsService.data.next(data);
    this.router.navigate(['/create-user']);
  }

  delete(id:any){
    this.userDetailsService.delete(id).subscribe(data=>{
      this.router.navigate(["/users"]);
      alert('deleted successfully');
    },error=>{
      alert(error);
    })  }

  createUser(){
    this.userDetailsService.data.next(null);
    this.router.navigate(["/create-user"]);
  }



}


