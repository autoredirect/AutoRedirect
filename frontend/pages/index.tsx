import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to AutoRedirect</h1>
        <p className="text-center text-gray-600 mt-2">The best way to manage your 301 redirects efficiently.</p>
        
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* カードデザイン */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Easy Setup</h2>
            <p className="text-gray-600 mt-2">Set up 301 redirects in just a few clicks.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Custom Rules</h2>
            <p className="text-gray-600 mt-2">Define flexible redirection rules for different needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">SEO Friendly</h2>
            <p className="text-gray-600 mt-2">Ensure your website maintains its search rankings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
