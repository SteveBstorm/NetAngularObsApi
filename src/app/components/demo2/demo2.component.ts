import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss']
})
export class Demo2Component implements OnInit, OnDestroy {

  status : boolean = false

  statusSub : Subscription = new Subscription()

  constructor(
    private _auth : AuthService
  ) { }

  ngOnInit(): void {
    //this.status = (Boolean)(localStorage.getItem('status')) ?? false
    this.statusSub = this._auth.statusSubject.subscribe(this.test())
    this._auth.emitStatus()
  }

  ngOnDestroy() : void {
    this.statusSub.unsubscribe()
  }

  test() {
    return (value : boolean) => {
      this.status = value; 
      console.log("on déclenche le délégate")
    }
  }

  login() {
    this._auth.login()
   
  }

  logout() {
    this._auth.logout()

  }

}
