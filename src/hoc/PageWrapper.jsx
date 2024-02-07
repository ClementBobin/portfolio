// Higher-Order Component (HOC) that wraps another component
const PageWrapper = (Component) => 
function HOC() {
  // Render a section with a specific layout for the wrapped component
  return (
    <section className='sec invert dark:invert-0'>
      <div className='blockCustom'>
        <div className='tile'>
          {/* Render the wrapped component */}
          <Component />
        </div>
      </div>
    </section>
  );
}

// Export the PageWrapper HOC
export default PageWrapper;