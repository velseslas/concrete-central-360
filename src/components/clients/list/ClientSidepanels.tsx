
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ClientForm } from "../ClientForm";
import { DocumentsWidget } from "../widgets/DocumentsWidget";
import { ProjectListSection } from "../widgets/ProjectListSection";

interface ClientSidepanelsProps {
  selectedClient: any | null;
  setSelectedClient: (client: any | null) => void;
  showProjectList: boolean;
  setShowProjectList: (show: boolean) => void;
  showDocuments: boolean;
  setShowDocuments: (show: boolean) => void;
  isNewClientDialogOpen: boolean;
  setIsNewClientDialogOpen: (open: boolean) => void;
}

export function ClientSidepanels({
  selectedClient,
  setSelectedClient,
  showProjectList,
  setShowProjectList,
  showDocuments,
  setShowDocuments,
  isNewClientDialogOpen,
  setIsNewClientDialogOpen
}: ClientSidepanelsProps) {
  
  if (!selectedClient && !isNewClientDialogOpen) {
    return null;
  }
  
  return (
    <>
      {selectedClient && (
        <>
          <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
              <ClientForm clientToEdit={selectedClient} onSuccess={() => setSelectedClient(null)} />
            </SheetContent>
          </Sheet>
          
          {showProjectList && (
            <Sheet open={showProjectList} onOpenChange={setShowProjectList}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
                <ProjectListSection projects={[]} />
              </SheetContent>
            </Sheet>
          )}

          {showDocuments && (
            <Sheet open={showDocuments} onOpenChange={setShowDocuments}>
              <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-[#101422] border-[#1F2232]">
                <DocumentsWidget />
              </SheetContent>
            </Sheet>
          )}
        </>
      )}

      <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#101422] border-[#1F2232]">
          <ClientForm onSuccess={() => setIsNewClientDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
