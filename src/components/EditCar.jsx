import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";


function EditCar(props) {

    //state
    const [car, setCar] = useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
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
            color: props.params.color,
            fuel: props.params.fuel,
            year: props.params.year,
            price: props.params.price
        });
        setOpen(true);
    }

    // update car
    const updateCar = () => {
        props.updateCar(car, props.params._links.car.href);
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (

        <>
            <Button variant="contained" onClick={() => setOpen(true)}>New Car</Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
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