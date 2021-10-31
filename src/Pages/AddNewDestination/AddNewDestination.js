import React from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './AddNewDestination.css'

const AddNewDestination = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { name, price, img, time, loved, description } = data;
        const newDestination = { name, price, img, time, loved, description };        
        
        fetch('http://localhost:5000/add-new-destination', {
            method:"POST",
            headers: {
                'content-type':"application/json"
            },
            body: JSON.stringify(newDestination)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('New Destination Successfully Added')
                    reset()
                }
            })
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table className="container" style={{fontFamily:"Josefin Sans", fontWeight:'700'}}>
                    <tbody>
                        <tr>
                            <td ><label className="mb-3">Destination Name :</label></td>
                            <td><input className="px-2 py-1 w-75 mb-3" type="text" placeholder="Destination Name" {...register("name", { required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label className="mb-3">Price :</label></td>
                            <td><input className="px-2 py-1 w-75 mb-3" type="number" placeholder="Price" {...register("price", { required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label className="mb-3">Img URL :</label></td>
                            <td><input className="px-2 py-1 w-75 mb-3" type="text" placeholder="Img URL" {...register("img", { required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label className="mb-3">Duration :</label></td>
                            <td><input className="px-2 py-1 w-75 mb-3" type="text" placeholder="3 days 2 nights" {...register("time", { required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label className="mb-3">Loved by :</label></td>
                            <td><input className="px-2 py-1 w-75 mb-3" type="number" placeholder="Loved by" {...register("loved", { required: true })} /></td>
                        </tr>
                        <tr>
                            <td><label className="mb-3">Description :</label></td>
                            <td><textarea className="px-2 py-1 w-75 h-25 mb-3" type="text" placeholder="Description" {...register("description", { required: true })} /></td>
                        </tr>
                    </tbody>
                </table>
                {errors.exampleRequired && <span>This field is required</span>}
                <input style={{fontFamily:"Josefin Sans"}} className = "hero-btn btn mb-5" type="submit" value="Add new destination" />
            </form>
        </Container>
    );
};

export default AddNewDestination;