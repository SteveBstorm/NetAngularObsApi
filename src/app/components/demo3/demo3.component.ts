import { Component, OnInit } from '@angular/core';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ApiAuthService, User } from './api-auth.service';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.scss']
})
export class Demo3Component implements OnInit {

  currentUser : User = {}

  constructor(
    private _auth : ApiAuthService,
    private _toastr : NbToastrService
  ) { }

  ngOnInit(): void {
    this._auth.connect().subscribe(
      (u : User) => {
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

}
