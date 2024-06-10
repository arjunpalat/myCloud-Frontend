import { useParams } from "react-router-dom";
import { createNewFolder } from "../utils/queryDB";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { uploadFile } from "../utils/queryDB";

const FileModal = ({ setModalOpen, fetchAndUpdateData }) => {
  const [fileName, setfileName] = useState("image");
  const { folderUUId } = useParams();
  const fileInputRef = useRef(null);
  const fileNameInputRef = useRef(null);
  const [fileChosen, setFileChosen] = useState(false);

  const handleUploadFile = async () => {
    const file = fileInputRef.current.files[0];
    if (fileName.length === 0 || !file) return;
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      try {
        const data = await uploadFile(folderUUId, "url", {
          name: fileName,
          size: file.size,
          base64Data: base64String,
          type: file.type,
        });
        fetchAndUpdateData();
        setModalOpen(false);
      } catch (error) {
        console.log(error);
      }
    };

    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fileNameInputRef.current.focus();
  }, []);

  return (
    <div className="absolute top-0 w-full h-full opacity-95 bg-black z-30 text-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
        <div className="w-80 h-72 p-4 bg-slate-300 rounded-lg flex flex-col gap-3">
          <h2 className="text-2xl">File Name</h2>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setfileName(e.target.value)}
            className="p-2 border border-blue-600 rounded mt-1"
            ref={fileNameInputRef}
          />
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={() => setFileChosen(true)}
            />
            <button
              onClick={triggerFileInput}
              className="bg-blue-600 text-white p-2 rounded-3xl mt-4 border-b-4 border-blue-800 hover:scale-95 active:scale-90 transition-transform"
            >
              {fileChosen ? "Modify file" : "Choose file"}
            </button>
          </div>

          <div className="flex gap-3.5 justify-end">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-blue-600 text-white p-2 rounded-3xl mt-4 border-b-4 border-blue-800 hover:scale-95 active:scale-90 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadFile}
              className="bg-blue-600 text-white p-2 rounded-3xl mt-4 border-b-4 border-blue-800 hover:scale-95 active:scale-90 transition-transform"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileModal;
