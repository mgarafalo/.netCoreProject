import React, { useEffect } from 'react';
import './App.css';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ActivityForm from './features/activities/form/ActivityForm';
import ActivityDetails from './features/activities/details/ActivityDetails';
import TestErrors from './features/erros/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from './features/erros/NotFound';
import ServerError from './features/erros/ServerError';
import LoginForm from './features/users/LoginForm';
import { useStore } from './stores/store';
import LoadingComponent from './layout/LoadingComponent';
import ModalContainer from './common/modals/ModalContainer';
import ProfilePage from './features/profiles/ProfilePage';

function App() {

  const loacation = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading App...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route path='/' exact component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route path='/activities' exact component={ActivityDashboard} />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path={['/createActivity', '/manage/:id']} key={loacation.key} component={ActivityForm} />
                <Route path='/profiles/:username' component={ProfilePage} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
      
    </>
  );
}

export default observer(App);
