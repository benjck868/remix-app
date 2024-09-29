import { ActionFunctionArgs } from '@remix-run/node'
import { Form, isRouteErrorResponse, Link, useActionData, useFetcher, useFormAction, useNavigation, useRouteError, useSubmit } from '@remix-run/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import bcrypt from 'bcryptjs'
import React from 'react'
import prisma from '~/.server/lib/prisma'

const SignupSchema = z.object({
    email: z.string({required_error:"Email is require."}).email(),
    name: z.string({required_error:"Name is require."}).min(1).max(20),
    password: z.string({required_error:"Password is require."}).length(8,"Password is atleast 8 characters long."),
    confirmPassword: z.string({required_error:"Please confirm password"})
}).refine((data)=>data.password === data.confirmPassword, {
    message: "Password dont match.",
    path: ["confirmPassword"]
})

export async function action({request}:ActionFunctionArgs){
    const formPayload = Object.fromEntries(await request.formData())
    const saltRound = 10
    const validate = SignupSchema.safeParse(formPayload)
    if(!validate.success) throw new Error("Error validating.")
    const email = validate.data.email
    const password = validate.data.password
    const name = validate.data.name
    const hashedPassword = await bcrypt.hash(password, saltRound)
    try{
        const ifEmailAlreadyExist = await prisma.user.findUnique({where:{
            email: email
        }})
        if(ifEmailAlreadyExist){
            return `This email "${email}" already exist.`
        }
        const user = await prisma.user.create({data: {
            email: email,
            name : name,
            password: hashedPassword,
            image: "default",
        },select: {
            id:true
        }})

        if(!user) throw new Error("Error creating new user")
        return user
    }
    catch(e){
        throw e
    }
    
}

export default function route() {
    const [errorMessage,setErrorMessage] = useState("")
    const navigation = useNavigation()
    const actionData = useActionData<typeof action>()
    const formik = useFormik({
        initialValues: {
            email: "benjamin.b.sumilhig@gmail.com",
            name: "Benjamin",
            password: "xxxxxxxx",
            confirmPassword: "xxxxxxxx"
        },
        validationSchema: toFormikValidationSchema(SignupSchema),
        onSubmit: (values,{setSubmitting}) => {
            
        }
    })
    useEffect(()=>{
        if(actionData){
            if(typeof actionData === "string"){
                setErrorMessage(actionData)
            }
            console.log("action Data inside useEffect: "+ JSON.stringify(actionData))
            
        }
    },[actionData])
  return (
    <div className="bg-white  shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <Form method="post" className="space-y-4">
            <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" className="input-text" required autoComplete='off'/>
                <div className='text-xs text-red-300'>{formik.errors.email&&formik.touched.email&&formik.errors.email}</div>
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name="name" className="input-text" required autoComplete='off'/>
                <div className='text-xs text-red-300'>{formik.errors.name&&formik.touched.name&&formik.errors.name}</div>
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
                {navigation.state === "submitting"? "loading...": "Sign Up"}
            </button>
        </Form>
        <div className="text-red-400 text-xs pt-5">
            {errorMessage}
        </div>
        <div className="mt-4 text-center">
            <p className="text-gray-500">Already have an account? <Link to="/auth/signin" className="text-indigo-500 hover:text-indigo-700 font-medium">Sign In</Link></p>
        </div>
    </div>
  )
}

export function ErrorBoundary(){
    const error = useRouteError()
    if(error instanceof Error){
        return(
        <div>instance of errorxxxx: {JSON.stringify(error)}</div>
        )
    }
    else if(isRouteErrorResponse(error)){
        return(
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{error.status}</strong>
            <span className="block sm:inline"> {error.statusText} : {error.data}</span>
        </div>
        )
    }
    else{
        return(
        <div>Unknown error: {JSON.stringify(error)}</div>
        )
    }
}
