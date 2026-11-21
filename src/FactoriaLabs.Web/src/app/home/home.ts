import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Contact } from '../contact/contact';
import { Seo } from '../core/seo';

const TITLE = 'Modernización de software legacy: ASP, WebForms, JavaFX y Xamarin | FactoriaLabs';
const DESCRIPTION =
  'Modernizamos y superamos software legado —ASP clásico, WebForms, JavaFX, Xamarin, Access— con migración de datos, puesta en marcha y soporte. Todo el ciclo, con IA como acelerador.';

const FAQ = [
  {
    '@type': 'Question',
    name: '¿Qué es una aplicación heredada o software legado?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Es un sistema que sigue en producción pero ya no se puede mantener con comodidad: ASP clásico, WebForms, JavaFX, Xamarin, Access. Funciona, pero cada cambio es un riesgo.',
    },
  },
  {
    '@type': 'Question',
    name: '¿A qué tecnología migran?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Depende del sistema. No imponemos un destino: el stack se define después del inventario, según lo que el software necesite para volver a ser mantenible.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Cómo es la migración de datos desde Access a SQL Server?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Se inventarían tablas y consultas, se limpian claves duplicadas y nulos, se migra por etapas y se comparan conteos y totales contra el sistema original antes de usarlo.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Se puede modernizar sin detener la operación?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sí. El sistema antiguo sigue funcionando en paralelo y solo se apaga cuando el nuevo cuadra las mismas cifras.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Trabajan con sistemas en ASP clásico, JavaFX o Xamarin?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sí. Son el tipo de aplicaciones heredadas que modernizamos con más frecuencia, junto a WebForms y bases Access.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Ofrecen soporte después del lanzamiento?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Sí, forma parte del ciclo. No entregamos y desaparecemos: seguimos con actualizaciones, correcciones y mejoras sobre el sistema ya modernizado.',
    },
  },
  {
    '@type': 'Question',
    name: '¿Cuánto demora una modernización?',
    acceptedAnswer: {
      '@type': 'Answer',
      text: 'Depende del inventario: no damos plazo ni precio antes de revisar el sistema. Cualquier cifra sin diagnóstico es una apuesta.',
    },
  },
];

@Component({
  selector: 'app-home',
  imports: [Contact, RouterLink],
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
        '@graph': [
          {
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
          {
            '@type': 'FAQPage',
            mainEntity: FAQ,
          },
        ],
      },
    });
  }
}
