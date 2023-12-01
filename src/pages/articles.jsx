// Importing the PageWrapper higher-order component
import PageWrapper from '../hoc/PageWrapper';

// Function component for the 'articles' page
function articles() {
  // Content to be displayed on the 'articles' page
  return (
    <>
      <div>This is not yet implemented</div>
      <p>This will be where my content will show after I implement a website for <strong>article/podcast/note</strong>. It will display the most recent content here.</p>
    </>
  );
}

// Exporting the 'articles' component wrapped with the PageWrapper
export default PageWrapper(articles);