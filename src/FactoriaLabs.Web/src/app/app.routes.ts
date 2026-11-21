import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Stack } from './stack/stack';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'stack', component: Stack },
  { path: '**', redirectTo: '' },
];
