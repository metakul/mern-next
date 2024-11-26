import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { fetchBotsDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';
import ChatGpt from '@/Projects/ChatGpt/ChatGpt';

const InstaBot = () => {
    const isUserAuthenticated = useSelector(isAuthenticated);

    const dispatch = useDispatch();

    useEffect(() => {
        isUserAuthenticated && (dispatch as AppDispatch)(fetchBotsDispatcher());
    }, [ isUserAuthenticated]);

    return (
        <div className='mt-20'>
        <ChatGpt />
        </div>
    );
};

export default InstaBot;
