
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, MapPin, Phone, UserCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EmployeeDetailsProps {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    status: string;
    startDate: string;
    imageUrl?: string;
    address?: string;
    emergencyContact?: string;
    bankDetails?: string;
    nationalId?: string;
    birthDate?: string;
    notes?: string;
  };
}

export function EmployeeDetails({ employee }: EmployeeDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="py-4">
      <div className="flex flex-col items-center mb-6">
        {employee.imageUrl ? (
          <img 
            src={employee.imageUrl} 
            alt={`${employee.firstName} ${employee.lastName}`} 
            className="h-24 w-24 rounded-full object-cover border-4 border-gray-700"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center">
            <UserCircle className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <h2 className="mt-4 text-xl font-bold">{employee.firstName} {employee.lastName}</h2>
        <div className="text-gray-400">{employee.position}</div>
        <Badge 
          variant={employee.status === 'active' ? 'default' : 'destructive'}
          className={`mt-2 ${employee.status === 'active' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {employee.status === 'active' ? 'Actif' : 'Inactif'}
        </Badge>
      </div>
      
      <Separator className="my-4 bg-gray-700" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Informations personnelles</h3>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{employee.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-300">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{employee.phone}</span>
          </div>
          
          {employee.address && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{employee.address}</span>
            </div>
          )}
          
          {employee.birthDate && (
            <div className="flex items-center gap-2 text-gray-300">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              <span>Né(e) le {formatDate(employee.birthDate)}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Informations professionnelles</h3>
          
          <div className="text-gray-300">
            <span className="text-gray-400">Département:</span> {employee.department}
          </div>
          
          <div className="text-gray-300">
            <span className="text-gray-400">Date d'embauche:</span> {formatDate(employee.startDate)}
          </div>
          
          {employee.nationalId && (
            <div className="text-gray-300">
              <span className="text-gray-400">N° d'identité:</span> {employee.nationalId}
            </div>
          )}
          
          {employee.bankDetails && (
            <div className="text-gray-300">
              <span className="text-gray-400">Coordonnées bancaires:</span> {employee.bankDetails}
            </div>
          )}
        </div>
      </div>
      
      {employee.emergencyContact && (
        <>
          <Separator className="my-4 bg-gray-700" />
          <div>
            <h3 className="text-lg font-medium mb-2">Contact d'urgence</h3>
            <p className="text-gray-300">{employee.emergencyContact}</p>
          </div>
        </>
      )}
      
      {employee.notes && (
        <>
          <Separator className="my-4 bg-gray-700" />
          <div>
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <p className="text-gray-300">{employee.notes}</p>
          </div>
        </>
      )}
    </div>
  );
}
