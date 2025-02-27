import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your 301 redirects efficiently.</p>

        {/* リダイレクトルール管理エリア */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">Redirect Rules</h2>
          <p className="text-gray-500">List of all active redirects</p>

          {/* ルール追加ボタン */}
          <div className="flex justify-end mt-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              + Add Redirect
            </button>
          </div>

          {/* ダミーデータ（後で API 連携） */}
          <table className="w-full mt-4 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">From</th>
                <th className="border border-gray-300 px-4 py-2">To</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">/old-page</td>
                <td className="border border-gray-300 px-4 py-2">/new-page</td>
                <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">Active</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">/deprecated-url</td>
                <td className="border border-gray-300 px-4 py-2">/updated-url</td>
                <td className="border border-gray-300 px-4 py-2 text-red-600 font-bold">Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
