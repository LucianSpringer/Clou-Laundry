import { LucideIcon } from 'lucide-react';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  priceStart: string;
  benefits?: string[];
  faqs?: ServiceFAQ[];
}

export interface PriceItem {
  service: string;
  unit: string;
  price: string;
  category: 'Wash & Fold' | 'Dry Cleaning' | 'Household' | 'Commercial';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
  rating: number;
  date: string;
}

export enum BookingStep {
  CALCULATOR = 0,
  SERVICE_SELECTION = 1,
  PREFERENCES = 2,
  DATE_TIME = 3,
  DETAILS = 4,
  PAYMENT = 5,
  CONFIRMATION = 6,
}

export interface BookingData {
  services: string[];
  items: { [key: string]: number }; // For calculator
  estimatedWeight: number; // For calculator
  scent: string;
  isRush: boolean;
  ownDetergent: boolean;
  tipAmount: number;
  date: string;
  timeSlot: string;
  name: string;
  address: string;
  phone: string;
  notes: string;
  paymentMethod: 'stripe' | 'paypal' | 'cash' | 'crypto';
}

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  color: string;
  benefits: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
}

export interface OrderHistoryItem {
  id: string;
  date: string;
  items: string[];
  total: string;
  status: 'Placed' | 'Scheduled' | 'In Progress' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  rating?: number;
  photoInventory?: string[]; // Array of image URLs
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  frequency: 'Weekly' | 'Bi-Weekly';
  bagSize: string;
  features: string[];
  popular?: boolean;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time';
  location: string;
}

export interface GiftCardDesign {
  id: string;
  name: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  before: string;
  after: string;
  category: string;
}

export interface ScentOption {
  id: string;
  name: string;
  description: string;
  price: number;
}