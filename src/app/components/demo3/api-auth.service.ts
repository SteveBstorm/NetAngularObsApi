import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private url : string = "http://stevebstorm.somee.com/api/"

  currentUser : User = {}

  constructor(
    private _client : HttpClient,
    private _toastr : NbToastrService
  ) { }

  connect() : Observable<User> {
    let info = {email : "test@test.com", password : "test1234"}
    return this._client.post<User>(this.url+"Authauth", info)
  }
}


export interface User {
  id? : number;
  email? : string;
  token? : string;
  isAdmin? : boolean;
}