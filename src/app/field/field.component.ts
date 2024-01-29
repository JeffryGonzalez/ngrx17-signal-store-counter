import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  inject,
} from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { FieldInput, FieldStore } from './field.store';



@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CommonModule],
  template: `<div>
    <input
      #i
      [disabled]="store.notEditing()"
      (change)="store.setNewValue(i.value)"
      type="text"
      [value]="store.newValue()"
    />
    @if(store.notEditing()) {
    <div><button [disabled]="allowEdit === false" (click)="edit()">Edit</button></div>
    } @else {
    <div>
      <button (click)="cancel()">Cancel</button>
      <button (click)="save(i)">Save</button>
    </div>
    }
    @if(store.hasErrors()) {
      @for(key of store.errorKeys(); track key) {
        <p>{{key}}</p>
      }
    }

  </div>`,
  providers: [FieldStore],
})
export class FieldComponent implements OnInit {
  @Input({ required: true }) input!: FieldInput;
  @Input() allowEdit = true;
  @Output() itemChanged = new EventEmitter<unknown>();
  @Output() itemHasErrors = new EventEmitter<boolean>();
  @Output() isEditing = new EventEmitter<boolean>();
  store = inject(FieldStore);

  ngOnInit(): void {
    this.store.setup(this.input);
  }

  edit() {
    if(this.allowEdit) {
      this.store.setEditing();
      this.isEditing.emit(true);
    }
  }
  cancel() {
    this.store.cancel();
    this.isEditing.emit(false);
    this.itemHasErrors.emit(false);
  }
  doIt(v: unknown) {
    this.itemChanged.emit(v);
  }
  save(i:HTMLInputElement) {
    this.store.save(i);
    if(!this.store.hasErrors()) {
      if(this.store.newValue() === this.store.value()) {
      this.itemChanged.emit(this.store.value());
      }
      this.itemHasErrors.emit(false);
      this.isEditing.emit(false);
    } else {
      this.itemHasErrors.emit(true);
    }
  }
}
