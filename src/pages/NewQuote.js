import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/useHttp';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  // pass one of request functions (-> look at lib/api.js) as arg;
  // nice approach to split up your code: outsource request fns into proper file
  const { sendRequest, status, error } = useHttp(addQuote);
  // programmatic navigation: redirection action triggered by code, NOT by a click of user;
  // use useHistory hook that allows to change browser history (of pages user visited);
  // returns obj
  const history = useHistory();

  // triggered when returned status of useHttp hook changes;
  // history as dependency won't never change
  useEffect(() => {
    if (status === 'completed' && !error) {
      // replace() is like a redirect and replaces current page (back btn is NOT working);
      // whereas push() pushes new page on the stack of pages (back btn is possible)
      history.push('/quotes');
    }
  }, [status, error, history]);

  const addQuoteHandler = (quoteData) => {
    // use sendRequest fn of useHttp hook and pass data as arg to make POST request to database
    sendRequest(quoteData);
  };

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
