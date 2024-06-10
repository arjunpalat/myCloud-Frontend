import { useParams } from "react-router-dom";
import { createNewFolder } from "../utils/queryDB";
import { useState, useRef, useEffect } from "react";


const FolderModal = ({ setModalOpen, fetchAndUpdateData }) => {
  const [folderName, setFolderName] = useState("New Folder");
  const { folderUUId } = useParams();
  const folderInputRef = useRef(null);

  const handleCreateFolder = async () => {
    if (folderName.length === 0) return;

    try {
      await createNewFolder(folderUUId, "url", folderName);
      fetchAndUpdateData();
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    folderInputRef.current.focus();
  }, []);

  return (
    <div className="absolute top-0 w-full h-full opacity-95 bg-black z-30 text-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
        <div className="w-80 h-52 p-4 bg-slate-300 rounded-lg flex flex-col gap-3">
          <h2 className="text-2xl">New Folder</h2>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="p-2 border border-blue-600 rounded mt-1"
            ref={folderInputRef}
          />
          <div className="flex gap-3.5 justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-blue-600 text-white p-2 rounded-3xl mt-4 border-b-4 border-blue-800 hover:scale-95 active:scale-90 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateFolder}
              className="bg-blue-600 text-white p-2 rounded-3xl mt-4 border-b-4 border-blue-800 hover:scale-95 active:scale-90 transition-transform"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;
