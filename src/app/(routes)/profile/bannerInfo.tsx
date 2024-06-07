/* eslint-disable @next/next/no-img-element */
import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react'

export default function BannerInfo() {
  const [userData, setUserData] = useState({
    name: '',
    details: '',
    profilePic: '',
    address: '',
    joinDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Mock fetch function to get user data
  const fetchUserData = async () => {
    // Mock data
    const data = {
      name: 'Shubham Kunwar',
      details: 'I make art with the simple goal of giving you something pleasing to look at for a few seconds.',
      profilePic: 'img/user/user_avatar.gif',
      address: '0x7a86c0b064171007716bbd6af96676935799a63e',
      joinDate: 'December 2024'
    };
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save data to server or state
  };

  return (
    <div>
      <div className="relative">
        <img src="img/16.png" alt="banner" className="h-[18.75rem] object-cover" />
      </div>

      <section className="relative bg-light-base pb-12 pt-28 dark:bg-jacarta-800">
        <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <figure className="relative">
            <img
              src={userData.profilePic}
              alt="profile avatar"
              className="rounded-xl border-[5px] border-white dark:border-jacarta-600"
            />
            <div
              className="absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green dark:border-jacarta-600"
              data-tippy-content="Verified Collection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-[.875rem] w-[.875rem] fill-white"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
              </svg>
            </div>
          </figure>
        </div>

        <div className="container">
          <div className="text-center">
            {isEditing ? (
              <>
                <TextField
                  type="text"
                  name="name"
                  value={userData.name}
                  inputProps={{style: {fontSize: 36}}} 
                  onChange={handleChange}
                  className="mb-4 font-display text-center text-4xl font-medium text-jacarta-700 dark:text-white"
                />
                <br/>
                <TextField
                  name="details"
                  value={userData.details}
                  onChange={handleChange}
                  multiline
                  maxRows={4}
                  variant="filled"
                  sx={{
                    mt:2,
                    mb:2,
                    px:12
                  }}
                  fullWidth={true}
                  className="mx-auto mb-2 mt-4 dark:text-jacarta-300 text-xl"
                />
                <br/>
              </>
            ) : (
              <>
                <h2 className="mb-2 font-display text-4xl font-medium text-jacarta-700 dark:text-white">{userData.name}</h2>
                <p className="mx-auto mb-2 max-w-xl text-lg dark:text-jacarta-300">{userData.details}</p>
              </>
            )}
            <div
              className="mb-8 inline-flex items-center justify-center rounded-full border border-jacarta-100 bg-white py-1.5 px-4 dark:border-jacarta-600 dark:bg-jacarta-700"
            >
              <span data-tippy-content="ETH">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  viewBox="0 0 1920 1920"
                  className="mr-1 h-4 w-4"
                >
                  <path fill="#8A92B2" d="M959.8 80.7L420.1 976.3 959.8 731z"></path>
                  <path fill="#62688F" d="M959.8 731L420.1 976.3l539.7 319.1zm539.8 245.3L959.8 80.7V731z"></path>
                  <path fill="#454A75" d="M959.8 1295.4l539.8-319.1L959.8 731z"></path>
                  <path fill="#8A92B2" d="M420.1 1078.7l539.7 760.6v-441.7z"></path>
                  <path fill="#62688F" d="M959.8 1397.6v441.7l540.1-760.6z"></path>
                </svg>
              </span>
              <button
                className="js-copy-clipboard max-w-[10rem] select-none overflow-hidden text-ellipsis whitespace-nowrap dark:text-jacarta-200"
                data-tippy-content="Copy"
              >
                <span>{userData.address}</span>
              </button>
            </div>
                <br/>
            <span className="text-jacarta-400">Joined {userData.joinDate}</span>

            <div className="mt-6 flex items-center justify-center space-x-2.5">
              <button
                onClick={handleEdit}
                className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600 px-4 py-2"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600 px-4 py-2"
                >
                  Save
                </button>
              )}
              <div
                className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600"
              >
                <div
                  className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm before:absolute before:h-4 before:w-4 before:bg-[url('/img/5.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                  role="button"
                  data-tippy-content="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path
                      d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                    />
                  </svg>
                </div>
              </div>
              <div
                className="rounded-xl border border-jacarta-100 bg-white hover:bg-jacarta-100 dark:border-jacarta-600 dark:bg-jacarta-700 dark:hover:bg-jacarta-600"
              >
                <div
                  className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm before:absolute before:h-4 before:w-4 before:bg-[url('/img/6.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                  role="button"
                  data-tippy-content="Favorite"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="h-4 w-4 fill-jacarta-500 dark:fill-jacarta-200"
                  >
                    <path fill="none" d="M0 0H24V24H0z" />
                    <path
                      d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
