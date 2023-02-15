import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GithubPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Récupération du token JWT dans le local storage
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error('Le token JWT est manquant');
    }

    // Récupération du code dans l'URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (!code) {
      throw new Error('Le code est manquant dans l\'URL');
    }

    // Envoie de la requête POST
    fetch('http://localhost:8080/subscriptions/github', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    })
      .then(response => {
        // Vérification de la réponse
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(data => {
        // Traitement de la réponse
        console.log(data);
        // Redirection vers la route /home
        navigate('/home');
      })
      .catch(error => {
        // Gestion des erreurs
        console.error(error);
      });
  }, [navigate]);

  return <div>En attente de la réponse...</div>;
}

export default GithubPage;
