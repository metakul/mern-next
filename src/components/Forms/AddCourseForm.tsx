import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { ICourse, ITopic } from '@/Datatypes/interfaces/interface';
import { Typography, Button, Grid } from '@mui/material';
import CustomTextField from './../Elements/TextFeild/index';
import WYSIWYGEditor from '../WYSWYGEditor';
import { addCourseApiSlice, addTopicsToCourseApiSlice } from '@/lib/slices/CoursesSlices/CoursesApiSlice';

interface AddCourseProps {
  courseInfo?: ICourse;
  formEvent: string;
}

interface ErrorMessages {
  [key: string]: string;
}

const newErrors: ErrorMessages = {
  name: '',
  topics: '',
};

const AddCourseForm: React.FC<AddCourseProps> = ({ courseInfo, formEvent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ICourse>(courseInfo ? courseInfo : {
    id: '',
    name: '',
    topics: [],
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorMessages>(newErrors);

  const clearForm = () => {
    setFormData({
      id: '',
      name: '',
      topics: [],
    });
    setErrors(newErrors);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({
      name: '',
      topics: '',
    });

    setIsSaving(true);

    const newErrors: ErrorMessages = {};
    Object.keys(formData).forEach((key) => {
      const formValue = formData[key as keyof ICourse];
      if (typeof formValue === 'string' && formValue.trim() === '' && key !== 'topics') {
        if (key === 'id' && formEvent === 'addCourse') return;
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      } else if (Array.isArray(formValue) && key === 'topics' && formValue.length === 0) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => !!error);
    if (!hasErrors) {
      if (formEvent === 'addCourse') {
        (dispatch as AppDispatch)(
          addCourseApiSlice({
            newCourseData: formData,
            closeDialog: () => {},
            clearForm,
            setIsSaving,
          })
        );
    }
    //   } else if (formEvent === 'addTopics' && formData.id) {
    //     (dispatch as AppDispatch)(
    //       addTopicsToCourseApiSlice({
    //         courseId: formData.id,
    //         topics: formData.topics,
    //       })
    //     );
    //   }
    } else {
      setIsSaving(false);
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ICourse) => {
    if (field === 'topics') {
      const topicsArray = e.currentTarget.value.split(',').map((topic) => ({ id: Date.now(), title: topic.trim(), content: '' }));
      setFormData({ ...formData, [field]: topicsArray });
    } else {
      setFormData({ ...formData, [field]: e.currentTarget.value });
    }
    setErrors({ ...errors, [field]: '' });
  };

  const handleTopicContentChange = (index: number, content: string) => {
    const updatedTopics = formData.topics.map((topic, i) => i === index ? { ...topic, content } : topic);
    setFormData({ ...formData, topics: updatedTopics });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Course Name</Typography>
          <CustomTextField
            id="name"
            type="text"
            label="Course Name"
            value={formData.name}
            onChange={(e) => handleChange(e, 'name')}
            placeholder="Enter course name"
            error={errors.name}
            isError={errors.name ? true : false}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Topics</Typography>
          <CustomTextField
            id="topics"
            type="text"
            label="Topics (comma separated)"
            value={formData.topics.map(topic => topic.title).join(',')}
            onChange={(e) => handleChange(e, 'topics')}
            placeholder="Enter topics"
            error={errors.topics}
            isError={errors.topics ? true : false}
          />
        </Grid>
        {formData.topics.map((topic, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h4">{`Content for ${topic.title}`}</Typography>
            <WYSIWYGEditor value={topic.content} onChange={(content) => handleTopicContentChange(index, content)} />
          </Grid>
        ))}
      </Grid>
      <Button type="submit" disabled={isSaving}>
        {formEvent === "addCourse" ? "Add Course" : "Add Topics"}
      </Button>
    </form>
  );
};

export default AddCourseForm;