import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

// sorting helper fn:
// if a.id ist größer als b.id, dann soll b vor a sortiert werden;
// if a.id ist kleiner als b.id, dann soll a vor b sortiert bleiben
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = ({ quotes }) => {
  // working with query parameters to sort quotes by ascending or descending order;
  // whereas useHistory gives access to browser history obj,
  // useLocation gives access to currently loaded page
  const history = useHistory();
  const location = useLocation();

  // default JS class URLSearchParams that returns obj
  // that contains all query params key value pairs
  const queryParams = new URLSearchParams(location.search);
  const ascending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(quotes, ascending);

  const changeSortingHandler = () => {
    // pushing a page leads to re-evaluation of target component(s)
    // if quotes are currently sorted ascendingly
    // then new query param after click would be 'desc'
    history.push(`/quotes?sort=${ascending ? 'desc' : 'asc'}`);
  };

  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {ascending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
