import React from 'react'
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <MenuItem header>
                        <img src='/assets/logo.png' alt='logo' style={{marginRight: 15}} />
                        Reactivities
                    </MenuItem>
                    <MenuItem name='Activites' />
                    <MenuItem>
                    <Button positive content='Create Activity' onClick={openForm} />
                    </MenuItem>
                </Container>
            </Menu>
        </>
    )
}