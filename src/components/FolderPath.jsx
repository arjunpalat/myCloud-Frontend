import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { useState, useEffect } from "react";
import { getFolderData } from "../utils/queryDB";
import { useNavigate } from "react-router-dom";

const FolderPath = ({ currentFolder }) => {
  const [path, setPath] = useState([]);
  const navigate = useNavigate();

  const getFolderPath = async (folderId) => {
    const pathLocationArray = [];
    while (
      pathLocationArray.length === 0 ||
      pathLocationArray[pathLocationArray.length - 1].url !== "/home"
    ) {
      try {
        const response = await getFolderData(folderId, "id");
        pathLocationArray.push({
          name: response.data.name,
          url: response.data.url,
          id: response.data.id,
        });
        folderId = response.data.parentFolderId;
      } catch (error) {
        console.log(error);
      }
    }
    pathLocationArray.reverse();
    setPath(pathLocationArray.map((folder) => folder));
  };

  useEffect(() => {
    if (currentFolder) {
      getFolderPath(currentFolder.id);
    } /* else if (currentFolder) {
      if (path[path.length - 1].id === currentFolder.parentFolderId) {
        setPath(
          path.concat({
            url: currentFolder.url,
            name: currentFolder.name,
          })
        );
      } else {
        setPath(path.filter((folder) => folder.url !== currentFolder.url));
      }
    } */
  }, [currentFolder]);

  return (
    <div className="h-12">
      <div className="py-2 rounded-md font-light text-blue-600 flex gap-1.5 items-center">
        {path.map((folder) => {
          return (
            <div key={folder.id} onClick={() => navigate(`/folders${folder.url}`)}>
              <div className="flex gap-1 items-center hover:bg-slate-400 hover:rounded hover:cursor-pointer select-none">
                <p>{folder.name}</p>
                {folder.url !== currentFolder.url ? (
                  <BiSolidRightArrow className="text-sm" />
                ) : (
                  <BiSolidDownArrow className="text-sm" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FolderPath;
