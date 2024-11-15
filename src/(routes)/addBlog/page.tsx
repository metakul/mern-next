import { useSelector } from 'react-redux';
import { selectUserType } from '@/lib/slices/authSlice';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import AddDropShipItemForm from '@/components/Forms/AddDropShipItemForm';
import { Pages } from '@/Datatypes/enums';
function AddDropShipItemPage() {

  const userType = useSelector(selectUserType);

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