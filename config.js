// Configuración pública de la landing. Mantén las credenciales en el servidor.
window.EBEATS = {
  brand: 'E Beats Perú',
  whatsapp: {
    number: '51955250185',
    message: 'Hola, quiero información sobre el sistema de respuesta y agenda de visitas con IA para mi inmobiliaria.',
    bookingMessage: 'Hola, quisiera coordinar un diagnóstico gratuito para mi inmobiliaria.',
    demoNumber: '',
    demoMessage: 'Hola, vi el ejemplo de chat y quisiera probar cómo respondería el asistente en mi inmobiliaria.'
  },
  bookingUrl: '',
  metaPixelId: '',
  proposalUrl: '',
  supportVideoUrl: '/assets/inmobiliarias/video-apoyo.mp4',
  supportVideoCaptions: '/assets/inmobiliarias/video-apoyo.es.vtt',
  privacyEmail: 'anchillo00@gmail.com',
  offer: {
    name: 'Sistema de Respuesta y Agenda de Visitas con IA',
    headline: 'Que ningún interesado se quede sin respuesta',
    description: 'Responde por WhatsApp las 24 horas, califica interesados y agenda visitas para tus asesores. Diseñado para inmobiliarias y corredores en Perú.',
    bookingMinutes: 20,
    deliveryDays: [7, 10],
    adjustmentDays: 15,
    plans: [
      {
        name: 'Esencial',
        summary: 'Para responder consultas y organizar visitas.',
        catalogueLimit: 5,
        features: [
          'Asistente de IA en WhatsApp las 24 horas.',
          'Catálogo cargado y probado.',
          'Chatwoot con etapas y derivación a asesores.',
          'Recordatorio de visita.',
          'Reporte semanal y capacitación.'
        ]
      },
      {
        name: 'Completo',
        summary: 'Para hacer seguimiento y recuperar oportunidades.',
        catalogueLimit: 20,
        recommended: true,
        features: [
          'Todo lo del plan Esencial.',
          'Seguimiento automático a quienes no responden.',
          'Reactivación de contactos antiguos con una campaña inicial.',
          'Aviso inmediato al asesor ante interesados de alta intención.',
          'Conexión de formularios y anuncios hacia WhatsApp.'
        ]
      }
    ]
  }
};
