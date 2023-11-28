import categories from '../../../constants/uses data';

function Uses() {
  const renderAll = () => {
    return categories.map((category, index) => (
      <div className='block' key={index}>
        <h2 className='my-6'>{category.name}</h2>
        <ul className='ml-4'>
          {category.items.map((item, iIndex) => (
            <li key={iIndex}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className='text-[#f2f2f2]'>
                {item.title}
              </a>
              <span> - </span>
              <span className='text-[#8f9ba8]'>{item.description}</span>
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
          <h1 className='uses'>What i uses</h1>
          <p className="my-5 text-[#8f9ba8]">I often get messages asking about specific pieces of <strong className='text-[#f2f2f2]'>software or hardware I use</strong>. This is not a static page; it's a <strong className='text-[#f2f2f2]'>living document</strong> with everything that I'm using nowadays.</p>
          {renderAll()}
        </div>
      </div>
    </main>
  );
}

export default Uses;