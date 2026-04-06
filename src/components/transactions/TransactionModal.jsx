import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import useStore from '../../store/useStore';

const INITIAL_FORM = {
  date: new Date().toISOString().slice(0, 10),
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food & Dining',
};

export default function TransactionModal({ open, onClose, editTransaction }) {
  const addTransaction = useStore((s) => s.addTransaction);
  const updateTransaction = useStore((s) => s.updateTransaction);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTransaction) {
      setForm({
        date: editTransaction.date,
        description: editTransaction.description,
        amount: String(editTransaction.amount),
        type: editTransaction.type,
        category: editTransaction.category,
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editTransaction, open]);

  if (!open) return null;

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a positive number';
    if (!form.date) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const txnData = {
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(Number(form.amount).toFixed(2)),
      type: form.type,
      category: form.category,
    };

    if (editTransaction) {
      updateTransaction(editTransaction.id, txnData);
    } else {
      addTransaction(txnData);
    }
    onClose();
  };

  const categories = form.type === 'income' ? CATEGORIES.income : CATEGORIES.expense;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 animate-slide-up">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {editTransaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Type
            </label>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setForm((f) => ({
                      ...f,
                      type: t,
                      category: t === 'income' ? CATEGORIES.income[0] : CATEGORIES.expense[0],
                    }));
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    form.type === t
                      ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={`input ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="e.g., Grocery Store"
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className={`input ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="select w-full"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className={`input ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              {editTransaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
