import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export const orderSchema = z.object({
  pickupAddress: z.string().min(5, "L'adresse de récupération est requise"),
  pickupCity: z.string().min(2, "La ville de récupération est requise"),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise"),
  destinationCity: z.string().min(2, "La ville de destination est requise"),
  recipientName: z.string().min(2, "Le nom du destinataire est requis"),
  recipientPhone: z.string().min(8, "Le téléphone du destinataire est requis"),
  packageType: z.enum(['document', 'petit_colis', 'moyen_colis', 'gros_colis', 'fragile'], {
    errorMap: () => ({ message: "Type de colis invalide" })
  }),
  packageDescription: z.string().optional(),
  weight: z.number().optional(),
  quantity: z.number().min(1, "La quantité doit être au moins 1"),
  paymentMethod: z.enum(['cash', 'mobile_money', 'card'], {
    errorMap: () => ({ message: "Méthode de paiement invalide" })
  }),
});

export const supportTicketSchema = z.object({
  subject: z.string().min(5, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  email: z.string().email('Adresse email invalide').optional(),
  phone: z.string().min(8, 'Numéro de téléphone invalide').optional(),
});

export const profileSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
});

export const pricingSchema = z.object({
  basePrice: z.number().min(0, "Le prix de base doit être positif"),
  pricePerKg: z.number().min(0, "Le prix par kg doit être positif"),
  minPrice: z.number().min(0, "Le prix minimum doit être positif"),
  surcharge: z.number().min(0, "Le supplément doit être positif"),
});
