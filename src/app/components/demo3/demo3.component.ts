import { Component, OnInit } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ApiAuthService, Movie, User } from './api-auth.service';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.scss']
})
export class Demo3Component implements OnInit {

  currentUser : User = {}
  listeFilm : Movie[] = []
  currentMovie : Movie = {}

  constructor(
    private _auth : ApiAuthService,
    private _toastr : NbToastrService
  ) { }

  ngOnInit(): void {
    
    
  }

  connexion() {
    this._auth.connect().subscribe(
      (u : User) => {
        localStorage.clear()
        this.currentUser = u
        localStorage.setItem('token', u.token ?? '')
        console.log(u)
        console.log(this.currentUser)
        this._toastr.success("Vous êtes bien connecté", u.email, {duration : 5000})
      },
      (error) => {this._toastr.danger(error.message, {duration : 50000})},
      () => {this._toastr.info("Traitement de la méthode connect() terminée", "titre", { position : NbGlobalLogicalPosition.BOTTOM_END})}
    )
  }

  getMovies() {
    this._auth.getAll().subscribe(
      (valueFromService : Movie[]) => {
        this.listeFilm = valueFromService; 
        console.log(this.listeFilm)
    })
  }

  getOne(){
    this._auth.getOne(1).subscribe((m : Movie) => this.currentMovie = m)
  }

  getMC() {
    this._auth.getMovieWithComment(1).subscribe((m : Movie) => console.log(m))
  }

}
