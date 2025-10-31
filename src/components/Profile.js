import React, { useEffect, useState } from 'react'
import { getUserData, updateUser } from '../store/slice/usersSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { useFormik } from 'formik'
export default function Profile() {
    const [user, setUser] = useState(null)
    const [editBtn, setEditBtn] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserData())
    }, [])

    const AllUsers = useSelector((state) => state.users.user)
    useEffect(() => {
        const email = localStorage.getItem("email");
        console.log("Email : ", email)
        if (!email) {
            navigate("/login")
            return
        }
        if (Array.isArray(AllUsers) && AllUsers?.length > 0) {
            const foundUser = AllUsers.find((item) => item.email === email)
            if (foundUser) {
                setUser(foundUser)
            } else {
                navigate("/login")
            }
        } else {
            navigate("/login")
        }
    }, [AllUsers, navigate])
    
    const initailState = {
        email : user?.email || "",
        firstname : user?.firstname || "",
        lastname : user?.lastname || "",
        age : user?.age || "",
        bio : user?.bio || "",
    }

    console.log("User !",initailState)

    const validationSchema = Yup.object({
        email : Yup.string().email("Please enter a valid email address").required("Email is required"),
        firstname : Yup.string().min(3, "First name must be at least 3 characters").required("First name is required"),
        lastname : Yup.string().min(3, "Last name must be at least 3 characters").required("Last name is required"),
        age : Yup.number().min(16, "Age must be at least 16").required("Age is required"),
        bio : Yup.string().min(16, "Bio must be at least 16 char long").required("Bio is required")
    })

    const formik = useFormik({
        initialValues: initailState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (user.email === values.email) {
                    dispatch(updateUser({
                        ...values,
                        flag: true,
                        oldEmail: user?.email
                    }))
                } else {
                    const emailExists = AllUsers.some(item => item.email === values.email);
                    if (emailExists) {
                        alert("Email Already Exists")
                        return;
                    }
    
                    console.log("Email Changed !")
                    dispatch(updateUser({
                        ...values,
                        oldEmail: user?.email,
                        flag: true
                    }))
                    
                    // ✅ Email change hone par localStorage update karo
                    localStorage.setItem("email", values.email);
                }
                setEditBtn(false);
            } catch (error) {
                console.log("Error", error)
            }
        }
    })

    useEffect(() => {
        if (user) {
            formik.setValues({
                email : user?.email || "",
                firstname : user?.firstname || "",
                lastname : user?.lastname || "",
                age : parseInt(user?.age )|| "",
                bio : user?.bio || "",
            })
        }
    }, [user])

    return (
        <>
            {user && user != null && <div className="container mt-4">
                {editBtn ? <>
                <div className="row justify-content-center">
                    <div className="col-md-6 mx-auto bg-white">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-center">Edit Profile</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">{formik.errors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
                                            id="firstname"
                                            name="firstname"
                                            value={formik.values.firstname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.firstname && formik.errors.firstname && (
                                            <div className="invalid-feedback">{formik.errors.firstname}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                                            id="lastname"
                                            name="lastname"
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.lastname && formik.errors.lastname && (
                                            <div className="invalid-feedback">{formik.errors.lastname}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bio" className="form-label">Bio</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`}
                                            id="bio"
                                            name="bio"
                                            value={formik.values.bio}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.bio && formik.errors.bio && (
                                            <div className="invalid-feedback">{formik.errors.bio}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input
                                            type="number"
                                            className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
                                            id="age"
                                            name="age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.age && formik.errors.age && (
                                            <div className="invalid-feedback">{formik.errors.age}</div>
                                        )}
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button type="submit" className="btn btn-primary">Update Profile</button>
                                        <button onClick={()=>{setEditBtn(false)}} type="button" className="btn btn-danger">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </> : <>
                    <div className="row justify-content-center">
                        <div className="col-md-6 bg-white">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="text-center">User Profile</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>First Name:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.firstname}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Last Name:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.lastname}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Email:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.email}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Age:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.age}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Bio:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.bio}
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <strong>Member Since:</strong>
                                        </div>
                                        <div className="col-6">
                                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-12 text-center">
                                            <button onClick={()=>{setEditBtn(true)}}  className="btn btn-primary">
                                                Edit Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            </div>}

        </>
    )
}
