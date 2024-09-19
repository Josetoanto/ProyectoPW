import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Student } from '../../models/student';
import { ClearableInputComponent } from '../../clearable-input/clearable-input.component';
import { ChipListComponent } from '../../chip-list/chip-list.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ClearableInputComponent,
    ChipListComponent,
    FormsModule
  ]
})
export class DashboardComponent implements OnInit {

  name: string = '';
  asignatures: string = '';
  
  //Generamos un arreglo de student
  studentArray: Student [] = [{
      id: 1, 
        name: 'Yuca',
        asignatures: ['Ingles','POO2','Algoritmos2']
  }
  ]
  ngOnInit(): void {
      console.log(this.studentArray)
  }

  deleteStudent(id: number){
    var newStudentList: Student[] = this.studentArray //Clonamos el arreglo
    this.studentArray = newStudentList.filter( student => student.id != id)
  }

  addStudent() {
    const asignaturesArray = this.asignatures.split(',');
    const newStudent: Student = {
      id: this.studentArray.length + 1,
      name: this.name,
      asignatures: asignaturesArray
    };
    this.studentArray.push(newStudent);
    this.name = ''
    this.asignatures= ''
    console.log(this.studentArray)
  }

  

  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
}
