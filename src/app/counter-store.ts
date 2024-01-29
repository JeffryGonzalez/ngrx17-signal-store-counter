import { computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, from, pipe, switchMap } from 'rxjs';
import { CounterService } from './counter.service';
export type CountByValues = 1 | 3 | 5;
export type CounterState = { count: number; by: CountByValues };
const initalState: CounterState = { count: 0, by: 1 };
export const CounterStore = signalStore(
  withState(initalState),
  withMethods(({ count, by, ...store }, service = inject(CounterService)) => ({
    async increment() {
      patchState(store, { count: count() + by() });
    },
    async decrement() {
      patchState(store, { count: count() - by() });
    },
    async setCountBy(by: CountByValues) {
      patchState(store, { by });
    },
    async load() {
        const counter = await service.loadCounter(initalState);
        patchState(store, counter);
    },
    save: rxMethod<CounterState>(
      pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(),
        switchMap((state:CounterState) => from(service.saveCounter(state)))
      ))
  })),
  withComputed(({ count, by }) => ({
    state: computed(() => ({ count: count(), by: by() })),
  })),
  withHooks({
    async onInit({  save, state, load, }) {
      await load();
      save(state);
    },
  })
);



