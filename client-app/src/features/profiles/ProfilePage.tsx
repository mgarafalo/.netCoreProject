import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, GridColumn } from 'semantic-ui-react'
import LoadingComponent from '../../layout/LoadingComponent'
import { Profile } from '../../models/profile'
import { useStore } from '../../stores/store'
import ProfileContent from './ProfileContent'
import ProfileHeader from './ProfileHeader'

export default observer(function ProfilePage() {

    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore;

    useEffect(() => {
        loadProfile(username);
        return () => {
            setActiveTab(0)
        }
    }, [loadProfile, username, setActiveTab])

    if (loadingProfile) return <LoadingComponent content='Loading Profile...' />
    
    return (
        <Grid>
            <GridColumn width={16}>
                {profile &&
                <>
                    <ProfileHeader profile={profile} />
                    <ProfileContent profile={profile} />
                </>}
            </GridColumn>
        </Grid>
    )
})