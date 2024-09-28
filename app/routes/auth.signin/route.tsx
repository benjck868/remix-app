
export default function route() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-10 w-96">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign In</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email"
                        className="input-text"
                        required />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password"
                        className="input-text"
                        required />
                </div>
                <button type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign In
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-500">Or sign in with:</p>
                    <div className="flex justify-center mt-3 space-x-4">
                        <a href="#"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="#"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <i className="fab fa-google"></i> Google
                        </a>
                    </div>
                </div>
            </form>
            <div className="mt-6 text-center">
                <p className="text-gray-500">Don't have an account? <a href="/auth/signup"
                                                                        className="text-indigo-500 hover:text-indigo-700 font-medium">Sign
                    Up</a></p>
            </div>
        </div>
    </div>
  )
}
