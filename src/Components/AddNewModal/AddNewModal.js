import React, { useState } from 'react'
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
import Select from 'react-select'

const AddNewModal = (props) => {
  // This modal will be trigger whenever user tries to add a new Contact

  const orgOption = props.organizations.map((elem) => ({
    value: elem.orgId,
    label: elem.orgName,
  }))

  const [isOrgIdSelected, toggleOrgSelected] = useState(false)
  return (
    <Modal
      isOpen={props.newContactModal}
      toggle={() => {
        props.toggleNewContactModal(false)
      }}
    >
      <ModalHeader
        toggle={() => {
          props.toggleNewContactModal(false)
        }}
      >
        Add a New Contact
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for='Name'>People Name</Label>
          <Input
            id='Name'
            value={props.contactName}
            onChange={(e) => {
              props.setContactName(e.target.value)
            }}
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for='exampleSelect'>Select Organization</Label>
          <Select
            name='org'
            options={orgOption}
            searchable={false}
            onChange={(e) => {
              console.log('e' + e.value)
              props.setOrgId(e.value)
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for='ContactNumber'>People Contact Number</Label>
          <Input
            id='ContactNumber'
            value={props.contactNumber}
            onChange={(e) => {
              props.setContactNumber(e.target.value)
              toggleOrgSelected(true)
            }}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={() => {
            // console.log(props.contactName)
            // console.log(isOrgIdSelected)
            // console.log(props.contactNumber)
            if (
              props.contactName === '' ||
              !isOrgIdSelected ||
              props.contactNumber === ''
            ) {
              alert('Please fill all the fields!')
            } else {
              console.log('Clicked')
              props.addContact()
              props.setContactName('')
              props.setOrganizationName('')
              props.setContactNumber('')
            }
          }}
        >
          Add Contact
        </Button>

        <Button
          color='secondary'
          onClick={() => {
            props.toggleNewContactModal(false)
            props.setContactName('')
            props.setOrganizationName('')
            props.setContactNumber('')
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddNewModal
