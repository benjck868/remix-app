import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-100 font-sans">

      <header className="bg-cover bg-center bg-no-repeat py-24 px-4 relative shadow-md z-0"
          style={{backgroundImage: "url('https://img.freepik.com/free-photo/serious-asian-husband-checking-analyzing-statement-utilities-bills-sitting-together-home_74952-1247.jpg?t=st=1727536077~exp=1727539677~hmac=8cfaa779757f56c85defe7cc65669f1daad6f78f8b0d299a05b1a473c769e353&w=996')"}}>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200 bg-opacity-30 -z-20"></div> 
          <div className="container mx-auto text-center text-slate-700">
              <h1 className="text-5xl font-bold mb-4 text-shadow-md">Say Goodbye to Money Fights! Honey, let's make this easier! 💖</h1>
              <p className="text-xl mb-8 text-shadow">Money Honey: The app that makes couples' money management easy, transparent, and even a little fun.</p>
              <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg">Sign Up Free</Link>
          </div>
      </header>

      <main className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">Track Shared Expenses</h3>
                  <p className="text-gray-600">Easily add bills, groceries, entertainment, and more to your shared budget.</p>
                  
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">Monitor Individual Spending</h3>
                  <p className="text-gray-600">Track your own personal expenses for greater awareness and control.</p>
                  
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">Set Financial Goals</h3>
                  <p className="text-gray-600">Work together to reach your financial goals, whether it's saving for a vacation or a down payment.</p>
                  
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-4">Enjoy Financial Peace</h3>
                  <p className="text-gray-600">Build a stronger financial foundation and reduce financial stress with Money Honey.</p>
                  
              </div>
          </div>

          <div className="text-center mt-12">
              <Link to="/signup" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg">Sign Up Free</Link>
          </div>
      </main>

      <footer className="bg-gray-900 text-white py-4 px-4 mt-12">
          <div className="container mx-auto text-center">
              <p>&copy; 2024 Money Honey</p>
          </div>
      </footer>

  </div>
  );
}

