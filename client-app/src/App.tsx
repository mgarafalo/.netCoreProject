import React, { useEffect, useState } from 'react';
import './App.css';
import './layout/styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities, setActivites] = useState<Activity[]>([]);
  const [seclectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res => setActivites(res.data))
  }, [])

  function handleSeclectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSecletActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSeclectActivity(id) : handleCancelSecletActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleCreateOrEditActicity(activity: Activity) {
    activity.id 
      ? setActivites([...activities.filter(x => x.id !== activity.id), activity])
      : setActivites([...activities, {...activity, id: uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteACtivity(id: string) {
    setActivites([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={seclectedActivity}
          selectActivity={handleSeclectActivity}
          cancelSelectActivity={handleCancelSecletActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActicity}
          deleteActivity={handleDeleteACtivity}
        />
      </Container>
    </>
  );
}

export default App;
