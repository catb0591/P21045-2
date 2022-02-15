import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'

const LandingPage = () => {
    const [contacts, setContacts] = useState([])
    const [matchingContacts, setMatchingContacts] = useState([])

    useEffect(() => {

        axios.get('http://localhost:1336/api/contact').then((payload) => {
            const { data } = payload
            setContacts(data)
            setMatchingContacts(data)
        })
    }, [])

    const filteredContacts = (userInput) => {
        const matchingContacts = contacts.filter(contact => {
            return contact.firstName.toLowerCase().startsWith(userInput.toLowerCase())
        })

        setMatchingContacts(matchingContacts)
    }

    return (
        <div>
            <div>
                <input className="searchBox" type="text" name="search" placeholder='Search Contact...'
                    onChange={(event) => filteredContacts(event.target.value)}
                />{' '}
                <Button variant="outlined"><Link to={'/contact/upload'}>Upload Contacts</Link></Button>{' '}
                <Button variant="outlined"><Link to={'/campaign'}>View Campaigns</Link></Button>
            </div>
            <div>
                {matchingContacts.map(contact => {
                    return (
                        <div key={contact.id}>
                            {contact.firstName} {contact.lastName}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingPage