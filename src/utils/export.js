export function exportToCSV(transactions, filename = 'transactions.csv') {
  const headers = ['Date', 'Description', 'Amount', 'Type', 'Category'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.amount.toFixed(2),
    t.type,
    t.category,
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadFile(csv, filename, 'text/csv');
}

export function exportToJSON(transactions, filename = 'transactions.json') {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, filename, 'application/json');
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
