// ═══════════════════════════════════════════════════════════════
// ARCHIVO DE CONTENIDO CENTRALIZADO
// ═══════════════════════════════════════════════════════════════
// Este es el ÚNICO archivo que necesitas editar para personalizar
// todo el contenido del portafolio. Cambia los textos, reordena
// los servicios, y ajusta la información a tu perfil.
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────
// DATOS PERSONALES
// ───────────────────────────────────────────────────────────────
export const PERSONAL = {
  nombre: "Johann Abad",
  titulo: "Desarrollador Full Stack",
  tagline: "Construyo software que resuelve problemas reales de negocio",
  ubicacion: "Lima, Perú",
  email: "jcabadcampos12@gmail.com",
  // Redes sociales (dejar vacío para ocultar)
  linkedin: "",
  github: "https://github.com/Johann3421",
};

// ───────────────────────────────────────────────────────────────
// SEO & METADATA
// ───────────────────────────────────────────────────────────────
export const SEO = {
  title: `${PERSONAL.nombre} — Desarrollador Full Stack en Perú`,
  description:
    "Desarrollo SaaS a medida, sitios web de alto rendimiento y sistemas POS escalables. Interfaces 3D interactivas con Three.js, arquitectura moderna con Next.js y PostgreSQL.",
  keywords: [
    "Desarrollador Full Stack en Perú",
    "Desarrollo SaaS a medida en Perú",
    "Sistemas POS escalables",
    "Interfaces 3D interactivas con Three.js",
    "Sitios web con Next.js en Lima",
    "Consultoría técnica para startups",
    "Control de inventarios personalizado",
    "Aplicaciones web de alto rendimiento",
  ],
};

// ───────────────────────────────────────────────────────────────
// HERO SECTION
// ───────────────────────────────────────────────────────────────
export const HERO = {
  headline: "Desarrollador Full Stack en Perú",
  subheadline:
    "Transformo ideas de negocio en aplicaciones web robustas. Arquitectura limpia, código escalable, resultados medibles.",
  ctaPrimario: "Hablemos de tu proyecto",
  ctaSecundario: "Ver servicios",
};

// ───────────────────────────────────────────────────────────────
// SERVICIOS
// ───────────────────────────────────────────────────────────────
export const SERVICES_DATA = [
  {
    icon: "Layers",
    title: "Desarrollo SaaS a Medida",
    description:
      "Plataformas multi-tenant con autenticación, billing y APIs REST/GraphQL. Arquitectura pensada para escalar desde el día uno sin reescribir código cuando lleguen los primeros mil usuarios.",
    cta: "Explorar soluciones SaaS",
    anchor: "#contacto",
  },
  {
    icon: "Zap",
    title: "Sitios Web de Alto Rendimiento",
    description:
      "Sitios con Next.js que cargan en menos de 2 segundos, optimizados para SEO y conversión. Ideales para negocios que necesitan presencia digital que genere leads, no solo impresiones.",
    cta: "Ver cómo optimizo la web",
    anchor: "#contacto",
  },
  {
    icon: "ShoppingCart",
    title: "Sistemas POS + Inventarios",
    description:
      "Punto de venta con control de inventarios en tiempo real, reportes automáticos y sincronización multi-sucursal. Soluciones que reducen el error humano y aceleran la operación diaria.",
    cta: "Conocer el sistema POS",
    anchor: "#contacto",
  },
  {
    icon: "MessageSquare",
    title: "Consultoría Técnica",
    description:
      "Audito tu stack actual, identifico cuellos de botella y diseño hojas de ruta técnicas. Para startups que necesitan dirección clara antes de invertir en desarrollo.",
    cta: "Agendar consultoría",
    anchor: "#contacto",
  },
];

// ───────────────────────────────────────────────────────────────
// STACK TÉCNICO
// ───────────────────────────────────────────────────────────────
export const STACK_DATA = [
  {
    name: "Next.js",
    justification: "Rendering híbrido: SEO sin sacrificar interactividad",
    color: "#000000",
  },
  {
    name: "Tailwind CSS",
    justification: "Consistencia visual a velocidad de desarrollo real",
    color: "#06B6D4",
  },
  {
    name: "Three.js",
    justification: "Interfaces que los competidores no pueden igualar con CSS",
    color: "#000000",
  },
  {
    name: "PostgreSQL",
    justification: "Transacciones ACID para datos de negocio críticos",
    color: "#336791",
  },
  {
    name: "Prisma",
    justification: "Type-safety desde la base de datos hasta el componente",
    color: "#2D3748",
  },
  {
    name: "Resend",
    justification: "Entregabilidad de email con API limpia, sin SMTP frágil",
    color: "#000000",
  },
  {
    name: "Docker",
    justification: "Paridad exacta entre desarrollo y producción",
    color: "#2496ED",
  },
  {
    name: "Zod",
    justification: "Validación de datos con inferencia TypeScript automática",
    color: "#3E67B1",
  },
];

// ───────────────────────────────────────────────────────────────
// CONTACTO
// ───────────────────────────────────────────────────────────────
export const CONTACT = {
  titulo: "¿Tienes un proyecto en mente?",
  descripcion:
    "Cuéntame qué necesitas y responderé en menos de 24 horas con una evaluación inicial. Sin compromiso, sin letra pequeña.",
  boton: "Iniciar conversación",
  nota: "Respondo personalmente cada mensaje — nada de respuestas automáticas.",
  placeholderMensaje:
    "Describe tu proyecto: qué tipo de negocio manejas, qué problema buscas resolver y si tienes un timeline en mente...",
  successTitle: "¡Mensaje enviado!",
  successMessage:
    "Recibirás una respuesta en menos de 24 horas. Revisa tu bandeja de entrada (y spam, por si acaso).",
};
