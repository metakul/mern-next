import MobileTabNavigation2 from '@/components/MobileTabNav/mobileVIew2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';
import DropShipItemForm from './ShowDropShipItem';
function DropShipItemsPage() {
    const navigate=useNavigate()

    const tabs = [
        { value: <CheckCircleIcon />, content: <DropShipItemForm status={"pending"}/>, label: "Pending" },
        { value: <PauseCircleFilledOutlinedIcon />, content: <DropShipItemForm status={"approved"}/>, label: "Approved" },
    ];
    const handleOpenDropShipItemPage = () => {
        navigate(Pages.ADD_DROPSHIP_ITEM)  // update adding of item
    }

    return (
        <div>
            <Button onClick={handleOpenDropShipItemPage}>
                Add DROP SHiP Item
            </Button>
            <MobileTabNavigation2 tabs={tabs} position='top' />
        </div>
    )
}

export default DropShipItemsPage