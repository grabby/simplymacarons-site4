// Custom type definitions for our toast system
export type ToastType = 'success' | 'error' | 'info';

export interface CustomToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}