import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import Comments from './components/comments/Comments';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    // use Layout wrapper component with Navbar and basic styles
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId/*' element={<QuoteDetail />}>
          {/* rendering different content based on URL path: 
          Link is only visible when user is on exact path, 
          after clicking on Link, it disappears */}
          <Route
            path=''
            element={
              <div className='centered'>
                <Link className='btn--flat' to='comments'>
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route path='comments' element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        {/* Not Found 404 fallback page with wildcard * that matches every other incoming URL;
        should come last that it not consume one of the above paths */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
