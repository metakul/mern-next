import MobileTabNavigation2 from '@/components/MobileTabNav/mobileVIew2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import AddBlogComp from './ShowBlogs';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';
function BlogsPage() {
    const navigate=useNavigate()

    const tabs = [
        { value: <CheckCircleIcon />, content: <AddBlogComp status={"pending"}/>, label: "Pending" },
        { value: <PauseCircleFilledOutlinedIcon />, content: <AddBlogComp status={"approved"}/>, label: "Approved" },
    ];
    const handleOpenBlogPage = () => {
        navigate(Pages.ADD_BLOG)
    }

    return (
        <div>
            <Button onClick={handleOpenBlogPage}>
                Add Blog
            </Button>
            <MobileTabNavigation2 tabs={tabs} position='top' />
        </div>
    )
}

export default BlogsPage