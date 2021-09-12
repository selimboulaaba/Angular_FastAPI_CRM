import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ApiService { 
 
 
  private REST_API_SERVER = "http://localhost:8000/"; 
  constructor(private httpClient: HttpClient) { } 
 
  getTypeRequest(url: any) { 
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  postTypeRequest(url: any, payload: any) { 
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })); 
  } 
 
  putTypeRequest(url: any, payload: any) { 
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => { 
      return res; 
    })) 
  }   
}