import { useEffect } from 'react';
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import { getSingleQuote } from '../lib/api';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const DUMMY_QUOTES = [
//   { id: 'q1', author: 'Matchu', text: 'Learning React is fine.' },
//   { id: 'q2', author: 'Pitchu', text: 'Do it and learn it.' },
// ];

const QuoteDetail = () => {
  const { quoteId } = useParams();
  // to write more flexible route code -> use useRouteMatch hook
  const match = useRouteMatch();

  // second arg is true to start in loading state when fetching data;
  const { sendRequest, status, error, data: loadedQuote } = useHttp(getSingleQuote, true);

  useEffect(() => {
    // pass quoteId to select right quote to fetch in the database
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // approach with dummy data
  // const quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'error') return <p className='centered'>{error}</p>;

  // handle error case if user types in URL path manually without existing :quoteId
  if (!loadedQuote.text) return <p className='centered'>No quote found</p>;

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* in nested routes you can use useRouteMatch hook obj to make nested 
        route more flexible for changes in root route*/}
      {/* rendering different content based on URL path: 
          Link is only visible when user is on exact path, after clicking on Link, it disappears */}
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
