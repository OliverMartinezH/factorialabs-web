import { Routes } from '@angular/router';
import { ContactoPage } from './contacto/contacto-page';
import { Home } from './home/home';
import { Metodo } from './metodo/metodo';
import { Preguntas } from './preguntas/preguntas';
import { Stack } from './stack/stack';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'metodo', component: Metodo },
  { path: 'stack', component: Stack },
  { path: 'preguntas', component: Preguntas },
  { path: 'contacto', component: ContactoPage },
  { path: '**', redirectTo: '' },
];
