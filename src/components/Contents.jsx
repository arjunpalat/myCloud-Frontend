import { useNavigate } from "react-router-dom";
import { BiSolidFolder, BiSolidFileImage } from "react-icons/bi";
import { bytesToMB } from "../utils/helpers";

const Contents = ({ currentFolder, selected, setSelected }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full select-none">
      <table className="w-full border-collapse">
        <thead className="border-t border-gray-300">
          <tr className="grid grid-cols-3 py-3">
            <td className="font-semibold col-span-2">Name</td>
            <td className="font-semibold">Size</td>
          </tr>
        </thead>
        <tbody>
          {currentFolder?.subFolders.map((folder) => {
            const isSelected = selected?.id === folder.id;
            const itemClassName = `grid grid-cols-3 ${
              isSelected ? "bg-blue-200" : "hover:bg-slate-300"
            } py-3 border-t border-gray-300`;
            return (
              <tr
                key={folder.id}
                onDoubleClick={() => {
                  navigate(`/folders${folder.url}`);
                  setSelected(null);
                }}
                onClick={() => setSelected(folder)}
                className={itemClassName}
              >
                <td className="col-span-2 flex items-center gap-1.5">
                  <BiSolidFolder className="text-2xl text-blue-300" />
                  <span>{folder.name}</span>
                </td>
                <td className="col-span-1">-</td>
              </tr>
            );
          })}
          {currentFolder?.files.map((file) => {
            const isSelected = selected?.id === file.id;
            const itemClassName = `grid grid-cols-3 ${
              isSelected ? "bg-blue-200" : "hover:bg-slate-300"
            } py-3 border-t border-gray-300`;
            return (
              <tr
                key={file.id}
                onDoubleClick={() => {
                  navigate(`/files${file.url}`);
                  setSelected(null);
                }}
                onClick={() => setSelected(file)}
                className={itemClassName}
              >
                <td className="col-span-2 flex items-center gap-1.5">
                  <BiSolidFileImage className="text-2xl text-blue-300" />
                  <span>{file.name}</span>
                </td>

                <td className="col-span-1">{`${bytesToMB(file.size)} MB`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {currentFolder?.subFolders.length === 0 && currentFolder?.files.length === 0 && (
        <div className="font-semibold text-center text-slate-400 text-lg mt-4">No files or folders</div>
      )}
    </div>
  );
};

export default Contents;
