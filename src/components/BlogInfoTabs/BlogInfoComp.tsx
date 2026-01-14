import React, { ReactNode, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface BlogInfoTabProps {
  tabs: { value: ReactNode; content: ReactNode; label: string }[];
  openedTab?: boolean
}

const BlogInfoTab: React.FC<BlogInfoTabProps> = ({ tabs, openedTab  }) => {
  const [value, setValue] = React.useState<number | null>();
  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Set the selected tab value to 0 when onBase4ImageClick changes

    if(openedTab){
      setValue(0)
    }
    else{
      setValue(null)
    }

  }, [openedTab]);

  function a11yProps(index: number) {
    return {
      id: `blog-tab-${index}`,
      'aria-controls': `blog-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      {openedTab && 
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Blog information tabs"
        variant="fullWidth"
      >
        {tabs.map(({ label }, index) => (
          <Tab
            key={index}
            label={label}
            {...a11yProps(index)}
            sx={{
              backgroundColor: value === index ? theme.palette.grey[200] : 'inherit',
              '&:hover': {
              },
            }}
            className='max-h-2'
          />
        ))}
      </Tabs>}
      {tabs.map(({ content }, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`blog-tabpanel-${index}`}
          className='max-h-80 overflow-auto'
        >
          {value === index && <Box sx={{ pt: 1 }}>{content}</Box>}
        </div>
      ))}
    </Box>
  );
};

export default BlogInfoTab;
