
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBotDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';
import { IBot } from '@/Datatypes/interfaces/interface';
import { Typography, Button, Grid } from '@mui/material';
import CustomDialog from '../Dailog/Dailog';
import 'react-quill/dist/quill.snow.css';
import CustomTextField from './../Elements/TextFeild/index';
import Previews from '../ImageUploader/preview';

interface AddBotProps {

}

interface ErrorMessages {
    [key: string]: string;
}

const newErrors: ErrorMessages = {
    botFile: '',
    _alias: '',
    episode: '',
    videoNumber: '',
    videoDuration: '',
    accessToken: '',
    location: '',
    hashtags: '',
    caption: ''
};

const AddBotForm: React.FC<AddBotProps> = () => {
    const dispatch = useDispatch();
    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        botFile: null,
        _alias: '',
        episode: '',
        videoNumber: '',
        videoDuration: '',
        accessToken: '',
        location: '',
        hashtags: "",
        caption: ''
    });


    const [errors, setErrors] = useState<ErrorMessages>(newErrors);

    const handleFormSubmit = async (event: React.FormEvent) => {
        // Reset errors to null or empty string
        setErrors({
            botFile: '',
            _alias: '',
            episode: '',
            videoNumber: '',
            videoDuration: '',
            accessToken: '',
            location: '',
            hashtags:'',
            caption: '',
        });


        event.preventDefault();

        // Validate form fields
        Object.keys(formData).forEach((key) => {
            const formValue = formData[key as keyof IBot];
            if (key === 'botFile' && !formValue) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    botFile: 'Bot file is required',
                }));
            } else if (typeof formValue === 'string' && formValue.trim() === '') {
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
                    newBotData: { ...formData },
                    setDialogOpen,
                })
            );
        }
    };


    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IBot) => {
        // if (field === 'hashtags') {
        //     // Check if the input value is empty
        //     if (e.currentTarget.value.trim() === '') {
        //         // If it's empty, set hashtags to an empty array
        //         setFormData({ ...formData, [field]: [] });
        //     } else {
        //         // Otherwise, split the input value by comma and trim each category
        //         const hashtagArray = e.currentTarget.value.split(',').map((hashtags) => hashtags.trim());
        //         setFormData({ ...formData, [field]: hashtagArray });
        //     }
        // } else {
            setFormData({ ...formData, [field]: e.currentTarget.value });
        // }
    };


    const handleFileChange = (file: any) => {
        setFormData((prevData) => ({ ...prevData, botFile: file }));
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
                            type="text"
                            label="Alias"
                            value={formData._alias}
                            onChange={(e) => handleChange(e, '_alias')}
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
                            type="text"
                            label="Episode"
                            value={formData.episode}
                            onChange={(e) => handleChange(e, 'episode')}
                            placeholder="Enter episode"
                            error={errors.episode}
                            isError={errors.episode ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">videoNumber</Typography>
                        <CustomTextField
                            id="videoNumber"
                            type="text"
                            label="videoNumber"
                            value={formData.videoNumber}
                            onChange={(e) => handleChange(e, 'videoNumber')}
                            placeholder="Enter videoNumber"
                            error={errors.videoNumber}
                            isError={errors.videoNumber ? true : false}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h3">accessToken</Typography>
                        <CustomTextField
                            id="accessToken"
                            type="text"
                            label="accessToken "
                            value={formData.accessToken}
                            onChange={(e) => handleChange(e, 'accessToken')}
                            placeholder="Enter accessToken"
                            error={errors.accessToken}
                            isError={errors.accessToken ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">caption</Typography>
                        <CustomTextField
                            id="caption"
                            type="text"
                            label="caption "
                            value={formData.caption}
                            onChange={(e) => handleChange(e, 'caption')}
                            placeholder="Enter caption"
                            error={errors.caption}
                            isError={errors.caption ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">videoDuration</Typography>
                        <CustomTextField
                            id="videoDuration"
                            type="text"
                            label="videoDuration "
                            value={formData.videoDuration}
                            onChange={(e) => handleChange(e, 'videoDuration')}
                            placeholder="Enter videoDuration"
                            error={errors.videoDuration}
                            isError={errors.videoDuration ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">location</Typography>
                        <CustomTextField
                            id="location"
                            type="text"
                            label="location "
                            value={formData.location}
                            onChange={(e) => handleChange(e, 'location')}
                            placeholder="Enter location"
                            error={errors.location}
                            isError={errors.location ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3">Hashtags</Typography>
                        <CustomTextField
                            id="Hashtags"
                            type="text"
                            label="hashtags "
                            value={formData.hashtags}
                            onChange={(e) => handleChange(e, 'hashtags')}
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
