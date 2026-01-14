import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { getColors } from "@/layout/Theme/themes";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCoursesApiSlice, addTopicsToCourseApiSlice, deleteTopicFromCourseApiSlice, updateTopicInCourseApiSlice } from "@/lib/slices/CoursesSlices/CoursesApiSlice";
import { AppDispatch } from "@/lib/store";
import { selectedCourses } from "@/lib/slices/CoursesSlices/CoursesSlice";
import { Pages, UserCategory } from "@/Datatypes/enums";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import WYSIWYGEditor from "@/components/WYSWYGEditor";
import { selectUserType } from "@/lib/slices/authSlice";
import { parseHTML, renderCustomStyles } from "@/scripts/handleBlogCss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const CoursePage: React.FC = () => {
  const { courseId, topicId } = useParams();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(courseId || ""); // Default course
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [newTopic, setNewTopic] = useState<any>(null);
  const [tempNewTopic, setTempNewTopic] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const isDesktop = useMediaQuery("(min-width:1600px)");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userType = useSelector(selectUserType);


  // Fetch courses data from the Redux store
  const coursesState = useSelector(selectedCourses);
  const courses = coursesState.courses;

  useEffect(() => {
    dispatch(fetchCoursesApiSlice());
  }, [dispatch]);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const defaultCourse = courseId || courses[0].name;
      setSelectedCourse(defaultCourse || "");
      const course = courses.find(course => course.id === defaultCourse);
      const defaultTopic = topicId || course?.topics[0]?.id;
      const topic = course?.topics.find((topic: any) => topic.id === defaultTopic);
      setSelectedTopic(topic);
      if (!courseId || !topicId) {
        navigate(`/learning/${courseId}/${topicId}`, { replace: true });
      }
    }
  }, [courses, courseId, topicId, navigate]);

  // Ensure sidebar is open by default on desktop
  const sidebarOpen = isDesktop ? true : isSidebarOpen;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSelectTopic = (id: number) => {
    const topic = courses.find(course => course.id === selectedCourse)?.topics.find((topic: any) => topic.id === id);
    if (topic) {
      setSelectedTopic(topic);
      navigate(`/learning/${selectedCourse}/${id}`);
    }
    if (!isDesktop) setIsSidebarOpen(false);
  };

  const handleCourseChange = (event: any) => {
    const newCourse = event.target.value as string;
    setSelectedCourse(newCourse);
    const course = courses.find(course => course.id === newCourse);
    const topic = course?.topics[0];
    setSelectedTopic(topic);
    navigate(`/learning/${course?.id}/${topic?.id}`);
  };

  const handleOpenBlogPage = () => {
    navigate(Pages.ADD_COURSE);
  };

  const handleAddNewTopic = () => {
    const newTempTopic = { id: Date.now(), title: 'Temporary Topic', content: 'Temporary Content' };
    setNewTopic(newTempTopic);
    setTempNewTopic(newTempTopic);
  };

  const handleNewTopicChange = (field: string, value: string) => {
    setTempNewTopic({ ...tempNewTopic, [field]: value });
  };

  const handleSaveNewTopic = () => {
    const updatedCourse = courses.find(course => course.id === selectedCourse);
    if (updatedCourse) {
      dispatch(addTopicsToCourseApiSlice({
        courseId: selectedCourse,
        topics: [tempNewTopic],
      }));
      setNewTopic(null);
      setTempNewTopic(null);
    }
  };

  const handleDeleteTopic = (courseId: string, topicId: string) => {
    const confirmation = prompt(`Please enter "sudo apt delete ${selectedTopic.title}" to confirm deletion:`);
    if (confirmation === `sudo apt delete ${selectedTopic.title}`) {
      dispatch(deleteTopicFromCourseApiSlice({ courseId, topicId }));
    } else {
      alert("Incorrect confirmation. Topic not deleted.");
    }
  };

  const handleEditTopic = (topic: any) => {
    setSelectedTopic(topic);
    setIsEditing(true);
  };

  const handleSaveEditedTopic = () => {
    dispatch(updateTopicInCourseApiSlice({
      courseId: selectedCourse,
      topicId: selectedTopic.id,
      title: selectedTopic.title,
      content: selectedTopic.content,
    }));
    setIsEditing(false);
  };

  const generateShareableLink = () => {
    return `${window.location.origin}/learning/${selectedCourse}/${selectedTopic?.id}`;
  };

  const handleShare = () => {
    const shareableLink = generateShareableLink();
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <Container >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourse}
            onChange={handleCourseChange}
            label="Course"
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
          {userType === UserCategory.SUPER_ADMIN && 
          <Button onClick={handleOpenBlogPage}>
            Add Course
          </Button>
          }
        </FormControl>
        {!isDesktop && (
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              onClick={toggleSidebar}
              sx={{
                color: getColors().blueAccent[100],
                marginRight: 2,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        )}
      </Box>

          {selectedTopic?.content && parseHTML(selectedTopic?.content).map((node, index) => renderCustomStyles(node, index))}

      <Box display="flex" flex="1" p={0}>
        <Box flex="1" p={0}>
          {selectedTopic && (
            <>
              {userType === UserCategory.SUPER_ADMIN && (
                <Box>
                  <Button onClick={() => handleEditTopic(selectedTopic)}>Edit</Button>
                  <Button onClick={() => handleDeleteTopic(selectedCourse, selectedTopic.id)}>Delete</Button>
                </Box>
              )}
              <Button onClick={handleShare}>Share</Button>
            </>
          )}
          {newTopic && (
            <Box>
              <Typography variant="h4">New Topic</Typography>
              <input
                type="text"
                placeholder="Enter topic title"
                value={tempNewTopic.title}
                onChange={(e) => handleNewTopicChange('title', e.target.value)}
              />
              <WYSIWYGEditor
                value={tempNewTopic.content}
                onChange={(content) => handleNewTopicChange('content', content)}
              />
              <Button onClick={handleSaveNewTopic}>Save Topic</Button>
            </Box>
          )}
          {isEditing && (
            <Box>
              <Typography variant="h4">Edit Topic</Typography>
              <TextField
                type="text"
                placeholder="Enter topic title"
                value={selectedTopic.title}
                onChange={(e) => setSelectedTopic({ ...selectedTopic, title: e.target.value })}
              />
              <WYSIWYGEditor
                value={selectedTopic.content}
                onChange={(content) => setSelectedTopic({ ...selectedTopic, content })}
              />
              <Button onClick={handleSaveEditedTopic}>Save Changes</Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </Box>
          )}
        </Box>

        {/* Sidebar Drawer */}
        <Drawer
          anchor="right"
          variant={isDesktop ? "persistent" : "temporary"}
          open={sidebarOpen}
          onClose={!isDesktop ? toggleSidebar : undefined}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              backgroundColor: getColors().secondary[900],
              marginTop: "68px",
              zIndex: 4,
            },
          }}
        >
          <Box p={2} role="presentation" textAlign="center">
            {/* Show the selected course name */}
            <Typography variant="h6">Topics</Typography>
            <List>
              {courses.find(course => course.id === selectedCourse)?.topics.map((topic: any) => (
                <ListItem key={topic.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectTopic(topic.id)}>
                    <ListItemText primary={topic.title} />
                    {userType === UserCategory.SUPER_ADMIN && (
                      <Box>
                        <Button onClick={() => handleEditTopic(topic)}><EditOutlinedIcon/></Button>
                        <Button onClick={() => handleDeleteTopic(selectedCourse, topic.id)}><DeleteOutlineIcon/></Button>
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
              {userType === UserCategory.SUPER_ADMIN && 
                <Button onClick={handleAddNewTopic}>Add New Topic</Button>
              }
              {newTopic && (
                <ListItem key={newTopic.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectTopic(newTopic.id)}>
                    <ListItemText primary={newTopic.title} />
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Container>
  );
};

export default CoursePage;