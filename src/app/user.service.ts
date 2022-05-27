import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { 
    
  }

  addEmployee(data:any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  
      })
    }
    return this.httpClient.post<any>(this.baseUrl + 'employee',data,httpOptions);
  }

  getAll(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    }
    return this.httpClient.get(this.baseUrl + 'employee',httpOptions);
  }

  updateEmployee(id:any,data:any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    }
    return this.httpClient.put<any>(this.baseUrl + 'employee/'+id,data,httpOptions);
  }
  deleteEmployee(id:any):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    }
    return this.httpClient.delete<any>(this.baseUrl + 'employee/'+id,httpOptions);
  }

}
