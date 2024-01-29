import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { HomeComponent } from './home.component';
import { EditorComponent } from './editor.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'counter',
        component: CounterComponent
    }, {
        path:'editor',
        component: EditorComponent
    }
];
