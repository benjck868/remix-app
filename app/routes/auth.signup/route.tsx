import { ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useSubmit } from '@remix-run/react'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import bcrypt from 'bcryptjs'

const SignupSchema = z.object({
    email: z.string({required_error:"Email is require."}).email(),
    password: z.string({required_error:"Password is require."}).length(8,"Password is atleast 8 characters long."),
    confirmPassword: z.string({required_error:"Please confirm password"})
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Password dont match.",
    path: ["confirmPassword"]
})

export async function action({request}:ActionFunctionArgs){
    const formPayload = Object.fromEntries(await request.formData())
    try{
        const saltRound = 10
        const validate = SignupSchema.safeParse(formPayload)
        if(!validate.success) throw new Error("Error validating.")
        const email = validate.data.email
        const password = validate.data.password
        const hashedPassword = await bcrypt.hash(password, saltRound)

        return {success:true}
    }
    catch(e){
        throw new Error("Error in submission")
    }
    finally{
        return {success:true}
    }
}

export default function route() {
    const actionData = useActionData<typeof action>()
    const submitForm = useSubmit()
    const formik = useFormik({
        initialValues: {
            email: "benjamin.b.sumilhig@gmail.com",
            password: "xxxxxxxx",
            confirmPassword: "xxxxxxxx"
        },
        validationSchema: toFormikValidationSchema(SignupSchema),
        onSubmit: (values,{setSubmitting}) => {
            try{
                console.log(values)
                const res = submitForm(values,{method:"post", action:""})
            }
            catch(e){
                if(e instanceof Error){
                    throw new Error("Error while submitting form")
                }
            }
            finally {
                //setTimeout(()=>setSubmitting(false),1000)
            }
        }
    })
    useEffect(()=>{
        if(actionData && actionData.success){
            console.log("action Data inside useEffect: "+ JSON.stringify(actionData))
            formik.setSubmitting(false)
        }
    },[actionData])
  return (
    <div className="bg-white  shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <Form onSubmit={formik.handleSubmit} method="post" className="space-y-4">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" className="input-text" required autoComplete='off'/>
                <div className='text-xs text-red-300'>{formik.errors.email&&formik.touched.email&&formik.errors.email}</div>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" className="input-text" autoComplete='off' required />
                <div className='text-xs text-red-300'>{formik.errors.password&&formik.touched.password&&formik.errors.password}</div>
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" id="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} name="confirmPassword" className="input-text" required autoComplete='off' />
                <div className='text-xs text-red-300'>{formik.errors.confirmPassword&&formik.touched.confirmPassword&&formik.errors.confirmPassword}</div>
            </div>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {formik.isSubmitting?"Submitting":"Sign Up"}
            </button>
            <div className="mt-4 text-center">
            <p className="text-gray-500">Or sign in with:</p>
            <div className="flex justify-center mt-2 space-x-4">
                <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Facebook
                </a>
                <a href="#" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Google
                </a>
            </div>
        </div>
        </Form>
        <div className="mt-4 text-center">
            <p className="text-gray-500">Already have an account? <a href="/auth/signin" className="text-indigo-500 hover:text-indigo-700 font-medium">Sign In</a></p>
        </div>
    </div>
  )
}
