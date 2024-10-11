import MobileTabNavigation2 from '@/components/MobileTabNav/mobileVIew2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import AddBlogComp from './ShowBlogs';
import AddBlogForm from '@/components/Forms/AddBlogForm';
import { useSelector } from 'react-redux';
import { selectUserType } from '@/lib/slices/authSlice';
function BlogsPage() {
    const userType = useSelector(selectUserType);

    const tabs = [
        { value: <CheckCircleIcon />, content: <AddBlogComp status={"pending"}/>, label: "Pending" },
        { value: <PauseCircleFilledOutlinedIcon />, content: <AddBlogComp status={"approved"}/>, label: "Approved" },
    ];


    return (
        <div>
            <AddBlogForm  userType={userType} formEvent={"ADD BLOG"} />

            <MobileTabNavigation2 tabs={tabs} position='top' />
        </div>
    )
}

export default BlogsPage