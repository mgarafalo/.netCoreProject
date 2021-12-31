import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../layout/LoadingComponent';

export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();

    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activity Filters</h2>
            </GridColumn>
        </Grid>
    )
})