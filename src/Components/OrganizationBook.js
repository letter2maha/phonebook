import React, { useState, useEffect } from 'react'
import OrganizationTable from './OrganizationTable/OrganizationTable'
import axios from 'axios'
import Header from './Header/Header'
import AddNewOrganizationModal from './AddNewOrganizationModal/AddNewOrganizationModal'
import AddNewModal from './AddNewModal/AddNewModal'
import ContactBook from './ContactBook'
import EditOrganizationModal from './EditOrganizationModal/EditOrganizationModal'

const OrganizationBook = (prop) => {
  // Having two variables and methods to toggle the modal form for both organization and contact
  const [newContactModal, toggleNewContactModal] = useState(false)
  const [newOrganizationModal, toggleNewOrganizationModal] = useState(false)

  // Variables and methods to get the organization details
  const [organizationName, setOrganizationName] = useState('')
  const [organizationContact, setOrganizationContact] = useState('')

  //will hit get organization api call and assign all values to the variable
  //variable to refresh the org list when a new org is add or edited
  const [organizations, setOrganizations] = useState([])
  const [isOrgUpdated, setIsOrgUpdated] = useState(false)

  const [orgId, setOrgId] = useState('')
  //   const [deleteOrgID, setDeleteOrgID] = useState('')

  // Variable for contact page
  const [contactName, setContactName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [displayContactTable, setDisplayContactTable] = useState(true)
  const [editOrgModal, toggleEditOrgModal] = useState(false)

  useEffect(() => {
    getOrganizationDetails()
  }, []) //loads when List of Org details when page refereshed

  // This methods helps to refresh when an org is add or edited
  useEffect(() => {
    if (isOrgUpdated) {
      getOrganizationDetails()
      setIsOrgUpdated(false)
    }
  }, [isOrgUpdated])

  //API call to fetch org details in Home page
  const getOrganizationDetails = () => {
    axios
      .get(
        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/getAllOrganization'
      )
      .then((response) => {
        setOrganizations(response.data)
        console.log(response.data)
      })
  }

  // API call to add org details.
  const addOrganization = () => {
    console.log('orgName' + organizationName)
    const organizationData = {
      orgName: organizationName,
      email: organizationContact,
    }
    axios
      .post(
        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/addOrganization',
        organizationData
      )
      .then((response) => {
        if (response.data.orgId) {
          alert('Contact Created!!')
          setIsOrgUpdated(true)
        }
        setOrganizationName('')
        setOrganizationContact('')
        toggleNewOrganizationModal(false)
      })
  }

  // API call to add contacts
  const addContact = () => {
    const newContactData = {
      people: {
        peopleName: contactName,
        contactNo: contactNumber,
        organization: {
          orgId: orgId,
        },
      },
    }

    axios
      .post(
        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/addPeople',
        newContactData
      )
      .then((response) => {
        if (response.data.pid) {
          alert('Contact Created!')
          toggleNewContactModal(false)
        }
      })
  }

  // API call to update org
  const updateOrganization = () => {
    const requestBody = {
      orgId: orgId,
      orgName: organizationName,
      email: organizationContact,
    }
    axios
      .post(
        'http://springbootawscontactbook-env.eba-iipbxdjb.us-east-2.elasticbeanstalk.com/orgUpdate',
        requestBody
      )
      .then((response) => {
        if (response.data.orgId) {
          alert('Contact Updated!')
          toggleEditOrgModal(false)
          setIsOrgUpdated(true)
        }
      })
  }

  return (
    <React.Fragment>
      {/* Header Fragment contains the Add org and Add contact options. */}
      <Header
        toggleNewOrganizationModal={toggleNewOrganizationModal}
        toggleNewContactModal={toggleNewContactModal}
        setOrganizationName={setOrganizationName}
        setOrganizationContact={setOrganizationContact}
      />

      {/*this will get trigger when we clicked add org in header*/}
      <AddNewOrganizationModal
        newOrganizationModal={newOrganizationModal}
        toggleNewOrganizationModal={toggleNewOrganizationModal}
        organizationName={organizationName}
        setOrganizationName={setOrganizationName}
        organizationContact={organizationContact}
        setOrganizationContact={setOrganizationContact}
        addOrganization={addOrganization}
      />

      {/*this will get trigger when we clicked add contact in header*/}
      <AddNewModal
        newContactModal={newContactModal}
        toggleNewContactModal={toggleNewContactModal}
        contactName={contactName}
        setContactName={setContactName}
        organizationName={organizationName}
        setOrganizationName={setOrganizationName}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        addContact={addContact}
        organizations={organizations}
        setOrganizations={setOrganizations}
        setOrgId={setOrgId}
      />

      {/*this will get trigger when we clicked add Edit in header*/}
      <EditOrganizationModal
        editOrgModal={editOrgModal}
        toggleEditOrgModal={toggleEditOrgModal}
        organizationName={organizationName}
        setOrganizationName={setOrganizationName}
        organizationContact={organizationContact}
        setOrganizationContact={setOrganizationContact}
        // addOrganization={addOrganization}
        updateOrganization={updateOrganization}
      />

      {/* I have created this application as a single page application
    so having a contion here which will display org details and contact details
    based on the condition dispplayContactTable. This display contact table will be set 
    from contactbook */}

      {displayContactTable ? (
        <>
          <h4 className='mt-3'>
            <center>Organization Details</center>
          </h4>
          <OrganizationTable
            organizationContact={organizationContact}
            setOrganizationContact={setOrganizationContact}
            organizations={organizations}
            setOrganizations={setOrganizations}
            organizationName={organizationName}
            setOrganizationName={setOrganizationName}
            //   organizationContactCount={organizationContactCount}
            //   setorganizationContactCount={setorganizationContactCount}
            // deleteOrg={deleteOrg}
            // setDeleteOrgID={setDeleteOrgID}
            orgId={orgId}
            setOrgId={setOrgId}
            setIsOrgUpdated={setIsOrgUpdated}
            displayContactTable={displayContactTable}
            setDisplayContactTable={setDisplayContactTable}
            toggleEditOrgModal={toggleEditOrgModal}
          />
        </>
      ) : (
        <>
          <h4 className='mt-3 text-center'>
            {organizationName} People Contacts
          </h4>
          <ContactBook
            orgId={orgId}
            organizations={organizations}
            setOrganizations={setOrganizations}
            newContactModal={newContactModal}
            displayContactTable={displayContactTable}
          />
        </>
      )}
    </React.Fragment>
  )
}

export default OrganizationBook
