import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from "./field/field.component";
import { Validators } from '@angular/forms';
import { FieldInput } from './field/field.store';

@Component({
  selector: 'app-editor',
  standalone: true,
  template: `
    <p>{{ numberOfErrors() }}</p>
    @if(numberOfErrors() > 0) {
    <div>
      <p>There are errors</p>
    </div>
    }
    <p>
      <app-field
        [input]="f"
        (isEditing)="editThis($event)"
        [allowEdit]="canEdit()"
        (itemHasErrors)="gotErrors($event)"
        (itemChanged)="gotIt($event)"
      />
    </p>
    <p>
      <app-field
        [input]="f2"
        (isEditing)="editThis($event)"
        [allowEdit]="canEdit()"
        (itemHasErrors)="gotErrors($event)"
        (itemChanged)="gotIt($event)"
      />
    </p>
  `,
  styles: ``,
  imports: [CommonModule, FieldComponent],
})
export class EditorComponent {
  f: FieldInput = {
    value: 'hello',
    validators: [
      {
        message: 'This is required',
        validator: Validators.required,
      },
      {
        message: 'Has to be more than 3 characters',
        validator: Validators.minLength(3),
      },
      {
        message: "Can't be more than 10 characters",
        validator: Validators.maxLength(10),
      },
    ],
  };
  f2: FieldInput = {
    value: 'tacos',
    validators: [
      {
        message: 'Gotta Have it',
        validator: Validators.required,
      },
    ],
  };
  gotIt(v: unknown) {
    console.log('Parent got', v);
  }
  numberOfErrors = signal(0);
  canEdit = signal(true);
  editThis(val:boolean) {
    this.canEdit.set(!val);
  }
  gotErrors(x: boolean) {
    this.numberOfErrors.set(
      x ? this.numberOfErrors() + 1 : this.numberOfErrors() === 0 ? 0 : this.numberOfErrors() - 1
    );
  }
}
