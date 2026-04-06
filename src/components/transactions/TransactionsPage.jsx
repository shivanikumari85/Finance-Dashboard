import { useState } from 'react';
import { Plus } from 'lucide-react';
import useStore from '../../store/useStore';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';
import TransactionModal from './TransactionModal';

export default function TransactionsPage() {
  const activeRole = useStore((s) => s.activeRole);
  const isAdmin = activeRole === 'admin';
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);

  const handleEdit = (txn) => {
    setEditingTxn(txn);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingTxn(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <TransactionFilters />
        {isAdmin && (
          <button
            onClick={() => {
              setEditingTxn(null);
              setModalOpen(true);
            }}
            className="btn-primary flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        )}
      </div>

      <div className="card p-4 sm:p-6">
        <TransactionTable onEdit={handleEdit} />
      </div>

      <TransactionModal
        open={modalOpen}
        onClose={handleClose}
        editTransaction={editingTxn}
      />
    </div>
  );
}
