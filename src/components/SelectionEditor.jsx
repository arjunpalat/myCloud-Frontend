import { BiXCircle, BiSolidTrash } from "react-icons/bi";
import { deleteFile, deleteFolder } from "../utils/queryDB";

const SelectionEditor = ({ setSelected, selected, fetchAndUpdateData }) => {
  const handleDelete = async () => {
    const isFile = selected.size ? true : false;
    try {
      if (isFile) {
        await deleteFile(selected.id, "id");
      } else {
        await deleteFolder(selected.id, "id");
      }
      fetchAndUpdateData();
      setSelected(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full fixed top-0 h-20 p-2 z-20 bg-gray-700 shadow-2xl">
      <div className="flex justify-between items-center h-full px-2">
        <button
          onClick={() => setSelected(null)}
          className="text-3xl text-white"
        >
          <BiXCircle />
        </button>
        <button onClick={handleDelete} className="text-3xl text-red-500">
          <BiSolidTrash />
        </button>
      </div>
    </div>
  );
};

export default SelectionEditor;
