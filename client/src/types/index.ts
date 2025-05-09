// This file defines shared types used across the client application

export interface ToastData {
  title?: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export interface NavLink {
  text: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

export interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
