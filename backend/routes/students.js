const router = require("express").Router();
let Student = require("../models/Student");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, "../frontend/src/assets/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


router.post("/add", upload.single("profileImage"),(req, res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const profileImage = req.file.filename;

    const newStudent = new Student({name, age, gender, profileImage});

    newStudent.save().then(() => {
        res.json("Student Added Success!");
    }).catch((err) => {
        console.log(err);
        res.json("Student Added Failed!");
    })

});

router.route("/").get((req, res) => {

    Student.find().then((student) => {
        res.json(student);
    }).catch((err) => {
        console.log(err);
    })

});

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {name, age, gender} = req.body;

    // const updateStudent = {name, age, gender}
    const update = await Student.findByIdAndUpdate(userId, {name, age, gender})

    res.status(200).send({status: "User Update"})
});

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Delete!"});
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send({status: "Error with delete user", error: err.message})
    })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Student.findById(userId)
        .then((student) => {
            res.status(200).send({status: "User Fetch!", student: student});
        }).catch((err) => {
            res.status(500).send({status: "Error with delete user", error: err.message})
        })
})

module.exports = router;
