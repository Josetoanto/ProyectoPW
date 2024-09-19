import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

export interface Asignature {
  name: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-list',
  templateUrl: 'chip-list.component.html',
  styleUrl: 'chip-list.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ChipListComponent{


  listaAsignaturas: string[] = ['POO2', 'Español','Ingles'];

  
  
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly asignatures = signal<Asignature[]>([{name: 'POO2'}, {name: 'Español'}, {name: 'Ingles'}]);
  readonly announcer = inject(LiveAnnouncer);
  

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Añadir
    if (value) {
      this.asignatures.update(asignatures => [...asignatures, {name: value}]);
      //Obtener con un mapeo los valores
      const asignaturasNewAlumno: string[] = this.asignatures().map(asignatura => asignatura.name);
      this.listaAsignaturas = asignaturasNewAlumno;
      console.log(asignaturasNewAlumno);
    }

    
    event.chipInput!.clear();
  }

  

  remove(asignature: Asignature): void {
    this.asignatures.update(asignatures => {
      const index = asignatures.indexOf(asignature);
      if (index < 0) {
        return asignatures;
      }

      asignatures.splice(index, 1);
      this.announcer.announce(`Removed ${asignature.name}`);
      return [...asignatures];
    });
  }
  
  edit(asignatureIndex: Asignature, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(asignatureIndex);
      return;
    }

    // Edit existing fruit
    this.asignatures.update(asignatures => {
      const index = asignatures.indexOf(asignatureIndex);
      if (index >= 0) {
        asignatures[index].name = value;
        return [...asignatures];
      }
      return asignatures;
    });
  }
}
