import FolderPath from "../components/FolderPath";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Contents from "../components/Contents";
import DataContainer from "../components/DataContainer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFilesMetadata, getFolderData } from "../utils/queryDB";
import SelectionEditor from "../components/SelectionEditor";
import FolderModal from "../components/FolderModal";
import FileModal from "../components/FileModal";

const Dashboard = ({ handleLogout }) => {
  const { folderUUId } = useParams();
  const [folder, setFolder] = useState(null);
  const [selected, setSelected] = useState(null);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const [filesMeta, setFilesMeta] = useState([]);

  const fetchAndUpdateData = async () => {
    try {
      const responseFolder = await getFolderData(folderUUId, "url");
      const responseFile = await getAllFilesMetadata("", "all");
      setFolder(responseFolder.data);
      setFilesMeta(responseFile.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAndUpdateData();
  }, [folderUUId]);

  return (
    <div className="w-full h-full">
      {folderModalOpen && (
        <FolderModal
          setModalOpen={setFolderModalOpen}
          fetchAndUpdateData={fetchAndUpdateData}
        />
      )}
      {fileModalOpen && (
        <FileModal
          setModalOpen={setFileModalOpen}
          fetchAndUpdateData={fetchAndUpdateData}
        />
      )}
      {selected && (
        <SelectionEditor
          selected={selected}
          setSelected={setSelected}
          fetchAndUpdateData={fetchAndUpdateData}
        />
      )}
      <Navbar handleLogout={handleLogout} filesMeta={filesMeta} />
      <Sidebar
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setFolderModalOpen={setFolderModalOpen}
        setFileModalOpen={setFileModalOpen}
      />
      <DataContainer>
        <FolderPath currentFolder={folder} />
        <Contents
          currentFolder={folder}
          selected={selected}
          setSelected={setSelected}
        />
      </DataContainer>
    </div>
  );
};

export default Dashboard;
