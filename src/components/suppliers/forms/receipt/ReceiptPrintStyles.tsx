
export function ReceiptPrintStyles() {
  return (
    <style>
      {`
        @media print {
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
          .print-content {
            padding: 0 !important;
          }
          [role="dialog"] button[type="button"] {
            display: none !important;
          }
        }
      `}
    </style>
  );
}
