import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';

const TITLE = 'Modernización de software legacy: ASP, WebForms, JavaFX y Xamarin | FactoriaLabs';
const DESCRIPTION =
  'Modernizamos y superamos software legado —ASP clásico, WebForms, JavaFX, Xamarin, Access— con migración de datos, puesta en marcha y soporte. Todo el ciclo, con IA como acelerador.';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor() {
    inject(Seo).apply({
      title: TITLE,
      description: DESCRIPTION,
      path: '/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://olivermartinezh.github.io/factorialabs-web/#organizacion',
        name: 'FactoriaLabs',
        url: 'https://olivermartinezh.github.io/factorialabs-web/',
        description:
          'Software factory especializada en modernización de software legacy, aplicaciones heredadas y migración de datos.',
        areaServed: ['CL', 'US'],
        knowsAbout: [
          'modernización de software legacy',
          'software legado',
          'aplicación heredada',
          'migración de datos',
          'ASP clásico',
          'ASP.NET WebForms',
          'JavaFX',
          'Xamarin',
          '.NET MAUI',
          'soporte de software',
        ],
      },
    });
  }
}
