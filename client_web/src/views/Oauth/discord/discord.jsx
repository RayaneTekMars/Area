import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DiscordPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token)
      throw new Error('Le token JWT est manquant');
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (!code)
      throw new Error('Le code est manquant dans l\'URL');

    fetch('https://api.automateme.fr/subscriptions/discord', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    })
      .then(response => {
        if (!response.ok)
          throw new Error('La requête a échoué');
      })
      .then(data => {
        console.log(data);
        navigate('/home');
      })
      .catch(error => {
        console.error(error);
      });
  }, [navigate]);

  return <div>En attente de la réponse...</div>;
}

export default DiscordPage;
