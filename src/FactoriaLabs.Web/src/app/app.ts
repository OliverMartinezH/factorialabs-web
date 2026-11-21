import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './shared/site-footer';
import { SiteHeader } from './shared/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
