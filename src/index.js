import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import RouterMain from './router';
// import App from './App';

// const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    <RouterMain />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
// ReactDOM.render(
//   <React.StrictMode>
//     <ThemeProvider theme={theme}>
//       <App />
//     </ThemeProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );