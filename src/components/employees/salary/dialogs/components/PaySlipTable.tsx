
import { Employee } from "../../types";
import { SalaryDetails } from "../../types";

interface PaySlipTableProps {
  selectedEmployee: Employee;
  salary: SalaryDetails;
  bonusPerCubicMeter: string;
}

export function PaySlipTable({
  selectedEmployee,
  salary,
  bonusPerCubicMeter
}: PaySlipTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left py-2 px-2">Description</th>
          <th className="text-right py-2 px-2">Montant (DA)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-2">Salaire de base</td>
          <td className="text-right py-2 px-2">{selectedEmployee.baseSalary.toLocaleString('fr-FR')}</td>
        </tr>
        {(selectedEmployee.overtime || 0) > 0 && (
          <tr>
            <td className="py-2 px-2">Heures supplémentaires ({selectedEmployee.overtime}h)</td>
            <td className="text-right py-2 px-2">{parseInt(salary.overtimePay).toLocaleString('fr-FR')}</td>
          </tr>
        )}
        {selectedEmployee.position === "Commercial" && (selectedEmployee.salesVolume || 0) > 0 && (
          <tr>
            <td className="py-2 px-2">Prime de vente ({selectedEmployee.salesVolume} m³ × {bonusPerCubicMeter} DA)</td>
            <td className="text-right py-2 px-2">{parseInt(salary.salesBonus).toLocaleString('fr-FR')}</td>
          </tr>
        )}
        {(selectedEmployee.absences || 0) > 0 && (
          <tr>
            <td className="py-2 px-2 text-red-500">Déduction absences ({selectedEmployee.absences} jour(s))</td>
            <td className="text-right py-2 px-2 text-red-500">-{salary.absencesDeduction.toLocaleString('fr-FR')}</td>
          </tr>
        )}
        {(selectedEmployee.advances || 0) > 0 && (
          <tr>
            <td className="py-2 px-2 text-red-500">Acomptes</td>
            <td className="text-right py-2 px-2 text-red-500">-{selectedEmployee.advances.toLocaleString('fr-FR')}</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr className="border-t border-gray-300">
          <td className="py-2 px-2 font-bold">Total Net à Payer</td>
          <td className="text-right py-2 px-2 font-bold">
            {parseInt(salary.finalSalary).toLocaleString('fr-FR')} DA
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
