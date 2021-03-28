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
import Select from 'react-select'

const EditContactModal = (props) => {
  // This modal will be trigger whenever user choose edit contact in contact page.
  // On submit of this form a function call will be made to updatecontact.
  const orgOption = props.organizations.map((elem) => ({
    value: elem.orgId,
    label: elem.orgName,
  }))

  return (
    <Modal
      isOpen={props.editContactModal}
      toggle={() => {
        props.toggleEditContactModal(false)
      }}
    >
      <ModalHeader
        toggle={() => {
          props.toggleEditContactModal(false)
        }}
      >
        Edit a New Contact
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for='Name'>Name</Label>
          <Input
            id='Name'
            value={props.contactName}
            onChange={(e) => {
              props.setContactName(e.target.value)
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for='exampleSelect'>Select Organization</Label>
          <Select
            // styles={customStyles}
            name='vehicle'
            options={orgOption}
            placeholder={props.organizationName}
            // value={this.state.vehicle}
            // onChange={this.handleChange}
            searchable={false}
            onChange={(e) => {
              console.log('e' + e.value)
              props.setOrgId(e.value)
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for='ContactNumber'>Contact Number</Label>
          <Input
            id='ContactNumber'
            value={props.contactNumber}
            onChange={(e) => {
              props.setContactNumber(e.target.value)
            }}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          color='primary'
          onClick={() => {
            console.log('Clicked')
            if (props.contactName === '' || props.contactNumber === '') {
              alert('Please fill all the fields!')
            } else {
              console.log('Clicked')
              props.updateContact()
            }
          }}
        >
          Update
        </Button>

        <Button
          color='secondary'
          onClick={() => {
            props.toggleEditContactModal(false)
            // props.setContactName('')
            // props.setOrganizationName('')
            // props.setContactNumber('')
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditContactModal
