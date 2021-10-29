import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Matchu', text: 'Learning React is fine.' },
  { id: 'q2', author: 'Pitchu', text: 'Do it and learn it.' },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
