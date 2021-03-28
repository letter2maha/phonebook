import React from 'react'
import { Table, Button } from 'reactstrap'
import axios from 'axios'

const OrganizationTable = (props) => {
  //   console.log(props.organizations)

  // Iterating each organization and displaying it in the form of table.
  let organizations = props.organizations.map((organization, i) => {
    // console.log('Organization id' + Organization.id)
    // console.log(organization.organizationName)

    return (
      <tr key={organization.orgId}>
        <td> {organization.orgName}</td>
        <td> {organization.email}</td>
        <td>
          <Button
            color='primary'
            size='sm'
            className='mr-2'
            onClick={() => {
              props.setDisplayContactTable(false)
              props.setOrgId(organization.orgId)
              props.setOrganizationName(organization.orgName)
              console.log(organization.orgName)
            }}
          >
            View Contacts
          </Button>
          <Button
            color='success'
            size='sm'
            className='mr-2'
            onClick={() => {
              props.setOrgId(organization.orgId)
              props.setOrganizationName(organization.orgName)
              props.setOrganizationContact(organization.email)
              props.toggleEditOrgModal((previousState) => {
                // console.log(previousState)
                // console.log(organizations.orgName)
                return !previousState
              })
            }}
          >
            Edit
          </Button>
          <Button
            color='danger'
            size='sm'
            onClick={() => {
              console.log('delete org ' + organization.orgId)
              alert('All Contacts under this organiztion will be deleted!')
              //   props.setDeleteOrgID(organization.orgId)
              //   props.deleteOrg()

              axios
                .delete(
                  'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/deletePeopledByOrg/' +
                    organization.orgId
                )
                .then((response) => {
                  if (response.data) {
                    axios
                      .delete(
                        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/deleteOrg/' +
                          organization.orgId
                      )
                      .then((response) => {
                        props.setIsOrgUpdated(true)
                        alert('Organization deleted!')
                      })

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
    <Table className='text-center mt-4'>
      <thead>
        <tr>
          <th>Organization Name</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{organizations}</tbody>
    </Table>
  )
}

export default OrganizationTable
