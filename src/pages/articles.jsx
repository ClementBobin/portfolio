// Importing the PageWrapper higher-order component
import PageWrapper from '../hoc/PageWrapper';
import { useTranslation } from 'react-i18next';

// Function component for the 'articles' page
function articles() {
  const { t } = useTranslation()
  // Content to be displayed on the 'articles' page
  return (
    <>
      <div>{t('ArticlesSecTitle1')}</div>
      <p>{t('ArticlesSecDescription1')}<strong>{t('ArticlesSecDescription2')}</strong>{t('ArticlesSecDescription3')}</p>
    </>
  );
}

// Exporting the 'articles' component wrapped with the PageWrapper
export default PageWrapper(articles);