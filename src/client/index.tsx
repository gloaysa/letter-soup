import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import store, { persistedStore } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SpinnerComponent from './components/spinner/spinner.component';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={<SpinnerComponent />} persistor={persistedStore}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
