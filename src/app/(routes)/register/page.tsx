'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserDispatcher } from '@/lib/slices/RegisterUsers/RegisterApiSlice';
import { AppDispatch } from '@/lib/store';
import { accountStatus, UserCategory } from '@/Datatypes/interfaces/interface';

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
        <div>
             <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
