import { computed } from "@angular/core";
import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { signalStore, withState, withComputed, withMethods, patchState } from "@ngrx/signals";
export type FieldValidation = {
  message: string;
  validator: ValidatorFn;
};
export type FieldInput = {
  value: unknown;
  validators?: FieldValidation[];
};
type FieldState = {
  fieldInput: FieldInput;
  editing: boolean;
  newValue: unknown;
  value: unknown;
  validationErrors: ValidationErrors;
};
  const initialState: FieldState = {
    editing: false,
    validationErrors: {},
    fieldInput: { value: '' },
    newValue: '',
    value: '',
  };
export const FieldStore = signalStore(
  withState(initialState),
  withComputed(({ ...store }) => ({
    notEditing: computed(() => !store.editing()),
    errors: computed(() => store.validationErrors()),
    hasErrors: computed(() => JSON.stringify(store.validationErrors()) !== "{}"),
    errorKeys: computed(() => Object.keys(store.validationErrors()) )
  })),
  withMethods(({ ...store }) => ({
    setup(value: FieldInput) {
      patchState(store, { fieldInput:value, value: value.value, newValue: value.value });
    },
    setEditing() {
      patchState(store, { editing: true });
    },
    setNewValue(newValue: unknown) {
      patchState(store, { newValue });
    },
    cancel() {
      patchState(store, {
        newValue: store.value(),
        editing: false,
        validationErrors: {}
      });
    },
    save(input: HTMLInputElement) {
        if(input.value === store.value()) {
            patchState(store, {editing: false})
            return;
        }
      if (store.fieldInput().validators?.length || 0 > 0) {
        const validationResults =
          store
            .fieldInput()
            .validators?.reduce((er: ValidationErrors, next) => {
              const result = next.validator(
                input as unknown as AbstractControl
              );

              if (result) {
                const x = { [next.message]: result };
                er = { ...x, ...er };
              }
              return er;
            }, {} as ValidationErrors) || {};
        patchState(store, { validationErrors: validationResults });
      }
      const noErrors = JSON.stringify(store.validationErrors()) === "{}";
      if (noErrors) {
        patchState(store, {
          value: store.newValue(),
          editing: false,
        });

      }
    },
  }))
);