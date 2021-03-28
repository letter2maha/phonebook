import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ContactTable from './ContableTable/ContactTable'
import EditContactModal from './EditContactModal/EditContactModal'

const ContactBook = (props) => {
  // Variable here are created to get from user via modal form
  const [contactName, setContactName] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  // Contacts will holds all contacts of an org
  const [contacts, setContacts] = useState([])
  const [displayContactTable, setDisplayContactTable] = useState(true)
  const [contactId, setContactId] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [editContactModal, toggleEditContactModal] = useState(false)
  const [orgId, setOrgId] = useState('')
  const [nodataFound, setNodataFound] = useState(false)

  // When this page is loaded API call is made to fetch contact details based on org
  useEffect(() => {
    getContact()
  }, [])

  // Having this useeffect to update the contact details page
  useEffect(() => {
    if (isUpdated) {
      getContact()
      setIsUpdated(false)
    }
  }, [isUpdated])

  useEffect(() => {
    if (!props.newContactModal && !props.displayContactTable) {
      getContact()
      // setIsUpdated(false)
    }
  }, [props.newContactModal])

  // API call to get contact details based on the org selected. Passing org id in props from
  // paren component
  const getContact = () => {
    let id = props.orgId
    setOrgId(id)
    const url =
      'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/getPeopleByOrgId/' +
      id
    axios.get(url).then((response) => {
      if (response.data.length === 0) {
        setNodataFound(true)
      } else {
        setNodataFound(false)
      }
      console.log(response.data)

      setContacts(response.data)
    })
  }

  // Api call to update the contact details based on person id.
  const updateContact = () => {
    const newContactData = {
      pid: contactId,
      peopleName: contactName,
      contactNo: contactNumber,
      organization: {
        orgId: orgId,
      },
    }

    axios
      .post(
        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/peopleUpdate',
        newContactData
      )
      .then((response) => {
        if (response.data.pid) {
          alert('Data Added SuccessFully')
          setIsUpdated(true)
          toggleEditContactModal(false)
        }
      })
  }

  return (
    <React.Fragment>
      {/* This will trigger the edit contact modal form whenever it is toggled */}
      <EditContactModal
        editContactModal={editContactModal}
        toggleEditContactModal={toggleEditContactModal}
        contactName={contactName}
        setContactName={setContactName}
        organizationName={organizationName}
        setOrganizationName={setOrganizationName}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        updateContact={updateContact}
        organizations={props.organizations}
        setOrganizations={props.setOrganizations}
        setOrgId={setOrgId}
      />
      {/* if there is no data inside org it will display no contacts. 
      So handling it with teneray operation */}

      {displayContactTable ? (
        !nodataFound ? (
          <ContactTable
            className=' mt-4'
            contacts={contacts}
            setContactId={setContactId}
            setDisplayContactTable={setDisplayContactTable}
            toggleEditContactModal={toggleEditContactModal}
            contactName={contactName}
            setContactName={setContactName}
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            contactNumber={contactNumber}
            setContactNumber={setContactNumber}
            orgId={orgId}
            setOrgId={setOrgId}
            setIsUpdated={setIsUpdated}
          />
        ) : (
          <h4>No Data Available</h4>
        )
      ) : null}
    </React.Fragment>
  )
}

export default ContactBook
