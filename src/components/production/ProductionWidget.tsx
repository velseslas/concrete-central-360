import React from 'react';

interface ProductionWidgetProps {
  // Vous pouvez ajouter ici d'autres props si nécessaire
}

export function ProductionWidget({}: ProductionWidgetProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Production</h3>
        {/* Contenu du widget de production */}
      </div>
    </div>
  );
}