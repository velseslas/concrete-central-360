
import React from 'react';

export function ReceiptPrintStyles() {
  return (
    <style>
      {`
        @media print {
          @page { size: A4; margin: 20mm; }
          body * { visibility: hidden; }
          .print-content, .print-content * { visibility: visible; }
          .no-print, .no-print * { display: none !important; }
          .print-content { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}
    </style>
  );
}
