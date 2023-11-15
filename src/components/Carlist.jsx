import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";


function Carlist() {

    //state variables
    const [cars, setCars] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    //columns for cars ag-grid
    const columns = [
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        {
            cellRenderer: params =>
                <Button variant="contained" size="small" color="error" onClick={() => deleteCar(params)}>
                    Delete
                </Button>
        },
        {
            cellRenderer: params =>
                <EditCar params={params.data} updateCar={updateCar} />,
            width: 120
        }
    ]



    // call getCars() function when rendering the component very first time.
    useEffect(() => getCars(), []);
    const REST_URL = 'https://carrestapi.herokuapp.com/cars/';

    const getCars = () => {
        fetch(REST_URL)
            .then(response => response.json())
            .then(responseData => {
                console.log("responseData " + responseData._embedded.cars),
                    setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error));
    }

    // delete car
    const deleteCar = (params) => {
        console.log("params: " + params.data._links.car.href);
        fetch(params.data._links.car.href, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMsg('Car is deleted successfully!');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong!');
                }
            })
            .catch(error => console.error(error));
    }

    // add new car
    const addCar = (car) => {
        //REST API call
        // alert("Lisään auton kohta REST-rajapinnan avulla tietokantaan")
        fetch(REST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    getCars();
                    setOpen(true)
                    setMsg('New car is added successfully!');
                } else
                    alert('Something went wrong!')

            })
            .catch(error => console.error(error))

    }

    // update car
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(res => {
                if (res.ok) {
                    setMsg('Car was updated successfully');
                    setOpen(true);
                    getCars();
                } else {
                    alert('Something went wrong: ' + res.status);
                }

            })
            .catch(e => console.error(e));
    }

    return (

        <>
            <AddCar addCar={addCar}></AddCar>
            <div className="ag-theme-material"
                style={{ height: '700px', width: 'auto', margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}>
                </Snackbar>
            </div>
        </>

    )
}
export default Carlist;