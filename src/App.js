import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllQuotes from './pages/AllQuotes';
import QuoteDetail from './pages/QuoteDetail';
import NewQuote from './pages/NewQuote';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    // use Layout wrapper component with Navbar and basic styles
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quotes' exact>
          <AllQuotes />
        </Route>
        <Route path='/quotes/:quoteId'>
          <QuoteDetail />
        </Route>
        <Route path='/new-quote'>
          <NewQuote />
        </Route>
        {/* Not Found 404 fallback page with wildcard * that matches every other incoming URL;
        should come last that it not consume one of the above paths */}
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
