import './App.css';
import HomePage from "./components/Pages/HomePage.jsx"
import GigPage from './components/Pages/GigPage';
import CreateNewGig from './components/Pages/CreateNewGig';
import UserPage from './components/Pages/UserPage';
import CreateUserPage from './components/Pages/CreateUserPage';
import LoginPage from './components/Pages/LoginPage';
import Header from './components/Header';
import NotFound from './components/Pages/NotFound';
import SearchBar from './components/SearchBar';
import SearchResultsPage from './components/Pages/SearchResultsPage';
import SavedGigsPage from './components/Pages/SavedGigsPage';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { SessionProvider } from "./contexts/SessionContext"

import { SavedGigsProvider } from './contexts/SavedGigsContext';


function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <BrowserRouter >
          <SessionProvider>
            <Header />
            <SearchBar />
                <SavedGigsProvider>
                  <Routes>
                    <Route path="/gigs/:gig_id" element={<GigPage />} />

                    <Route path="/" element={<HomePage />}/>

                    <Route path="/saved" element={<SavedGigsPage />}/>

                    <Route path="/gigs/new" element={<CreateNewGig />} />

                    <Route path="/user/:username" element={<UserPage />}/>

                    <Route path="/create_user" element={<CreateUserPage />}/>

                    <Route path="/login" element={<LoginPage />}/>

                    <Route path="/search/:parameter/:searchTerm" element={<SearchResultsPage />}/>
                    
                    <Route path='*' element={<NotFound />}/>
                  </Routes>
                </SavedGigsProvider>
                  <Footer />
          </SessionProvider>

        </BrowserRouter>

      </div>

    </div>
  );
}

export default App;
