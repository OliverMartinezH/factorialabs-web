# Proyecto FactoriaLabs

> **Reglas de desarrollo:** Ver [[AGENTS]]
> **Estado actual:** Ver [[progress]]
> **Historial de decisiones:** Ver [[history]]

---

## Visión

Software factory chilena que moderniza software legacy y migra datos sin detener la operación del
cliente.

## Objetivo del producto

El sitio web convierte a un dueño de PyME —con foco en retail— que arrastra un sistema antiguo en
una conversación concreta. El éxito es un lead calificado, no tráfico.

## Actores

* **Dueño o gerente de PyME.** Decide la inversión; quiere ordenar la operación sin detenerla.
* **Gerente de TI u operaciones.** Evalúa stack, integraciones, soporte y riesgo técnico.
* **Oliver (fundador).** Desarrolla, vende y mantiene el sitio.

## Reglas de negocio

* El sitio publica solo afirmaciones verificables: hoy no existen testimonios, métricas ni clientes
  citables.
* El servicio cubre el ciclo completo: diagnóstico, migración de datos, construcción, puesta en
  marcha y soporte posterior. No se entrega y se desaparece.
* La IA es la forma de trabajo, no el producto: acelera inventario, pruebas y migración.
* El formulario es el canal de captación propio; el correo directo es la alternativa.
* Cada lead se registra con fecha, empresa y sistema actual declarado.

## Restricciones

* Sin backend propio: el sitio es estático en GitHub Pages.
* Sin base de datos.
* Sin precios ni plazos publicados.

## Módulos

* Portada: titular, panel de paridad y acciones.
* Alcance: qué se moderniza (web, escritorio, móvil), sin imponer destino.
* Caso 001: migración en curso de tres sistemas ASP + Access.
* Método: cinco fases con verificación explícita y nota de desarrollo asistido por IA.
* Stack: lo que efectivamente se usa.
* Límites: lo que no se hace.
* Preguntas frecuentes sobre software legado.
* Contacto: formulario y correo directo.

## Roadmap

1. Conectar el formulario a Apps Script y recibir los avisos por correo.
2. Reemplazar el email y el WhatsApp placeholder por los reales.
3. Dominio propio (`factorialabs.cl`) con `CNAME`.
4. Publicar el caso 001 con nombre cuando el cliente lo autorice.
