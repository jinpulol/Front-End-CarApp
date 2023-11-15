import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


function EditCar(props) {

    //state
    const [car, setCar] = useState({ brand: '', model: '' });
    const [open, setOpen] = useState(false); // is dialog open

    // functions
    const handleClose = (event, reason) => {

        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    // get car's information
    const handleOpen = () => {
        setCar({
            brand: props.params.brand,
            model: props.params.model,
        });
        setOpen(true);
    }

    // update car
    const updateCar = () => {
        props.updateCar(car, props.params._links.car.href);
        setOpen(false);
    }

    const handleInputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (

        <>
            <Button variant="contained" onClick={handleOpen}>Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Brand'
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChanged
                        }></TextField>
                    <br />
                    <TextField
                        label='Model'
                        name="model"
                        value={car.model}
                        onChange={handleInputChanged
                        }></TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )}

    export default EditCar;