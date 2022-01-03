import React from 'react';
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

function App() {

  const loacation = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
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
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
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
