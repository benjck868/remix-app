import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, redirect } from '@remix-run/react'

export default function route() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Outlet />
    </div>
  )
}
