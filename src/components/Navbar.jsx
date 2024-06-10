import Search from "./Search";

const Navbar = ({ handleLogout, filesMeta }) => {
  return (
    <div className="w-full fixed top-0 bg-blue-600 z-10 border-b border-black select-none">
      <div className="w-full mx-auto flex items-center justify-between p-4 gap-4">
        <div className="flex w-full items-center gap-4">
        <h1 className="hidden md:block text-white text-xl font-bold">☁️ myCloud</h1>
        <Search filesMeta={filesMeta} />
        </div>
        <div className="flex items-center justify-between text-white gap-4">
          <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-blue-600 font-bold"></div>
          <button
            className="bg-white text-blue-600 px-2 py-2 rounded hover:scale-95 active:scale-90 transition duration-200"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
