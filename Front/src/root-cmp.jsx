import './assets/css/main.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from "./cmps/app-header";
import { HomePage } from "./views/home-page";
import { AboutUs } from "./views/about-us";
import { ToyIndex } from "./views/toy-index";
import { AppFooter } from "./cmps/app-footer";
import { ToyEdit } from './views/toy-edit';
import { ToyDetails } from './views/toy-details';

export function App() {

  return <Provider store={store}>
    <Router>
      <div>
        <AppHeader />
        <main className='main-content'>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<ToyIndex />} path="/toy" />
            <Route element={<ToyDetails />} path="/toy/:toyId" />
            <Route element={<ToyEdit />} path="/toy/edit" />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  </Provider>
}
