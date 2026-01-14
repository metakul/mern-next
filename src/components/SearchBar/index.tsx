import  { FC } from 'react';
import { TextField, Box } from "@mui/material";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box >
      <TextField
        label=" Search by Name, title, tags, id"
        variant="outlined"
        size="small"
      
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          fontSize: "0.85rem",
          fontStyle: "italic",
          color: "#9e9e9e",
          marginBottom:"10px",
          minWidth:"18em"
        }}
      />
    
    </Box>
  );
};

export default SearchBar;