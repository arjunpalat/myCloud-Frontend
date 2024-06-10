import { MdOutlineCreateNewFolder, MdOutlineUploadFile } from "react-icons/md";
import { useRef } from "react";
import { uploadFile } from "../utils/queryDB";
import { useParams } from "react-router-dom";

const AddNewModal = ({ setFolderModalOpen, setModalOpen, setFileModalOpen }) => {
  const { folderUUId } = useParams();
  const showFolderModal = () => {
    setFolderModalOpen(true);
    setModalOpen(false);
  };
  const showFileModal = () => {
    setFileModalOpen(true);
    setModalOpen(false);
  }

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      try {
        const data = await uploadFile(folderUUId, "url", {
          name: file.name,
          size: file.size,
          base64Data: base64String,
          type: file.type,
        });
        console.log(data);
        setModalOpen(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="absolute h-36 w-40 bottom-16 p-2 rounded-lg shadow-lg bg-slate-500 md:top-16 md:w-48">
      <div className="h-full flex flex-col justify-around">
        <div
          onClick={showFolderModal}
          className="flex items-center justify-center gap-2 border rounded-3xl hover:bg-slate-400 hover:cursor-pointer"
        >
          <MdOutlineCreateNewFolder className="text-4xl text-white" />
          <p className="text-white">New Folder</p>
        </div>
        <div
          onClick={showFileModal}
          className="flex items-center justify-center gap-2 border rounded-3xl hover:bg-slate-400 hover:cursor-pointer"
        >
          <MdOutlineUploadFile className="text-4xl text-white" />
          <p className="text-white">Upload File</p>
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;
