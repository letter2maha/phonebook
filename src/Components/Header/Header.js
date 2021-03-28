import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import React from 'react'

const Header = (props) => {
  // Header holds the option to add org, add contact and can reach home page
  return (
    <Navbar color='dark' dark expand='md' sticky='top'>
      <NavbarBrand href='/'>Contact Book</NavbarBrand>

      <Nav className='mr-auto' navbar>
        <NavItem className='ml-5'>
          <NavLink href='/'>Home</NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            onClick={() => {
              props.toggleNewOrganizationModal((previousState) => {
                console.log(previousState)
                props.setOrganizationName('')
                props.setOrganizationContact('')
                return !previousState
              })
            }}
          >
            Add Organization
          </NavLink>
        </NavItem>

        <NavItem className='cursor-normalizer'>
          <NavLink
            onClick={() => {
              props.toggleNewContactModal((previousState) => {
                console.log(previousState)
                return !previousState
              })
            }}
          >
            Add Contact
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default Header
