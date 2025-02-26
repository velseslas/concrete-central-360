
import { Vehicle } from "@/types/vehicle";

export const vehiclesData: Vehicle[] = [
  {
    id: 1,
    name: "Camion Benne #1",
    plate: "AB-124-CD",
    status: "available",
    brand: "Volvo",
    model: "FH16",
    year: "2020",
    type: "Camion Benne",
    vehicle_number: "V-123456"
  },
  {
    id: 2,
    name: "Camion Benne #2",
    plate: "AB-125-CD",
    status: "maintenance",
    brand: "Renault",
    model: "T High",
    year: "2021", 
    type: "Camion Benne",
    vehicle_number: "V-123457"
  },
  {
    id: 3,
    name: "Chargeuse #1",
    plate: "AB-126-CD",
    status: "unavailable",
    brand: "Caterpillar",
    model: "966M",
    year: "2019",
    type: "Chargeuse",
    vehicle_number: "V-123458"
  },
  {
    id: 4,
    name: "Pelleteuse #1",
    plate: "AB-127-CD",
    status: "available",
    brand: "JCB",
    model: "3CX",
    year: "2022",
    type: "Pelleteuse",
    vehicle_number: "V-123459"
  },
  {
    id: 5,
    name: "Niveleuse #1",
    plate: "AB-128-CD",
    status: "available",
    brand: "Komatsu",
    model: "GD705-5",
    year: "2021",
    type: "Niveleuse",
    vehicle_number: "V-123460"
  }
];
