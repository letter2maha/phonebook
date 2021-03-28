import React from 'react'
import {
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'

const EditOrganizationModal = (props) => {
  // This modal will be trigger whenever user choose edit org in org page.
  // On submit of this form a function call will be made to updateOrg.
  return (
    <React.Fragment>
      <Modal
        isOpen={props.editOrgModal}
        toggle={() => {
          props.toggleEditOrgModal(false)
        }}
      >
        <ModalHeader
          toggle={() => {
            props.toggleEditOrgModal(false)
          }}
        >
          Edit Organization
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for='OrganizationName'>Organization Name</Label>

            <Input
              id='OrganizationName'
              value={props.organizationName}
              onChange={(e) => {
                props.setOrganizationName(e.target.value)
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for='OrgContactNumber'>Organization Contact Email</Label>
            <Input
              id='OrgContactNumber'
              value={props.organizationContact}
              onChange={(e) => {
                props.setOrganizationContact(e.target.value)
              }}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color='primary'
            onClick={() => {
              console.log('Clicked')
              // Validating not null scenario while Updating Org details
              if (
                props.organizationName === '' ||
                props.organizationContact === ''
              ) {
                alert('Please fill all the fields!')
              } else {
                console.log('Clicked')
                props.updateOrganization()
              }
            }}
          >
            Update
          </Button>

          <Button
            color='secondary'
            onClick={() => {
              props.toggleEditOrgModal(false)
              //   props.setOrganizationName('')
              //   props.setOrganizationContactNumber('')
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default EditOrganizationModal
