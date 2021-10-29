import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  // programmatic navigation: redirection action triggered by code, NOT by a click of user;
  // use useHistory hook that allows to change browser history (of pages user visited);
  // returns obj
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    // replace() is like a redirect and replaces current page (back btn is NOT working);
    // whereas push() pushes new page on the stack of pages (back btn is possible)
    history.push('/quotes');
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
