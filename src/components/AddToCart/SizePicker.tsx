import React from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

interface SizePickerProps {
  sizes: { sizeName: string; totalItems: number }[];
  onSelectSize: (size: string) => void;
  onClose: () => void;
}

const SizePicker: React.FC<SizePickerProps> = ({ sizes, onSelectSize, onClose }) => {
  const [selectedSize, setSelectedSize] = React.useState<string>('');

  const handleSelectSize = () => {
    if (selectedSize) {
      onSelectSize(selectedSize);
    }
    onClose();
  };

  return (
    <Box className="p-4  rounded-lg shadow-lg">
      <FormControl fullWidth className="mb-4">
        <InputLabel id="size-select-label">Size</InputLabel>
        <Select
          labelId="size-select-label"
          value={selectedSize}
          label="Size"
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full"
        >
          {sizes.map((size) => (
            <MenuItem key={size.sizeName} value={size.sizeName}>
              {size.sizeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleSelectSize}
        className="w-full py-2 rounded-lg hover:bg-blue-600"
      >
        Confirm Size
      </Button>
    </Box>
  );
};

export default SizePicker;