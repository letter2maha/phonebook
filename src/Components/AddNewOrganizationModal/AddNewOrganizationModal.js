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
  FormFeedback,
  FormText,
} from 'reactstrap'

const AddNewOrganizationModal = (props) => {
  // This modal will be trigger whenever user tries to add a new org

  return (
    <Modal
      isOpen={props.newOrganizationModal}
      toggle={() => {
        props.toggleNewOrganizationModal(false)
      }}
    >
      <ModalHeader
        toggle={() => {
          props.toggleNewOrganizationModal(false)
        }}
      >
        Add a New Organization
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
          <Label for='OrgContactNumber'>Organization E-Mail</Label>
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
            // Validating for not null scenario while creating Org
            if (
              props.organizationName === '' ||
              props.organizationContact === ''
            ) {
              alert('Please fill all the fields!')
            } else {
              console.log('Clicked')
              props.addOrganization()
            }
          }}
        >
          Add Organization
        </Button>

        <Button
          color='secondary'
          onClick={() => {
            props.toggleNewOrganizationModal(false)
            props.setOrganizationName('')
            props.setOrganizationContact('')
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddNewOrganizationModal
