import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss']
})
export class Demo1Component implements OnInit {

  liste : any[] = []

  constructor() { }

  ngOnInit(): void {
    const listObs = of([
      {id : 1, lastname : "Lorent", firstname : "Steve", role : "emp"},
      {id : 2, lastname : "Morre", firstname : "Thierry", role : "boss"},
      {id : 3, lastname : "Person", firstname : "Michael", role : "boss"},
      {id : 4, lastname : "Strimelle", firstname : "Aurélien", role : "emp"},
    ])

    listObs.pipe(
      tap((x : any[]) => {console.log(x); this.liste = x}),
      delay(3000),
      map((x : any[]) => x.filter(x => x.role == 'boss')),
      tap((x : any[]) => {console.log(x); this.liste = x}),
      delay(3000),
      map((x : any[]) => x.filter(x => x.id == 2))
    ).subscribe(
      () => {console.log("on passe dans le try")} , //reussite
      () => console.log("en cas d'erreur"), //erreur
      () => console.log("quoi qu'il arrive") //d'office
      )
  }

}
