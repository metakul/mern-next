import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { IDropShipItem } from '@/Datatypes/interfaces/interface';
import { Typography, Button, Grid, IconButton, MenuItem, Select } from '@mui/material';
import ImageUploader from '@/components/ImageUploader';
import WYSIWYGEditor from '@/components/WYSWYGEditor';
import 'react-quill/dist/quill.snow.css';
import CustomTextField from '@/components/Elements/TextFeild';
import { addDropShipItemApi } from '@/lib/slices/DropShip/DropShipAPI';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface AddDropShipItemProps {
  itemInfo?: IDropShipItem;
  formEvent: string;
  userType: string;
}

interface ErrorMessages {
  [key: string]: string;
}

const newErrors: ErrorMessages = {
  title: '',
  image: '',
  author: '',
  categories: '',
  price: '',
  totalItemRemaining: '',
  sizes: '',
};

const AddDropShipItemForm: React.FC<AddDropShipItemProps> = ({ itemInfo, formEvent }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IDropShipItem>(
    itemInfo
      ? itemInfo
      : {
          name: '',
          title: '',
          image: '',
          author: '',
          categories: [],
          price: undefined,
          totalItemRemaining: undefined,
          sizes: [],
        }
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [description, setDescription] = useState(itemInfo ? itemInfo.description : '');
  const [errors, setErrors] = useState<ErrorMessages>(newErrors);

  const clearForm = () => {
    setFormData({
      title: '',
      image: '',
      author: '',
      categories: [],
      price: undefined,
      totalItemRemaining: undefined,
      name: '',
      sizes: [],
    });
    setDescription('');
    setErrors(newErrors);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    setErrors(newErrors); // Reset errors
    setIsSaving(true);

    event.preventDefault();

    Object.keys(formData).forEach((key) => {
      const formValue = formData[key as keyof IDropShipItem];
      if (typeof formValue === 'string') {
        if (formValue.trim() === '') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
          }));
        }
      } else if (Array.isArray(formValue)) {
        if (formValue.length === 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
          }));
        }
      } else if (key === 'price' && !formValue) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: 'Price is required',
        }));
      } else if (key === 'totalItemRemaining' && formValue === undefined) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          totalItemRemaining: 'Total Item Remaining is required',
        }));
      }
    });

    const hasErrors = Object.values(errors).some((error) => !!error);
    if (!hasErrors) {

      console.log(itemInfo);
      
      (dispatch as AppDispatch)(
        addDropShipItemApi({
          newDropShipItemData: {
            ...formData,
            description,
            id: itemInfo?.id || itemInfo?.dropShipItemsId,
            status: 'pending',
          },
          formEvent,
          clearForm,
          setIsSaving,
        })
      );
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof IDropShipItem) => {
    if (field === 'categories') {
      const categoriesArray = e.currentTarget.value.split(',').map((category) => category.trim());
      setFormData({ ...formData, [field]: categoriesArray });
    } else if (field === 'price' || field === 'totalItemRemaining') {
      setFormData({ ...formData, [field]: parseFloat(e.currentTarget.value) || undefined });
    } else {
      setFormData({ ...formData, [field]: e.currentTarget.value });
    }
  };

  const handleDescriptionChange = (value: string) => setDescription(value);

  const register: (e: string) => void = (e) => setFormData({ ...formData, image: e });

  const areAllFieldsFilled = () => {
    return formData.title.trim() && formData.image && formData.author.trim() && formData.categories.length && formData.price !== undefined && formData.totalItemRemaining !== undefined && formData?.sizes?.length;
  };

  const handleSizeChange = (index: number, field: 'sizeName' | 'totalItems', value: string) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: field === 'totalItems' ? parseInt(value, 10) : value };
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSize = () => {
    setFormData({ ...formData, sizes: [...formData.sizes, { sizeName: '', totalItems: 0 }] });
  };

  const removeSize = (index: number) => {
    const updatedSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: updatedSizes });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Title</Typography>
          <CustomTextField
            id="title"
            type="text"
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange(e, 'title')}
            placeholder="Enter title"
            error={errors.title}
            isError={!!errors.title}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Description</Typography>
          <WYSIWYGEditor value={description} onChange={handleDescriptionChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Image</Typography>
          <ImageUploader register={register} uploadFormat="BASE64" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Author</Typography>
          <CustomTextField
            id="author"
            type="text"
            label="Author"
            value={formData.author}
            onChange={(e) => handleChange(e, 'author')}
            placeholder="Enter author"
            error={errors.author}
            isError={!!errors.author}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Categories</Typography>
          <CustomTextField
            id="categories"
            type="text"
            label="Categories (comma separated)"
            value={formData.categories.join(',')}
            onChange={(e) => handleChange(e, 'categories')}
            placeholder="Enter categories"
            error={errors.categories}
            isError={!!errors.categories}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Price</Typography>
          <CustomTextField
            id="price"
            type="number"
            label="Price"
            value={formData.price || ''}
            onChange={(e) => handleChange(e, 'price')}
            placeholder="Enter price"
            error={errors.price}
            isError={!!errors.price}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Total Item Remaining</Typography>
          <CustomTextField
            id="totalItemRemaining"
            type="number"
            label="Total Item Remaining"
            value={formData.totalItemRemaining || ''}
            onChange={(e) => handleChange(e, 'totalItemRemaining')}
            placeholder="Enter total item remaining"
            error={errors.totalItemRemaining}
            isError={!!errors.totalItemRemaining}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">Sizes</Typography>
          {(formData?.sizes || []).map((size, index) => (
            <Grid container spacing={1} key={index}>
              <Grid item xs={5}>
                <Select
                  value={size.sizeName}
                  onChange={(e) => handleSizeChange(index, 'sizeName', e.target.value as string)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Select Size
                  </MenuItem>
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                  <MenuItem value="XL">XL</MenuItem>
                  <MenuItem value="2XL">2XL</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={5}>
                <CustomTextField
                  id="totalItems"
                  type="number"
                  label="Total Items"
                  value={size.totalItems}
                  onChange={(e) => handleSizeChange(index, 'totalItems', e.currentTarget.value)}
                  placeholder="Enter total items"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeSize(index)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button onClick={addSize} startIcon={<AddIcon />}>
            Add Size
          </Button>
        </Grid>
      </Grid>
      {areAllFieldsFilled() && (
        <Button type="submit" disabled={isSaving}>
          {itemInfo ? 'Update' : 'Save'}
        </Button>
      )}
    </form>
  );
};

export default AddDropShipItemForm;