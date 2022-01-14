import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Image, List, ListItem, Popup, PopupContent } from "semantic-ui-react";
import { Profile } from "../../../models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({attendees}: Props) {

    const styles = {
        borderColor: 'orange',
        borderWidth: 2
    }

    console.log(attendees)

    return (
        <List horizontal>
            {attendees.map(att => (
                <Popup 
                    hoverable
                    key={att.username}
                    trigger={
                        <ListItem key={att.username} as={Link} to={`/profiles/${att.username}`}>
                            <Image 
                                bordered 
                                style={att.following ? styles : null} 
                                size="mini" 
                                circular 
                                src={att.image || '/assets/user.png'} 
                            />
                        </ListItem>
                    }
                >
                    <PopupContent>
                        <ProfileCard profile={att} />
                    </PopupContent>
                </Popup>
                
            ))}
        </List>
    )
})