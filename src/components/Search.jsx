import { useEffect, useState } from "react";
import { BiX, BiSolidFileImage } from "react-icons/bi";
import { getAllFilesMetadata } from "../utils/queryDB";
import { useNavigate } from "react-router-dom";

const Search = ({ filesMeta }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredFiles = filesMeta?.filter((file) => {
    return file.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative md:max-w-96 flex-grow z-10">
      <div className="relative z-10 w-full rounded-3xl p-2 bg-slate-100 border-b-4">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="w-full p-1 outline-none bg-slate-100"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="text-2xl rounded-[50%] hover:bg-gray-300"
          >
            <BiX />
          </button>
        </div>
      </div>
      {searchTerm.length !== 0 && (
        <div className="absolute top-[50%] h-72 shadow-lg bg-slate-100 w-full p-4 rounded-b-3xl">
          <div className="text-center text-sm mt-4">Search results:</div>
          <div className="flex flex-col mt-4 h-48 overflow-y-auto">
            {filteredFiles.map((file) => {
              return (
                <a
                  key={file.id}
                  href={`/files${file.url}`}
                  target="_blank"
                  className="flex gap-1 items-center border-t p-2 hover:bg-gray-200 hover:cursor-pointer"
                >
                  <BiSolidFileImage className="text-blue-300 text-xl" />
                  <p className="text-sm">{file.name}</p>
                </a>
              );
            })}
            {filteredFiles.length === 0 && (
              <div className="text-center mt-4 text-md font-semibold">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
