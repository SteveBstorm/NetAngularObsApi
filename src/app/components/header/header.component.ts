import { Component, OnInit } from '@angular/core';
import { AuthService } from '../demo2/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  status : boolean = false

  constructor(
    private _auth : AuthService
  ) { }

  ngOnInit(): void {
    //subject est un delegate avec une methode subscribe qui remplance le += du delegate c# (pour ajouter une methode au delegate)
    this._auth.statusSubject.subscribe((value : boolean) => this.status = value)
    this._auth.emitStatus()
    //this.status = (Boolean)(localStorage.getItem('status')) ?? false
    
  }

}
