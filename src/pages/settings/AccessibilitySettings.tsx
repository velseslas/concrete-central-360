
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accessibility, ArrowLeft, CheckCircle2, Sun, Moon, MonitorSmartphone, TextCursor, Type, Eye } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

export default function AccessibilitySettings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Theme settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  
  // Text settings
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  
  // Motion settings
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(100);
  
  // Focus settings
  const [focusHighlight, setFocusHighlight] = useState(true);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Paramètres d'accessibilité mis à jour avec succès");
    }, 1500);
    
    console.log("Accessibility settings saved:", {
      theme,
      fontSize,
      highContrast,
      reducedMotion,
      animationSpeed,
      focusHighlight
    });
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
            <div className="p-3 rounded-lg bg-purple-100">
              <Accessibility className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Accessibilité</h1>
              <p className="text-gray-400 mt-1">Options d'accessibilité de l'interface</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Thème et affichage
            </CardTitle>
            <CardDescription className="text-gray-400">
              Personnalisez l'apparence de l'application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-white text-sm mb-3 block">Thème</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border ${theme === 'light' ? 'border-purple-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors flex flex-col items-center gap-2`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-8 w-8 text-yellow-400" />
                    <span className="text-white text-sm">Clair</span>
                  </div>
                  
                  <div 
                    className={`border ${theme === 'dark' ? 'border-purple-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors flex flex-col items-center gap-2`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-8 w-8 text-blue-400" />
                    <span className="text-white text-sm">Sombre</span>
                  </div>
                  
                  <div 
                    className={`border ${theme === 'system' ? 'border-purple-500 bg-gray-700' : 'border-gray-700 bg-gray-800'} rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors flex flex-col items-center gap-2`}
                    onClick={() => setTheme('system')}
                  >
                    <MonitorSmartphone className="h-8 w-8 text-gray-400" />
                    <span className="text-white text-sm">Système</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-white text-sm">Contraste élevé</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`px-3 py-1 h-auto ${
                      highContrast 
                        ? 'bg-purple-900 text-purple-100 border-purple-700' 
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                    onClick={() => setHighContrast(!highContrast)}
                  >
                    {highContrast ? 'Activé' : 'Désactivé'}
                  </Button>
                </div>
                <p className="text-gray-400 text-xs">
                  Améliore la lisibilité avec un contraste plus fort entre les textes et les fonds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Type className="h-5 w-5 text-blue-500" />
              Texte et lisibilité
            </CardTitle>
            <CardDescription className="text-gray-400">
              Ajustez les options de texte pour améliorer la lisibilité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-white text-sm">Taille du texte</Label>
                  <span className="text-white text-xs bg-gray-700 px-2 py-1 rounded">
                    {fontSize}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TextCursor className="h-4 w-4 text-gray-400" />
                  <Slider
                    value={[fontSize]}
                    min={75}
                    max={150}
                    step={5}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="flex-1"
                  />
                  <TextCursor className="h-6 w-6 text-gray-400" />
                </div>
                <div className="mt-4 p-3 border border-gray-700 rounded-md bg-gray-900">
                  <p className={`text-white ${fontSize < 100 ? 'text-sm' : fontSize === 100 ? 'text-base' : 'text-lg'}`}>
                    Exemple de texte
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-500" />
              Focus et navigation
            </CardTitle>
            <CardDescription className="text-gray-400">
              Options pour améliorer la navigation au clavier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-white text-sm">Mise en évidence du focus</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`px-3 py-1 h-auto ${
                      focusHighlight 
                        ? 'bg-purple-900 text-purple-100 border-purple-700' 
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                    onClick={() => setFocusHighlight(!focusHighlight)}
                  >
                    {focusHighlight ? 'Activé' : 'Désactivé'}
                  </Button>
                </div>
                <p className="text-gray-400 text-xs mb-4">
                  Affiche une bordure visible autour de l'élément actif lors de la navigation au clavier
                </p>
                
                <div className="mt-2 p-3 border border-gray-700 rounded-md bg-gray-900">
                  <div className="space-y-2">
                    <div className={`p-2 ${focusHighlight ? 'outline outline-2 outline-purple-500' : ''} rounded-md bg-gray-800`}>
                      Élément actuellement sélectionné
                    </div>
                    <div className="p-2 rounded-md bg-gray-800">
                      Élément non sélectionné
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <MonitorSmartphone className="h-5 w-5 text-orange-500" />
              Animation et mouvement
            </CardTitle>
            <CardDescription className="text-gray-400">
              Contrôlez les animations et les effets visuels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-white text-sm">Réduire les animations</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`px-3 py-1 h-auto ${
                      reducedMotion 
                        ? 'bg-purple-900 text-purple-100 border-purple-700' 
                        : 'bg-gray-700 text-gray-300 border-gray-600'
                    }`}
                    onClick={() => setReducedMotion(!reducedMotion)}
                  >
                    {reducedMotion ? 'Activé' : 'Désactivé'}
                  </Button>
                </div>
                <p className="text-gray-400 text-xs mb-4">
                  Réduit ou désactive les animations et les transitions pour limiter les distractions
                </p>
                
                {!reducedMotion && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-white text-sm">Vitesse des animations</Label>
                      <span className="text-white text-xs bg-gray-700 px-2 py-1 rounded">
                        {animationSpeed}%
                      </span>
                    </div>
                    <Slider
                      value={[animationSpeed]}
                      min={50}
                      max={150}
                      step={10}
                      onValueChange={(value) => setAnimationSpeed(value[0])}
                    />
                    <div className="mt-3 flex justify-between text-xs text-gray-400">
                      <span>Plus lent</span>
                      <span>Plus rapide</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-end">
        <motion.div whileTap={{ scale: 0.97 }}>
          <Button 
            onClick={handleSaveSettings}
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
                <span>Enregistrer les paramètres</span>
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
