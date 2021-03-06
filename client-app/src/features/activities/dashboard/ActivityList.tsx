import React, { Fragment } from 'react';
import { Item, Segment, Header } from 'semantic-ui-react';
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';


export default observer(function ActivityList() {

    const {activityStore} = useStore();
    const {groupedActivites} = activityStore;


    return (
        <>
            {groupedActivites.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                </Fragment>
            ))}
        </>
    )
})