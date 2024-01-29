import { Injectable } from "@angular/core";
import { CounterState } from "./counter-store";
@Injectable()
export class CounterService {
  loadCounter(defaultState: CounterState) {
    return new Promise<CounterState>((resolve, reject) => {
      setTimeout(() => {
        const counter = localStorage.getItem('counter');
        resolve(counter ? JSON.parse(counter) : defaultState);
      }, 0);
    });
  }
  saveCounter(counter: CounterState) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('counter', JSON.stringify(counter));
        resolve(counter);
      }, 0);
    });
  }
}
