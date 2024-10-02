'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher } from '@/lib/slices/RegisterUsers/RegisterApiSlice';
import { AppDispatch } from '@/lib/store';
import { accountStatus, UserCategory } from '@/Datatypes/interfaces/interface';
import { Container } from '@mui/material';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>(); 

    const handleRegister = () => {
        const userData = {
            name: "Shubham",
            email: "rsaabbdsft@jkjdj.com",
            password: "asdsdfsdf",
            phoneNumber: "7418747407",
            address: "sfdsidf",
            accountStatus: accountStatus.Pending,
            category: UserCategory.User,
            subcategory: "holder"
        };
        dispatch(registerUserDispatcher(userData));
    };

    return (
        <Container>
             <button onClick={handleRegister}>Register</button>
        </Container>
    );
};

export default RegisterPage;
