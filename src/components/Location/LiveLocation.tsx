import { Dialog, DialogContent } from '@mui/material';
import { useState, useEffect } from 'react';

function MyLocation({ setAddress, open, handleClose }: { setAddress: any, open: boolean, handleClose: any }) {

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const [loadingLocation, setLoadingLocation] = useState(false)


    const handleChooseAddress = async (address: any) => {
        if (address) {
            console.log("position", position);

            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=AIzaSyAPmwIsuJ5T0E2rnDUEYHbDwoCcoPnJxZM`);
            const data = await res.json();
            console.log("data", data);

            setAddress(data.results[0].formatted_address);
            handleClose()
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            setLoadingLocation(true)
            navigator.geolocation.getCurrentPosition(function (positionInfo) {
                if (positionInfo.coords.latitude && positionInfo.coords.longitude) {
                    console.log(positionInfo.coords.latitude, " positionInfo.coords.latitude,");

                    setPosition({
                        latitude: positionInfo.coords.latitude,
                        longitude: positionInfo.coords.longitude,
                    });
                    console.log(positionInfo)
                    setLoadingLocation(false)

                }
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    useEffect(() => {
        if (position.latitude && position.longitude) {
            handleChooseAddress(position);

        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, [position]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogContent>
                    <img src="/loading.gif"
                        width={200}
                        height={200}
                        alt='loading' />
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default MyLocation;