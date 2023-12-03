// libs needed
import React from 'react';
import categories from '../constants/uses';
import { useTranslation } from 'react-i18next';
import PageWrapper from '../hoc/PageWrapper';

function Uses() {
  const { t } = useTranslation()
  // Function to render all categories and their items
  const renderAll = () => {
    return categories.map((category, index) => (
      <div className='block' key={index}>
        {/* Display category name */}
        <h2 className='my-6'>{category.name}</h2>
        <ul className='ml-12'>
          {/* Map through items in the category */}
          {category.items.map((item, iIndex) => (
            <li key={iIndex}>
              {/* Link to item URL, opens in a new tab */}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <span> - </span>
              {/* Display item description */}
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div>
      {/* Title and introductory text */}
      <h1 className='uses'>{t('UsesSecTitle')}</h1>
      <p className="my-5">
        {t('UsesSecDescription1')}{' '}
        <strong>{t('UsesSecDescription2')}</strong>
        {t('UsesSecDescription3')}<strong>{t('UsesSecDescription4')}</strong> 
        {t('UsesSecDescription5')}
      </p>
          
      {/* Render categories and items */}
      {renderAll()}
    </div>
  );
}

export default PageWrapper(Uses);