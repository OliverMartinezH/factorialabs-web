import { Component } from '@angular/core';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [Contact],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
