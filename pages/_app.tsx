import '../styles/globals.scss';
import { AppProps } from 'next/app';
import Layout from '../Layouts';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <div className="root-app">
        <Layout Component={Component} pageProps={pageProps}></Layout>
      </div>
    </Provider>
  );
};

export default MyApp;
