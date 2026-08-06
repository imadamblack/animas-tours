/**
 * Datos globales del negocio.
 * Los valores marcados con TODO son adelita-yate-privado: sustituir con la
 * información real de Zarpa Tours Vallarta antes de publicar.
 */
export const info = {
  legalName: "Las Ánimas Tours S.A. de C.V.",
  companyName: "Las Ánimas Vallarta Tours",
  description: "Tours y experiencias en el mar de Puerto Vallarta",
  email: {
    sender: "reservaciones@lasanimastours.com",
    recipients: ["reservaciones@lasanimastours.com"],
    subject: "Nueva reservación | Las Ánimas Vallarta Tours",
  },
  phoneNumber: "+52322XXXXXXX",
  whatsapp: {
    value: "+52322XXXXXXX",
    message: "Hola! Me interesa reservar un tour con Las Ánimas Vallarta Tours",
  },
  social: {
    facebook: "https://facebook.com/lasanimastours",
    instagram: "https://instagram.com/lasanimastours",
    tripadvisor: "",
  },
  address: {
    address: "calle y número",
    col: "colonia",
    cp: "código postal",
    city: "Puerto Vallarta",
    state: "Jalisco",
  },
  // Punto de salida / marina de abordaje
  marina: {
    name: "nombre de la marina o muelle",
    reference: "referencia de llegada (ej. frente a la Terminal Marítima)",
  },
  // Webhook heredado del proyecto anterior: confirmar o reemplazar por el de Zarpa
  optInWebhook: "https://n8n.notoriovs.com/webhook/",
  surveyWebhook: "",
  surveyRedirect: "",
  privacyNotice: "/aviso-privacidad",
  termsConditions: "/aviso-privacidad",
};
