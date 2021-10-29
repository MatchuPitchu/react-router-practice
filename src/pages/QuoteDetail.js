import { Route, useParams } from 'react-router-dom';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Matchu', text: 'Learning React is fine.' },
  { id: 'q2', author: 'Pitchu', text: 'Do it and learn it.' },
];

const QuoteDetail = () => {
  const { quoteId } = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === quoteId);

  // handle error case if user types in URL path manually without existing :quoteId
  if (!quote) {
    return <p>No quote found</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {/* nested route */}
      <Route path={`/quotes/${quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
