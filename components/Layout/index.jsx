import Footer from './Footer/Footer';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';
import { StateProvider } from '../../utils/store';

const Layout = ({ children }) => {
  const initialState = {
    data: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'updateData':
        return {
          ...state,
          data: action.updateData,
        };
      default:
        return state;
    }
  };
  return (
    <>
      <StateProvider initialState={initialState} reducer={reducer}>
        <SkipLink />
        <Header serviceName="Interim Social Care Admin" />
        <div className="govuk-width-container app-width-container">
          <PhaseBanner phase="beta" />
          <main
            className="govuk-main-wrapper app-main-class"
            id="content"
            role="main"
          >
            {children}
          </main>
        </div>
        <Footer />
      </StateProvider>
    </>
  );
};

export default Layout;
