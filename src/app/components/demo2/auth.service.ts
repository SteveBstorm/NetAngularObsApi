import { ɵangular_material_src_cdk_overlay_overlay_b } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get status() : boolean {
    return (Boolean)(localStorage.getItem('status')) ?? false
  }

  statusSubject : Subject<boolean> = new Subject<boolean>()

  emitStatus() {
    this.statusSubject.next(this.status)
  }

  constructor() { }

  login() {

    localStorage.setItem('status', true.toString())
    this.emitStatus()
  }

  logout() {

    localStorage.removeItem('status')
    this.emitStatus()
  }
}
