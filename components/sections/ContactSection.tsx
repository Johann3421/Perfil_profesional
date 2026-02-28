"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactFormSchema,
  type ContactFormValues,
  PROJECT_TYPES,
} from "@/lib/validations";
import { CONTACT } from "@/lib/content";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nombre: "",
      email: "",
      empresa: "",
      tipoProyecto: undefined,
      mensaje: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorMessage(
            result.error || "Ya recibimos tu mensaje. Intentá de nuevo en unos minutos."
          );
        } else if (response.status === 400) {
          setErrorMessage(
            result.error || "Revisá los datos del formulario e intentá de nuevo."
          );
        } else {
          setErrorMessage(
            result.error || "Hubo un error al enviar el mensaje. Intentá de nuevo."
          );
        }
        setFormState("error");
        return;
      }

      setFormState("success");
      reset();
    } catch {
      setErrorMessage(
        "No se pudo conectar con el servidor. Verificá tu conexión e intentá de nuevo."
      );
      setFormState("error");
    }
  };

  return (
    <section id="contacto" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {CONTACT.titulo}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            {CONTACT.descripcion}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 px-6 rounded-xl border border-green-500/20 bg-green-500/5"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {CONTACT.successTitle}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {CONTACT.successMessage}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFormState("idle")}
                >
                  Enviar otro mensaje
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Tu nombre completo"
                    {...register("nombre")}
                    disabled={formState === "loading"}
                    className={errors.nombre ? "border-destructive" : ""}
                  />
                  {errors.nombre && (
                    <p className="text-destructive text-sm">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    {...register("email")}
                    disabled={formState === "loading"}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa (opcional)</Label>
                  <Input
                    id="empresa"
                    placeholder="Nombre de tu empresa o startup"
                    {...register("empresa")}
                    disabled={formState === "loading"}
                  />
                </div>

                {/* Tipo de proyecto */}
                <div className="space-y-2">
                  <Label>Tipo de proyecto *</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("tipoProyecto", value as ContactFormValues["tipoProyecto"], {
                        shouldValidate: true,
                      })
                    }
                    disabled={formState === "loading"}
                  >
                    <SelectTrigger
                      className={
                        errors.tipoProyecto ? "border-destructive" : ""
                      }
                    >
                      <SelectValue placeholder="Selecciona el tipo de proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.tipoProyecto && (
                    <p className="text-destructive text-sm">
                      {errors.tipoProyecto.message}
                    </p>
                  )}
                </div>

                {/* Mensaje */}
                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje *</Label>
                  <Textarea
                    id="mensaje"
                    placeholder={CONTACT.placeholderMensaje}
                    rows={5}
                    {...register("mensaje")}
                    disabled={formState === "loading"}
                    className={errors.mensaje ? "border-destructive" : ""}
                  />
                  {errors.mensaje && (
                    <p className="text-destructive text-sm">
                      {errors.mensaje.message}
                    </p>
                  )}
                </div>

                {/* Error state */}
                <AnimatePresence>
                  {formState === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5"
                    >
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base rounded-full"
                  disabled={formState === "loading"}
                >
                  {formState === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {CONTACT.boton}
                    </>
                  )}
                </Button>

                {/* Trust note */}
                <p className="text-center text-xs text-muted-foreground">
                  {CONTACT.nota}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
