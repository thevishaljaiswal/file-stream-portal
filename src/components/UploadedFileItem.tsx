
import { Eye, Trash, File, FileText, FileImage, FileVideo, FileAudio } from "lucide-react";
import React from "react";

type UploadedFileItemProps = {
  file: File;
  onView?: (file: File) => void;
  onDelete?: (file: File) => void;
};

function getIconByType(type: string) {
  if (type.startsWith("image/")) return <FileImage className="text-blue-400 w-4 h-4" />;
  if (type.startsWith("video/")) return <FileVideo className="text-red-400 w-4 h-4" />;
  if (type.startsWith("audio/")) return <FileAudio className="text-green-500 w-4 h-4" />;
  if (type === "application/pdf") return <FileText className="text-rose-500 w-4 h-4" />;
  return <File className="text-gray-400 w-4 h-4" />;
}

export const UploadedFileItem: React.FC<UploadedFileItemProps> = ({
  file,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between gap-1 rounded-md px-2 py-1 bg-white border border-gray-100 hover:bg-gray-50">
      <div className="flex items-center gap-2 min-w-0">
        {getIconByType(file.type)}
        <div className="truncate">
          <span className="text-xs font-medium text-gray-900 block truncate">{file.name}</span>
          <span className="text-[10px] text-gray-500">{Math.round(file.size/1024)} KB</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="p-1 rounded hover:bg-violet-50 text-violet-500"
          title="View"
          onClick={() => onView?.(file)}
          type="button"
        >
          <Eye size={14} />
        </button>
        <button
          className="p-1 rounded hover:bg-red-50 text-red-500"
          title="Delete"
          onClick={() => onDelete?.(file)}
          type="button"
        >
          <Trash size={14} />
        </button>
      </div>
    </div>
  );
};
