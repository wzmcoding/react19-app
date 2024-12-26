import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import WishListPage from './pages/WishListPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <HomePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/diary"
          element={
            <PrivateRoute>
              <Layout>
                <DiaryPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Layout>
                <WishListPage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
