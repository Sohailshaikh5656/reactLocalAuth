import React, { useEffect, useState } from 'react'
import { newUser } from '../store/slice/usersSlice'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../store/slice/usersSlice'
import { CircleLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
  const [btn, setBtn] = useState(false)
  const dispatch = useDispatch()
  const [user, setUsers] = useState(null)
  console.log("Userrs : ",user)
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(getUserData())
  },[])

  
  const AllUsers = useSelector((state)=>state.users.user)
  useEffect(()=>{
    setUsers(AllUsers)
    console.log("All Users : ",AllUsers)
  },[AllUsers])

  const initalState = {
    email: "",
    password: "",
    confirmPassword : "",
    firstname : "",
    lastname : "",
    bio : "",
    age : "",
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Email should be valid !").required("Email Required !"),
    password: Yup.string()
      .required("Password Required !")
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
      .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
      .matches(/^(?=.*\d)/, "Password must contain at least one number")
      .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, "Password must contain at least one special character"),
    confirmPassword: Yup.string()
      .required("Confirm Password Required !")
      .oneOf([Yup.ref('password')], "Passwords must match"),
    firstname: Yup.string().required("First Name Required !"),
    lastname: Yup.string().required("Last Name Required !"),
    age: Yup.number()
      .required("Age Required !")
      .positive("Age must be positive")
      .integer("Age must be a whole number")
      .min(18, "Must be at least 18 years old"),
      bio : Yup.string().min(16,"Bio should be atleast more than 15 char",).required("Bio Required !")
  })

  const formik = useFormik({
    initialValues: initalState,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setBtn(true)
        const userData = {
          ...values,
          createdAt : new Date(),
          updatedAt : new Date()
        }
        if(Array.isArray(user) && user?.length > 0){
          for(let i=0;i<user.length;i++){
            if(user[i].email === values.email){
              alert("Email Arlready Register !");
              setBtn(false)
              return;
            } 
          }
        }
        dispatch(newUser(userData))
        resetForm()
        localStorage.setItem("email",values.email)
        setTimeout(()=>{
          setBtn(false)
          alert("User Register Successfully")
          navigate("/")
        },2000)
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  })

  const handlePassword = () =>{
    const password = document.getElementById("password")
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
  }
  const handleConfirmPassword = () =>{
    const password = document.getElementById("confirmPassword")
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center my-2">
        <div className="col-4 bg-white p-3 border rounded-3">
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="row mt-3">
              <h2 className="text-center text-secondary">Sign Up!</h2>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <input type="text" className='form-control' name="firstname" placeholder='Enter First Name'
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstname && formik.touched.firstname && <div className='text-danger'>{formik.errors.firstname}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <input type="text" className='form-control' name="lastname" placeholder='Enter Last Name'
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastname && formik.touched.lastname && <div className='text-danger'>{formik.errors.lastname}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <textarea type="text" rows={4} className='form-control' name="bio" placeholder='Enter Bio'
                  onChange={formik.handleChange}
                  value={formik.values.bio}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.bio && formik.touched.bio && <div className='text-danger'>{formik.errors.bio}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <input type="number" className='form-control' name="age" placeholder='Enter Age'
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.age && formik.touched.age && <div className='text-danger'>{formik.errors.age}</div>}
              </div>
            </div>

            <div className="row my-3">
              <div className="col-12">
                <input type="text" className='form-control' name="email" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <div className="input-group">
                  <input type="password" className='form-control' id="password" name="password" placeholder='Enter Password'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  <button className="btn btn-outline-secondary" onClick={()=>{handlePassword()}} type="button">
                   👁️
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <div className="input-group">
                  <input type="password" className='form-control' id="confirmPassword" name="confirmPassword" placeholder='Confirm Password'
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                  />
                  <button className="btn btn-outline-secondary" onClick={()=>{handleConfirmPassword()}} type="button">
                    👁️
                  </button>
                </div>
                {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className='text-danger'>{formik.errors.confirmPassword}</div>}
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <button className='btn btn-primary w-100' type='submit'>{btn ? 
                <div className='d-flex justify-content-center items-align-center'>
                  <CircleLoader
                  size={25}
                  color={"#ffffff"}
                  />
                </div>
                : "Register"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}
