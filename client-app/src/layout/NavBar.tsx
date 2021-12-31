import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react'

export default function NavBar() {
    
    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <MenuItem as={NavLink} to='/' exact header>
                        <img src='/assets/logo.png' alt='logo' style={{marginRight: 15}} />
                        Reactivities
                    </MenuItem>
                    <MenuItem as={NavLink} to='/activities' name='Activites' />
                    <MenuItem>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                    </MenuItem>
                </Container>
            </Menu>
        </>
    )
}