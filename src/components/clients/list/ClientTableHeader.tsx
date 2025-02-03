import { motion } from "framer-motion";

export function ClientTableHeader() {
  return (
    <thead className="text-xs uppercase bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border-b border-gray-700/50">
      <tr>
        <th className="px-6 py-4 text-white font-medium">Nom</th>
        <th className="px-6 py-4 text-white font-medium">Raison sociale</th>
        <th className="px-6 py-4 text-white font-medium">Téléphone</th>
        <th className="px-6 py-4 text-white font-medium">Email</th>
        <th className="px-6 py-4 text-white font-medium">Ville</th>
        <th className="px-6 py-4 text-white font-medium">Actions</th>
      </tr>
    </thead>
  );
}