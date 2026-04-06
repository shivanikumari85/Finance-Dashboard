import { format, parseISO } from 'date-fns';

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  return format(parseISO(dateStr), 'MMM dd, yyyy');
}

export function formatMonth(dateStr) {
  return format(parseISO(dateStr), 'MMM yyyy');
}

export function formatShortMonth(dateStr) {
  return format(parseISO(dateStr), 'MMM');
}

export function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}
