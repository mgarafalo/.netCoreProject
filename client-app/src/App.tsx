import React, { useEffect, useState } from 'react';
import './App.css';
import './layout/styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from './api/agent';
import LoadingComponent from './layout/LoadingComponent';

function App() {

  const [activities, setActivites] = useState<Activity[]>([]);
  const [seclectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
      .then(res => {
        let activities: Activity[] = [];
        res.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setActivites(activities)
        setLoading(false)
      })},
  [])

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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivites([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivites([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }

  }

  function handleDeleteACtivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setSubmitting(false)
      setActivites([...activities.filter(x => x.id !== id)])
    })
    
  }

  if (loading) return <LoadingComponent content='Loading App' />

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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
