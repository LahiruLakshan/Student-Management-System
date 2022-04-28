import React, {useEffect, useState} from 'react';
import axios from "axios";
import uploadImage from "../assets/uploads/1651164662200.jpeg"
function AllStudents(props) {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const getStudents = () => {
          axios.get("http://localhost:8070/student/")
              .then((res) => {
                  console.log(res.data)
                  setStudents(res.data)
                  console.log("Image Path : ", uploadImage)
                  console.log("Image Path : ", uploadImage)
              }).catch(() => {
                  alert("No data")
          })
        }
        getStudents();
    }, [])

    return (
        <div className={"container"}>
            <h3>All Students</h3>
            {students && students.map((value) =>
                <div key={value._id} className="card mb-2">
                    <div className="card-body">
                        <h5>{value.name}</h5>
                        <h6>{value.age}</h6>
                        <p>{value.gender}</p>
                        <p>{value._id}</p>
                        <img src={require(`../assets/uploads/${value.profileImage}`)} width={300} alt={"..."}/>
                    </div>
                </div>

            )}
        </div>

    );
}

export default AllStudents;
