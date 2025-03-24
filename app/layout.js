'use client';
import "../style/globals.css";
import '../style/global.css';
import Header from "../components/header/Header";

import { Provider } from 'react-redux';
import store from '../store';

export default function RootLayout({ children }) {

  return (
    <Provider store={store}>
      <html lang="en">
        <body className="bg-black">
          <div className="bg-[url(/bags3.png)] bg-cover bg-center h-90 bg-black/70 bg-blend-darken">
            <Header />
          </div>

          {children}
        </body>
      </html>
    </Provider>
  );
}
