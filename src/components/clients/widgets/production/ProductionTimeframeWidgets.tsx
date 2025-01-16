import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { useState } from "react";
import { Calendar, CalendarDays, CalendarRange, CalendarClock } from "lucide-react";
import { ProductionSheetTitle } from "@/components/production/sheets/ProductionSheetTitle";
import { ProductionSheetContent } from "@/components/production/sheets/ProductionSheetContent";
import { useProduction } from "./useProduction";
import { Production } from "./types";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, endOfDay, endOfWeek, endOfMonth, endOfYear } from "date-fns";

interface ProductionItem {
  id: string;
  client: string;
  formulation: string;
  volume: number;
  date: string;
}

export function ProductionTimeframeWidgets() {
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);
  const [isMonthlyOpen, setIsMonthlyOpen] = useState(false);
  const [isYearlyOpen, setIsYearlyOpen] = useState(false);
  const { productions } = useProduction();

  const filterProductionsByTimeframe = (start: Date, end: Date) => {
    return productions.filter(production => {
      const productionDate = new Date(production.start_date || '');
      return productionDate >= start && productionDate <= end;
    });
  };

  const mapProductionsToItems = (productions: Production[]): ProductionItem[] => {
    return productions.map(production => ({
      id: production.order_id,
      client: production.client,
      formulation: production.formulation,
      volume: production.volume,
      date: production.start_date || new Date().toISOString(),
    }));
  };

  const now = new Date();
  const dailyProductions = filterProductionsByTimeframe(startOfDay(now), endOfDay(now));
  const weeklyProductions = filterProductionsByTimeframe(startOfWeek(now), endOfWeek(now));
  const monthlyProductions = filterProductionsByTimeframe(startOfMonth(now), endOfMonth(now));
  const yearlyProductions = filterProductionsByTimeframe(startOfYear(now), endOfYear(now));

  const timeframeCards = [
    {
      title: "Production du jour",
      icon: Calendar,
      iconColor: "text-blue-400",
      productions: dailyProductions,
      isOpen: isDailyOpen,
      setIsOpen: setIsDailyOpen,
    },
    {
      title: "Production de la semaine",
      icon: CalendarDays,
      iconColor: "text-green-400",
      productions: weeklyProductions,
      isOpen: isWeeklyOpen,
      setIsOpen: setIsWeeklyOpen,
    },
    {
      title: "Production du mois",
      icon: CalendarRange,
      iconColor: "text-purple-400",
      productions: monthlyProductions,
      isOpen: isMonthlyOpen,
      setIsOpen: setIsMonthlyOpen,
    },
    {
      title: "Production de l'année",
      icon: CalendarClock,
      iconColor: "text-yellow-400",
      productions: yearlyProductions,
      isOpen: isYearlyOpen,
      setIsOpen: setIsYearlyOpen,
    },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timeframeCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index}>
              <Card 
                className="cursor-pointer hover:scale-105 transition-all duration-300 bg-gray-900/50 backdrop-blur-xl border-gray-800 hover:border-gray-700"
                onClick={() => card.setIsOpen(true)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-100">
                    <div className={`p-2 rounded-lg bg-gray-800/50 group-hover:scale-110 transition-transform duration-300 ${card.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">
                    {card.productions.length}
                  </p>
                  <p className="text-gray-400">productions</p>
                </CardContent>
              </Card>

              <Sheet open={card.isOpen} onOpenChange={card.setIsOpen}>
                <SheetContent side="right" className="w-full sm:w-[540px] bg-gray-900 border-gray-800 text-white">
                  <SheetHeader>
                    <ProductionSheetTitle 
                      icon={card.icon}
                      title={card.title}
                      iconColor={card.iconColor}
                    />
                  </SheetHeader>
                  <ProductionSheetContent items={mapProductionsToItems(card.productions)} />
                </SheetContent>
              </Sheet>
            </div>
          );
        })}
      </div>
    </div>
  );
}