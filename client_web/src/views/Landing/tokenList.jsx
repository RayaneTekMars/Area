import React, { useState, useEffect } from 'react';
import '../../styles/token.css';
import binIcon from '../../assets/bin-icon.png';
import axios from 'axios';

const formatExpirationDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatLastActive = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const hours = Math.floor((now - date) / (1000 * 60 * 60));
  return `${hours} hours ago`;
};

const TokenList = ({ tokens, activeTokenId, onTokenSelect }) => {
  const [tokenList, setTokenList] = useState(tokens);

  useEffect(() => {
    setTokenList(tokens);
  }, [tokens]);

  const handleDelete = (token) => {
    const jwt = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    axios.delete(`https://api.automateme.fr/token/${token.id}`, config)
      .then(response => {
        console.log(response);
        // Remove the deleted token from the list
        const updatedTokenList = tokenList.filter(t => t.id !== token.id);
        setTokenList(updatedTokenList);
      })
      .catch(error => {
        console.log(error);
        // handle error response here
      });
  };

  return (
    <div className="token-list-container">
      <ul className="token-list">
        {tokenList.map((token) => (
          <li key={token.id} className={`token-item ${token.id === activeTokenId ? 'active' : ''}`}>
            <div className="token-name" onClick={() => onTokenSelect(token.id)}>{token.name}</div>
            <div className="token-expiration">
              Expiration date: {formatExpirationDate(token.expiresAt)}
            </div>
            <div className="token-last-active">
              Last active: {formatLastActive(token.lastActive)}
            </div>
            <button
              className="bin-icon-container"
              onClick={() => handleDelete(token)}
            >
              <img src={binIcon} alt="Delete" className="bin-icon" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList;
