// libs needed
import React from 'react';
import categories from '../constants/uses';

function Uses() {
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
    <main className="sec">
      <div className="blockCustom">
        <div className="tile">
          {/* Title and introductory text */}
          <h1 className='uses'>What I Use</h1>
          <p className="my-5">
            I often get messages asking about specific pieces of{' '}
            <strong>software or hardware I use</strong>.
            This is not a static page; it's a <strong>living document </strong> 
            with everything that I'm using nowadays.
          </p>
          
          {/* Render categories and items */}
          {renderAll()}
        </div>
      </div>
    </main>
  );
}

export default Uses;