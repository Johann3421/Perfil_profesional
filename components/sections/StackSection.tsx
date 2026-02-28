"use client";

import { motion } from "framer-motion";
import { STACK_DATA } from "@/lib/content";

const STACK_ICONS: Record<string, React.ReactNode> = {
  "Next.js": (
    <svg viewBox="0 0 180 180" fill="none" className="h-10 w-10">
      <mask id="mask0" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0)">
        <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1)" />
      </g>
      <defs>
        <linearGradient id="paint0" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 54 33" className="h-8 w-10">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        fill="#06B6D4"
      />
    </svg>
  ),
  "Three.js": (
    <svg viewBox="0 0 640 640" className="h-10 w-10">
      <path d="M320 0L640 640H0L320 0z" fill="white" fillOpacity="0.9" />
      <path d="M320 64L592 608H48L320 64z" fill="none" stroke="white" strokeWidth="8" strokeOpacity="0.5" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 25.6 25.6" className="h-10 w-10">
      <g fill="currentColor">
        <path d="M18.983 18.636c-.163 1.198-.472 1.752-.858 2.204-.545.637-1.492.964-2.427.984-.219.005-.42-.023-.612-.077l.143-.671c.167.034.364.052.573.043.696-.029 1.286-.313 1.658-.716.327-.354.508-.82.642-1.736l.38-2.57c.18-1.214.42-2.157.724-2.935.302-.775.67-1.398 1.205-1.907-.414-.244-.727-.607-.91-1.063-.2-.503-.252-1.05-.126-1.673.085-.42.232-.8.432-1.14a3.2 3.2 0 011.015-1.07c-.032-.135-.051-.276-.051-.42 0-.45.127-.896.367-1.286-.476-.116-.94-.295-1.376-.535a6.38 6.38 0 01-2.172-1.921c-.52-.735-.868-1.603-1.004-2.545a7 7 0 01-.022-1.647c-1.155.157-2.223.594-3.099 1.306a5.87 5.87 0 00-1.67 2.223 5.86 5.86 0 00-.483 1.942l-.025.313-.313-.025a5.8 5.8 0 00-1.945.247 5.87 5.87 0 00-2.346 1.388 5.87 5.87 0 00-1.526 2.72c-.23.913-.237 1.885-.052 2.805.344 1.707 1.375 3.176 2.867 4.094a6.32 6.32 0 002.424.92c-.028.273-.04.548-.037.824.01.744.137 1.494.39 2.19.251.694.627 1.345 1.124 1.9a6.3 6.3 0 001.752 1.395c.66.371 1.39.631 2.146.75.418.065.836.09 1.25.072a6.33 6.33 0 003.395-1.18l.036-.026c.046.179.098.354.152.523z" opacity="0.5"/>
      </g>
      <text x="12.8" y="18" textAnchor="middle" fill="#336791" fontSize="10" fontWeight="bold" fontFamily="Arial">P</text>
    </svg>
  ),
  Prisma: (
    <svg viewBox="0 0 159 194" className="h-10 w-8">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.57 131.399L68.076 3.576c2.93-5.712 11.088-6.352 14.864-1.166l72.724 99.862c2.89 3.968 1.835 9.528-2.355 12.09l-87.37 53.395c-2.675 1.634-5.993 1.623-8.655-.03l-52.26-32.425c-4.957-3.076-5.662-10.087-1.354-14.116l.58-.54z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  ),
  Resend: (
    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 font-bold text-lg">
      R
    </div>
  ),
  Docker: (
    <svg viewBox="0 0 256 185" className="h-9 w-12">
      <g>
        <path
          d="M250.716 70.497c-5.437-3.725-17.886-5.069-27.449-3.199-1.227-9.404-6.293-17.607-15.333-24.968l-5.208-3.725-3.695 5.267c-4.696 7.032-7.451 16.804-6.649 26.329.363 3.479 1.477 9.717 5.233 15.185-3.67 2.047-10.87 4.849-20.399 4.665H.6l-.207 1.256c-1.176 7.088-1.168 29.178 13.234 46.153C24.165 149.993 41.054 156 63.5 156c47.81 0 83.207-22.136 99.742-62.39 6.513.13 20.534.08 27.735-13.806.187-.322 2.6-5.316 3.34-6.875l-3.6-2.432z"
          fill="#2496ED"
        />
        <path fill="#2496ED" d="M31 90h22v21H31zM57 90h22v21H57zM83 90h22v21H83zM109 90h22v21h-22zM57 66h22v21H57zM83 66h22v21H83zM109 66h22v21h-22zM83 42h22v21H83zM135 90h22v21h-22z" />
      </g>
    </svg>
  ),
  Zod: (
    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600/20 font-bold text-lg text-blue-400">
      Z
    </div>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function StackSection() {
  return (
    <section id="stack" className="py-24 sm:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stack técnico con propósito
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada tecnología en este stack está elegida por un motivo específico.
            No sigo tendencias — elijo herramientas que resuelven problemas reales.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {STACK_DATA.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_20px_-5px_hsl(217_91%_60%_/_0.1)]"
            >
              <div className="mb-4 text-foreground transition-transform duration-300 group-hover:scale-110">
                {STACK_ICONS[tech.name] || (
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                    {tech.name[0]}
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-base mb-2">{tech.name}</h3>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {tech.justification}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
