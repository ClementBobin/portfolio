// src/components/VeilleInformatique.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const VeilleInformatique = () => {
  const [wakeletData, setWakeletData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'YOUR_WAKELET_API_KEY';
        const collectionId = 'YOUR_WAKELET_COLLECTION_ID';

        const response = await axios.get(
          `https://api.wakelet.com/v1/collections/${collectionId}/items`,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );

        setWakeletData(response.data);
      } catch (error) {
        console.error('Error fetching data from Wakelet:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Veille Informatique</h2>
      <ul>
        {wakeletData.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VeilleInformatique;
