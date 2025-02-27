export default function Sidebar() {
    return (
      <aside className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">AutoRedirect</h1>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <a href="#" className="block px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-600 transition">
                Redirect Rules
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-600 transition">
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <footer className="mt-auto">
          <p className="text-sm text-gray-400">© 2025 AutoRedirect</p>
        </footer>
      </aside>
    );
  }
  