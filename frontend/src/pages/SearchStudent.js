import React, {useState} from 'react';
import axios from "axios";

const SearchStudent = () => {

    const [searchId, setSearchId] = useState("");

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    function search() {
        // const id = {searchId}
        console.log("search : ", searchId)

        axios.get(`http://localhost:8070/student/get/${searchId}`)
            .then((res) => {
                console.log("respond : ", res.data.student._id);
                setSearchId(res.data.student._id);
                setName(res.data.student.name);
                setAge(res.data.student.age);
                setGender(res.data.student.gender);
            }).catch((err) => {
            setSearchId("");
            setName("");
            setAge("");
            setGender("");
            alert(err);
        })
    }

    function sendData(e) {
        e.preventDefault();

        const newStudent = {name, age, gender}
        console.log("respond : ", newStudent)
        axios.put(`http://localhost:8070/student/update/${searchId}`, newStudent)
            .then((res) => {
                console.log("respond : ", res.data)
                alert(res.data.status);
                setName("");
                setAge("");
                setGender("");
            }).catch((err) => {
            // alert(err);
        })
    }

    function deleteStudent() {
        axios.delete(`http://localhost:8070/student/delete/${searchId}`)
            .then((res) => {
                console.log("respond : ", res.data);
                alert(res.data.status);
                setSearchId("");
                setName("");
                setAge("");
                setGender("");
            }).catch((err) => {
            setSearchId("");
            setName("");
            setAge("");
            setGender("");
            alert(err);
        })
    }

    return (
        <div className="container">
            <div className={"d-flex"}>
                <input value={searchId} onChange={(e) => setSearchId(e.target.value)} className="form-control me-2" type="search"
                       placeholder="Search" aria-label="Search"/>
                <button onClick={search} className="btn btn-outline-success" type="submit">Search</button>
            </div>

            <form onSubmit={sendData}>

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

                <button type="submit" className="btn btn-primary me-5">Submit</button>
                <button type="button" onClick={deleteStudent} className="btn btn-primary">Delete</button>
            </form>
        </div>
    );
};

export default SearchStudent;
