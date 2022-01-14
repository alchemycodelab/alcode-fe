import React from 'react'
import { create }from 'react-test-renderer'
import { UserProvider } from '../../context/UserContext'
import SignUp from './SignUp'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
// import { render } from '@testing-library/react'
 

 



describe('is it here?', () => {
    it('did it render?', () => {
    
    const wrapper = create(
    <UserProvider>
        <Router initialEntries={["/signup"]}>
            <Routes>
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </Router>
    </UserProvider>
    )

        expect(wrapper).toMatchSnapshot()
    })
})

