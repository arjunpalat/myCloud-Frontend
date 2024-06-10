import { BiPlus, BiHomeCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddNewModal from "./AddNewModal";

const Sidebar = ({modalOpen, setModalOpen, setFolderModalOpen, setFileModalOpen}) => {
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="w-full fixed bottom-0 bg-gray-300 border-t border-black h-20 md:w-64 md:h-full">
      <div className="relative p-4 flex justify-between items-center text-white md:mt-20 md:gap-8 md:items-start">
        {modalOpen && (
          <AddNewModal
            setFolderModalOpen={setFolderModalOpen}
            setModalOpen={setModalOpen}
            setFileModalOpen={setFileModalOpen}
          />
        )}
        <button
          onClick={toggleModal}
          className="bg-blue-600 px-2 py-2 rounded-[50%] hover:scale-95 active:scale-90 transition duration-200 md:flex md:rounded-3xl md:gap-2 md:w-1/2 md:border-b-4 md:border-blue-800"
        >
          <BiPlus className="text-2xl" />
          <p className="hidden md:block">New</p>
        </button>
        <Link
          to="/folders/home"
          className="bg-white px-2 py-2 rounded-[50%] text-blue-600 hover:scale-95 active:scale-90 transition duration-200 md:flex md:rounded-3xl md:gap-2 md:w-1/2 md:border-b-4 md:border-blue-800"
        >
          <BiHomeCircle className="text-2xl" />
          <p className="hidden md:block">Home</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
