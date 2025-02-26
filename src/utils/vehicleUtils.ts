
export const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500/20 text-green-400";
    case "maintenance":
      return "bg-orange-500/20 text-orange-400";
    case "unavailable":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "Disponible";
    case "maintenance":
      return "En maintenance";
    case "unavailable":
      return "Indisponible";
    default:
      return "Inconnu";
  }
};
