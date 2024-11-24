import React from 'react'
import ManageUsersContent from '../Components/ManageUsers/ManageUsersContent'
import LoginLayout from '../Layouts/LoginLayout'

export default function ManageUsers() {
  return (
    <LoginLayout title='Users'>
        <ManageUsersContent />
    </LoginLayout>
  )
}
