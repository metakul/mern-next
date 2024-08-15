"use client"
import { selectUser } from '@/lib/slices/authSlice'
import { Container } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function AdminHomePage() {

    const user =JSON.parse(useSelector(selectUser))

  return (
    <Container>Welcome: {user?.email}</Container>
  )
}

export default AdminHomePage