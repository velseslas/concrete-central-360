
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

interface CompanyFormValues {
  name: string;
  legalName: string;
  rc: string;
  articleImpo: string;
  nif: string;
  nis: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  rib: string;
  bank: string;
  bankAddress: string;
  logo: string;
}

export default function CompanySettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<CompanyFormValues>({
    defaultValues: {
      name: "BetaPlus",
      legalName: "5,000,000 DA",
      rc: "12345678901234",
      articleImpo: "FR12345678901",
      nif: "123456789012345",
      nis: "987654321098765",
      address: "123 Rue du Béton",
      city: "Lyon",
      postalCode: "69000",
      country: "France",
      phone: "+33 4 56 78 90 12",
      email: "contact@betaplus.fr",
      website: "www.betaplus.fr",
      rib: "12345678901234567890",
      bank: "Banque Nationale",
      bankAddress: "45 Avenue Financière, Lyon",
      logo: "",
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Informations de l'entreprise mises à jour avec succès");
    }, 1500);
    
    console.log("Form submitted:", data);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux paramètres
        </Button>
        
        <div className="relative mb-10 bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Paramètres entreprise</h1>
              <p className="text-gray-400 mt-1">Gérez les informations de votre entreprise</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">Informations générales</CardTitle>
              <CardDescription className="text-gray-400">
                Ces informations apparaîtront sur vos documents officiels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Nom commercial</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nom de l'entreprise" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="legalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Capital social</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Capital social" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="rc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">RC</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="RC" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="articleImpo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">ARTICLE IMPO</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="ARTICLE IMPO" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nif"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">NIF</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="NIF" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="nis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">NIS</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="NIS" 
                              className="bg-gray-700 border-gray-600 text-white"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Adresse</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Rue</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Adresse" 
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="md:col-span-1">
                                <FormLabel className="text-white">Ville</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Ville" 
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem className="md:col-span-1">
                                <FormLabel className="text-white">Code postal</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Code postal" 
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="md:col-span-1">
                                <FormLabel className="text-white">Pays</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Pays" 
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Téléphone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Téléphone" 
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="Email" 
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Site web</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Site web" 
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-white mb-4">Coordonnées bancaires</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="rib"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">RIB</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="RIB" 
                                  className="bg-gray-700 border-gray-600 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="bank"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Banque</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Banque" 
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bankAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">Adresse de la banque</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Adresse de la banque" 
                                    className="bg-gray-700 border-gray-600 text-white"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <motion.div whileTap={{ scale: 0.97 }}>
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Enregistrement...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Enregistrer les modifications</span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-800 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Logo</CardTitle>
              <CardDescription className="text-gray-400">
                Logo de votre entreprise affiché sur les documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-900">
                {logoPreview ? (
                  <div className="relative group">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="max-w-full max-h-[200px] object-contain mb-4"
                    />
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => setLogoPreview(null)}
                    >
                      <span className="text-white text-sm">Supprimer</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-full bg-gray-800 mb-4">
                    <Building2 className="h-12 w-12 text-gray-500" />
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-white text-sm font-medium">
                    {logoPreview ? "Remplacer le logo" : "Ajouter un logo"}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    PNG, JPG ou SVG, max 2MB
                  </p>
                </div>
                
                <Label 
                  htmlFor="logo-upload" 
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm transition-colors"
                >
                  Parcourir...
                </Label>
                <Input 
                  id="logo-upload" 
                  type="file" 
                  accept="image/png,image/jpeg,image/svg+xml"
                  className="hidden" 
                  onChange={handleLogoChange}
                />
              </div>
              
              <div className="rounded-lg bg-blue-900/20 p-4 border border-blue-800">
                <div className="flex gap-2">
                  <div className="bg-blue-600 rounded-full p-1 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-blue-300 text-sm">
                    Le logo apparaîtra sur vos factures, devis et autres documents officiels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
