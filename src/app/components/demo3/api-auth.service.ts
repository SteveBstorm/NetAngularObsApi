import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  //private url : string = "http://stevebstorm.somee.com/api/"

  private url : string = environment.urlApi1
  currentUser : User = {}

  constructor(
    private _client : HttpClient,
    private _toastr : NbToastrService
  ) { }

  connect() : Observable<User> {
    let info = {email : "test@test.com", password : "test1234"}
    return this._client.post<User>(this.url+"Auth/auth", info)
  }

  getAll() : Observable<Movie[]> {
    return this._client.get<Movie[]>(this.url+"movie")
  }

  getOne(id : number) : Observable<Movie> {
    // let header = new HttpHeaders({
    //   'authorization' : 'bearer '+ localStorage.getItem('token')
    // })
    return this._client.get<Movie>(this.url+"movie/"+id)
  }

  getMovieWithComment(id : number) : Observable<Movie> {
    return this._client.get<Movie>(this.url+"movie/"+id)
    .pipe(
      mergeMap(
        (m : Movie) => 
        {
          return this._client.get<Comment[]>(this.url+"comment/"+m.id)
          .pipe(
            map(
              (commentList : Comment[]) =>
              {
                m.comments = commentList
                return m
              }
            )
          )
        }
      )
    )
  }
}


export interface User {
  id? : number;
  email? : string;
  token? : string;
  isAdmin? : boolean;
}

export interface Movie {
  id? : number;
  title? : string;
  description? : string;
  releaseYear? : number;
  realisator? : Person
  actors? : Person[];
  comments? : Comment[];
}

export interface Comment {
  content : string;
  movieId : number;
  userId : number;
}

export interface Person {
  id : number;
  role? : string;
  lastName : string;
  firstName : string;
}