import { enIE } from 'date-fns/locale';
import React, { SyntheticEvent, useState } from 'react'
import { Button, Divider, Form, Grid, Header, Input, Label, Segment, Tab, TextArea } from 'semantic-ui-react'
import { Profile } from '../../models/profile'
import { useStore } from '../../stores/store'

interface Props {
    profile: Profile
}

export default function ProfileAbout({profile}: Props) {

    const {profileStore: {isCurrentUser, loading, updateProfile}} = useStore();
    // const [displayName, setDisplayName] = useState(profile.displayName);
    // const [bio, setBio] = useState(profile.bio?);
    const [editing, setEditing] = useState(false);
    const [displayName, setDisplayName] = useState(profile.displayName);
    const [bio, setBio] = useState(profile.bio);

    function handleChange(e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) {
        if (e.currentTarget.name === 'inputName') {
            setDisplayName(e.currentTarget.value);
        } else {
            setBio(e.currentTarget.value)
        }
    }

    function updateProfileInfo(profile: Profile) { 
        profile.displayName = displayName;
        profile.bio = bio;
        updateProfile(profile);
        setEditing(false)
    }

    console.log(loading)

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='user' content='About' floated='left' />
                    {isCurrentUser && (
                        <Button 
                            name='edit'
                            floated='right' 
                            disabled={loading}
                            content={editing ? 'Cancel' : 'Edit About'}
                            onClick={() => setEditing(!editing)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={14}>
                    <Form>
                        <Form.Field>
                            <Label  content='Display Name' size='large' />
                            {!editing ? (
                                <Segment raised content={profile.displayName} />
                            ) : (
                            <Input
                                style={{marginTop: 12}} 
                                name='inputName' 
                                fluid 
                                value={displayName}
                                onChange={e => handleChange(e)}
                            />
                            )}
                        </Form.Field>

                        <Form.Field style={{marginTop: 24}}>
                            <Label content='Bio' size='large' />
                            {editing ? (
                                <>
                                    <TextArea 
                                        style={{marginTop: 12}}
                                        name='inputBio'
                                        rows={4} 
                                        value={bio}
                                        // placeholder={profile.bio} 
                                        onChange={e => handleChange(e)}
                                    />
                                    
                                    <Button 
                                        style={{marginTop: 12}}
                                        floated='left'
                                        color='teal'
                                        loading={loading}
                                        content='Submit Changes'
                                        onClick={() => updateProfileInfo(profile)}
                                    />
                                </>
                            ) : (
                                <>
                                    <Segment 
                                        raised 
                                        content={profile.bio} 
                                    />
                                </>
                            )}
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}