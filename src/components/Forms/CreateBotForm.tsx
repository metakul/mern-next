'use client'
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBotDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';
import { IBot, Ipost } from '@/Datatypes/interfaces/interface';
import { Typography, Button, Grid } from '@mui/material';
import CustomDialog from '../Dailog/Dailog';
import ImageUploader from '../ImageUploader';
import 'react-quill/dist/quill.snow.css';
import CustomTextField from './../Elements/TextFeild/index';
import Previews from '../ImageUploader/preview';

interface AddBotProps {

}

interface ErrorMessages {
    [key: string]: string;
}

const newErrors: ErrorMessages = {
    _alias: '',
    episode: '',
    mediaName: '',
    videoTocut: '',
    accessToken: '',
    location: '',
    hashtags: '',
    caption: ''
};

const AddBotForm: React.FC<AddBotProps> = () => {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        _alias: '',
        episode: '',
        mediaName: '',
        videoTocut: '',
        accessToken: '',
        location: '',
        hashtags: "",
        caption: ''
    });


    const [errors, setErrors] = useState<ErrorMessages>(newErrors);

    const handleFormSubmit = async (event: React.FormEvent) => {
        // Reset errors to null or empty string
        setErrors({
            _alias: '',
            episode: '',
            mediaName: '',
            videoTocut: '',
            accessToken: '',
            location: '',
            hashtags:'',
            caption: '',
        });


        event.preventDefault();

        // Validate form fields
        Object.keys(formData).forEach((key) => {
            const formValue = formData[key as keyof IBot];
            if (typeof formValue === 'string' && formValue.trim() === '') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
                }));
            }
        });
        

        // If there are no errors, dispatch action to add Bot
        const hasErrors = Object.values(errors).some((error) => !!error);

        console.log("Dispatching");
        
        if (!hasErrors) {
            // Dispatch action to add Bot
            (dispatch as AppDispatch)(
                createBotDispatcher({
                    newBotData: { ...formData,botFile:file },
                    setDialogOpen,
                })
            );
        }
    };


    const handleFileChange = (event: { target: { files: React.SetStateAction<null>[]; }; }) => {
        setFile(event.target.files[0]);
    };

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <CustomDialog
            open={isDialogOpen}
            onClose={() => setDialogOpen(!isDialogOpen)}
            triggerButtonText={'Create new Bot Trigger'}
            title={'New Bot'}
            description={'This is adding for New Bot Page'}
        >
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3">Alias</Typography>
                        <CustomTextField
                            id="_alias"
                            name="_alias"
                            type="text"
                            label="Alias"
                            value={formData._alias}
                            onChange={handleChange}
                            placeholder="Enter Alias Name"
                            error={errors._alias}
                            isError={errors._alias ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">BotFile</Typography>
                        <Previews onFileChange={handleFileChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">Episode</Typography>
                        <CustomTextField
                            id="episode"
                            name="episode"
                            type="text"
                            label="Episode"
                            value={formData.episode}
                            onChange={handleChange}
                            placeholder="Enter episode"
                            error={errors.episode}
                            isError={errors.episode ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">MediaName</Typography>
                        <CustomTextField
                            id="mediaName"
                            name="mediaName"
                            type="text"
                            label="MediaName"
                            value={formData.mediaName}
                            onChange={handleChange}
                            placeholder="Enter mediaName"
                            error={errors.mediaName}
                            isError={errors.mediaName ? true : false}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h3">accessToken</Typography>
                        <CustomTextField
                            id="accessToken"
                            name="accessToken"
                            type="text"
                            label="accessToken "
                            value={formData.accessToken}
                            onChange={handleChange}
                            placeholder="Enter accessToken"
                            error={errors.accessToken}
                            isError={errors.accessToken ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">caption</Typography>
                        <CustomTextField
                            id="caption"
                            name="caption"
                            type="text"
                            label="caption "
                            value={formData.caption}
                            onChange={handleChange}
                            placeholder="Enter caption"
                            error={errors.caption}
                            isError={errors.caption ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">videoTocut</Typography>
                        <CustomTextField
                            id="videoTocut"
                            name="videoTocut"
                            type="text"
                            label="videoTocut "
                            value={formData.videoTocut}
                            onChange={handleChange}
                            placeholder="Enter videoTocut"
                            error={errors.videoTocut}
                            isError={errors.videoTocut ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">location</Typography>
                        <CustomTextField
                            id="location"
                            name="location"
                            type="text"
                            label="location "
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter location"
                            error={errors.location}
                            isError={errors.location ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">Hashtags</Typography>
                        <CustomTextField
                            id="Hashtags"
                            name="hashtags"
                            type="text"
                            label="hashtags "
                            value={formData.hashtags}
                            onChange={handleChange}
                            placeholder="Enter hashtags"
                            error={errors.hashtags}
                            isError={errors.hashtags ? true :false}
                        />
                    </Grid>
                </Grid>
                <Button type="submit">Save</Button>
            </form>
        </CustomDialog>
    );
};

export default AddBotForm;
