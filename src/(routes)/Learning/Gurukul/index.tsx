import React, { useState } from "react";
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
} from "@mui/material";
import { getColors } from "@/layout/Theme/themes";
import MenuIcon from "@mui/icons-material/Menu";

// Import the courses data from the external file
import { courses, Topic } from "@/data/courses";

const CoursePage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourse] = useState<string>("ReactJsCourse"); // Default course
  const [selectedTopic, setSelectedTopic] = useState<Topic>(courses[selectedCourse][0]);
  const isDesktop = useMediaQuery("(min-width:768px)"); 

  // Ensure sidebar is open by default on desktop
  const sidebarOpen = isDesktop ? true : isSidebarOpen;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const handleSelectTopic = (id: number) => {
    const topic = courses[selectedCourse].find((topic) => topic.id === id);
    if (topic) setSelectedTopic(topic);
    if (!isDesktop) setIsSidebarOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column">
         <Typography variant="h5" sx={{ mb: 2 }}>
              {selectedCourse.replace(/([A-Z])/g, ' $1').trim()}
            </Typography>
      <Box display="flex" flex="1" p={2}>
        <Box flex="1" p={4}>
          <Typography variant="h2">{selectedTopic.title}</Typography>
          <p>{selectedTopic.content}</p>
        </Box>
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
              {courses[selectedCourse].map((topic) => (
                <ListItem key={topic.id} disablePadding>
                  <ListItemButton onClick={() => handleSelectTopic(topic.id)}>
                    <ListItemText primary={topic.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default CoursePage;
