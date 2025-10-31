import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
export default function Login() {
    const initalState = {
        email: "",
        password: "",
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("Email should be valid !").required("Email Required !"),
        password: Yup.string().required("Password Required !")
    })

    const formik = useFormik({
        initialValues: initalState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {

            } catch (error) {
                console.error("Error : ", error)
            }
        }
    })
    return (
        <div className="container">
            <div className="row bg-white d-flex justify-content-center align-items-center my-2 col-sm-4 col-md-4 col-xl-4 p-3 border rounded-3 mx-auto" >
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="row mt-3">
                        <h2 className="text-center text-secondary">Login !</h2>
                    </div>
                    <div className="row my-3">
                        <input type="text" className='form-control' name="email" placeholder='Enter Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
                    </div>
                    <div className="row my-3">
                    <input type="text" className='form-control' name="password" placeholder='Enter Email'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
                    </div>
                    <div className="row my-3">
                        <button className='btn btn-primary' type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
