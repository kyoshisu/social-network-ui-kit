import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Spinner from './components/Spinner';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));
const Favourites = lazy(() => import('./pages/Favourites'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:id" element={<Details />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
