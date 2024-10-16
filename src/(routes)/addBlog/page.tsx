import AddBlogForm from '@/components/Forms/AddBlogForm'
import { useSelector } from 'react-redux';
import { selectUserType } from '@/lib/slices/authSlice';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
function AddBlogPage() {

  const userType = useSelector(selectUserType);

  return (
    <div>
          <BreadCrumbs currentPath={`/addBlog`} />
          <div>


            <AddBlogForm  userType={userType} formEvent={"ADD BLOG"} />
          </div>
              
    </div>
  )
}

export default AddBlogPage