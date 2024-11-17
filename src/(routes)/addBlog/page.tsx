import { useSelector } from 'react-redux';
import { isAuthenticated, selectUserType } from '@/lib/slices/authSlice';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import AddDropShipItemForm from '@/components/Forms/AddDropShipItemForm';
import { Pages, UserCategory } from '@/Datatypes/enums';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AddDropShipItemPage() {

  const userType = useSelector(selectUserType);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);
  const navigation = useNavigate(); 

  useEffect(() => {
    if (!isUserAuthenticated && selectedUserType!==UserCategory.ROADIES_SUPER_ADMIN) {
      navigation("/"); 
    }
  }, [isUserAuthenticated, history]);
  return (
    <div>
          <BreadCrumbs currentPath={Pages.ADD_DROPSHIP_ITEM} />
          <div>


            <AddDropShipItemForm  userType={userType} formEvent={"ADD DropShipItem"} />
          </div>
              
    </div>
  )
}

export default AddDropShipItemPage