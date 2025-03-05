
import React from "react";

interface ScheduleCellProps {
  shift: { shift: string; status: string } | null;
  getShiftColorClass: (shift: string) => string;
  getStatusColorClass: (status: string) => string;
}

export function ScheduleCell({ shift, getShiftColorClass, getStatusColorClass }: ScheduleCellProps) {
  if (!shift) {
    return (
      <button className="text-sm text-gray-400 hover:text-white">
        + Ajouter
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <span className={`px-2 py-1 rounded text-xs ${getShiftColorClass(shift.shift)}`}>
        {shift.shift === 'morning' ? 'Matin' : 
         shift.shift === 'afternoon' ? 'Après-midi' : 
         shift.shift === 'night' ? 'Nuit' : 'Repos'}
      </span>
      <span className={`px-2 py-1 rounded text-xs ${getStatusColorClass(shift.status)}`}>
        {shift.status === 'present' ? 'Présent' : 
         shift.status === 'absent' ? 'Absent' : 
         shift.status === 'late' ? 'En retard' : 'Non défini'}
      </span>
    </div>
  );
}
