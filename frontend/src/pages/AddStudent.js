import React, {useRef, useState} from 'react';
import axios from "axios";

function AddStudent(props) {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [fileName, setFileName] = useState("");

    const fileRef = useRef();
    function sendData(e) {
        e.preventDefault();

        // const newStudent = {name, age, gender, fileName}
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("profileImage", fileName);

        axios.post("http://localhost:8070/student/add", formData)
            .then((res) => {
                console.log("respond : ", res.data)
                alert(res.data);
                setName("");
                setAge("");
                setGender("");
                fileRef.current.value = "";
            }).catch((err) => {
            // alert(err);
        })
    }

    return (
        <div className={"container"}>
            <form onSubmit={sendData} encType={"multipart/form-data"}>

                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Student Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder={"Enter student name"}
                           type="text"
                           className="form-control" id="exampleInputEmail1"/>
                </div>
    
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Student Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} placeholder={"Enter student age"}
                           type="number"
                           className="form-control"
                           id="exampleInputEmail1"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Student Gender</label>
                    <input value={gender} onChange={(e) => setGender(e.target.value)}
                           placeholder={"Enter student gender"}
                           type="text" className="form-control"
                           id="exampleInputPassword1"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Default file input example</label>
                    <input ref={fileRef} className="form-control" filename={"profileImage"} type="file" id="formFile" onChange={(e) => setFileName(e.target.files[0])}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddStudent;
