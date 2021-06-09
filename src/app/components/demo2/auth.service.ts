import { ɵangular_material_src_cdk_overlay_overlay_b } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get status() : boolean {
    return (Boolean)(localStorage.getItem('status')) ?? false
  }

  statusSubject : Subject<boolean> = new Subject<boolean>()

  statusBSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.status)

  emitStatus() {
    this.statusSubject.next(this.status) //correspond au Invoke() d'un delegate c# 
                                         //correspond a la méhtode Emit() d'un event js

    this.statusBSubject.value
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
