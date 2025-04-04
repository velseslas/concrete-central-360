
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers le tableau de bord automatiquement
    navigate("/dashboard");
  }, [navigate]);

  return null; // Cette page n'affiche rien car elle redirige immédiatement
};

export default Index;
