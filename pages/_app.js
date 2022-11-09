import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import { Provider } from "../context/provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
