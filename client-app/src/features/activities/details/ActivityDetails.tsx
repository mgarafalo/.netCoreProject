import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../layout/LoadingComponent';
import { useStore } from '../../../stores/store';
import ActivitiyDetailedHeader from './ActivityDetailedHeader';
import ActivitiyDetailedInfo from './ActivityDetailedInfo';
import ActivitiyDetailedChat from './ActivityDetailedChat';
import ActivitiyDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
    
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            loadActivity(id)
        }
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivitiyDetailedHeader activity={activity} />
                <ActivitiyDetailedInfo activity={activity} />
                <ActivitiyDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivitiyDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})