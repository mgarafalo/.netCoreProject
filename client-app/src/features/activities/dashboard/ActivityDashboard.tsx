import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, GridColumn } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import ActivityList from './ActivityList';
import LoadingComponent from '../../../layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {

    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities()
    }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

    return (
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <ActivityFilters />
            </GridColumn>
        </Grid>
    )
})