'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '@/lib/slices/RegisterUsers/RegisterSlice';
import RegisterPage from '../register/page';

const InstaBot = () => {
    // const { user, loading, error } = useSelector(selectLoggedInUser);
    return (
        <div>
            <h3>Welcome </h3> : <RegisterPage/>
        </div>
    );
};

export default InstaBot;
