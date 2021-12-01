import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import AlertModal from '../Shared/AlertModal/AlertModal';
import './AddNewDestination.css'

const AddNewDestination = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [control, setControl] = useState(false);
    const [AlertModalShow, setAlertModalShow] = useState(false);

    const uploadImage = () => {
        const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
        const cloud_name = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
        const url = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

       fetch(url, {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    setImageUrl(data.url);
                }
            })
    }
    
    const onSubmit = async (data) => {
        uploadImage();
        setControl(true);
       
        if (control) {
            const { name, price, time, loved, description } = data;
            const newDestination = { name, price, img:imageUrl, time, loved, description };        
            
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
                        setAlertModalShow(true);
                        reset()
                    }
            })
        }
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
                            <td><label className="mb-3">Thumbnail:</label></td>
                            <td>
                                <input className="ms-0 py-1 mb-3" type="file" required onChange={(e) => { setImage(e.target.files[0]) }}/>
                                {/* <input className="py-1 mb-3" type="submit" disabled={control} value="Upload" onClick={uploadImage} /> */}
                            </td>
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
            <AlertModal show={AlertModalShow} onHide={() => setAlertModalShow(false)} variant="success">New destination added successfully !!!</AlertModal>
        </Container>
    );
};

export default AddNewDestination;