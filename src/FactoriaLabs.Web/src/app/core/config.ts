/**
 * Configuración de contacto.
 * Los datos marcados como placeholder deben reemplazarse antes de publicar.
 */
export const CONTACT = {
  /** Correo de contacto publicado en el sitio. */
  email: 'oliver.martinez@gmail.com',
  /** Opcional: número en formato internacional sin "+", ej. '56912345678'. Vacío = se muestra email. */
  whatsapp: '',
  /**
   * URL /exec de la Web App de Google Apps Script que recibe los leads.
   * Vacío = el formulario abre el correo del visitante (mailto).
   */
  formEndpoint:
    'https://script.google.com/macros/s/AKfycbwuvMvwhhZ-X2uS9Ko06ruYchydZd6X1g3atjv0t--QgzW6gEiFQt4GwtzMc6ZdmziD/exec',
};
