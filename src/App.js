import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './pages/SignUp.page';
import AuthProvider from './context/AuthContext';
import FetchProvider from './context/FetchContext';
import SignInPage from './pages/SignIn.page';
import Orders from './pages/Orders.page';
import AuthenticatedRoute from './Routes/AuthenticatedRoute.route';
import Users from './pages/Users.page';
import AllRoutes from './Routes/AllRoutes.route';
import Truck from './pages/Truck.page';
import Ships from './pages/Ships.page';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllRoutes><SignInPage /></AllRoutes>} />
      <Route path="/orders" element={<AuthenticatedRoute><Orders /></AuthenticatedRoute>} />
      <Route path="/users" element={<AuthenticatedRoute><Users /></AuthenticatedRoute>} />
      <Route path="/trucks" element={<AuthenticatedRoute><Truck/></AuthenticatedRoute>} />
      <Route path="/ships" element={<AuthenticatedRoute><Ships/></AuthenticatedRoute>} /> 
      {/* <Route path="/account" element={<AppShell>Account</AppShell>} /> */}
      {/* <Route path="/users" element={<AppShell>Users</AppShell>} />
        <Route path="/trucks" element={<AppShell>Trucks</AppShell>} />s
        <Route path="/ships" element={<AppShell>Ships</AppShell>} /> */}
      <Route path='/signin' element={<AllRoutes><SignInPage /></AllRoutes>} />
      <Route path='/signup' element={<AllRoutes><SignUpPage /></AllRoutes>} />
      <Route path='*' element={<AllRoutes><SignInPage /></AllRoutes>} />
    </Routes>
  );
};



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
            <AppRoutes />
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
