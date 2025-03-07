import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) {
    
  }
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private url = 'https://fakestoreapi.com';
  public data = new BehaviorSubject<any>(null);



  getUsers() {
    return this.http.get(this.url + '/users', { 'headers': this.headers });
  }

  createUser(createRequestBody:any){
    return this.http.post(this.url + '/users',createRequestBody, { 'headers': this.headers });
  }

  editUser(id:any,requestBody:any){
    return this.http.put(this.url + '/users/'+ id,requestBody, { 'headers': this.headers });
  }

  delete(id:any){
    return this.http.delete(this.url + '/users/'+ id, { 'headers': this.headers });
  }
}
