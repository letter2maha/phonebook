import React from 'react'
// import {Table} from 'reactstrap'
import { Table, Button } from 'reactstrap'

import axios from 'axios'

const ContactTable = (props) => {
  let contacts = props.contacts.map((contact) => {
    // let cId = contact.pid
    // will iterate all the contacts and display it in the form of table
    console.log('contact id' + contact.pid)
    return (
      <tr key={contact.pid}>
        <td> {contact.peopleName}</td>
        <td> {contact.contactNo}</td>
        <td> {contact.organization.orgName}</td>
        <td>
          <Button
            color='success'
            size='sm'
            className='mr-2'
            onClick={() => {
              props.setContactName(contact.peopleName)
              props.setContactNumber(contact.contactNo)
              props.setOrganizationName(contact.organization.orgName)
              props.setContactId(contact.pid)
              props.toggleEditContactModal((previousState) => {
                console.log(previousState)
                return !previousState
              })
            }}
          >
            Edit
          </Button>

          <Button
            color='danger'
            size='sm'
            // onClick={this.deleteContact.bind(this, contact.id)}
            onClick={() => {
              console.log('delete org ' + contact.pid)
              axios
                .delete(
                  'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/deletePeople/' +
                    contact.pid
                )
                .then((response) => {
                  if (response.data) {
                    // props.setIsOrgUpdated(true)
                    props.setIsUpdated(true)
                    alert('People Contact deleted!')
                    // setIsOrgUpdated(true)
                  }
                })
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    )
  })

  return (
    <Table className='text-center'>
      <thead>
        <tr>
          <th>People Name</th>
          <th>People Phone Number</th>
          <th>Organization</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{contacts}</tbody>
    </Table>
  )
}

export default ContactTable
