
import { Eye, Trash, File, FileText, FileImage, FileVideo, FileAudio } from "lucide-react";
import React from "react";

type UploadedFileItemProps = {
  file: File;
  onView?: (file: File) => void;
  onDelete?: (file: File) => void;
};

function getIconByType(type: string) {
  if (type.startsWith("image/")) return <FileImage className="text-blue-400" />;
  if (type.startsWith("video/")) return <FileVideo className="text-red-400" />;
  if (type.startsWith("audio/")) return <FileAudio className="text-green-500" />;
  if (type === "application/pdf") return <FileText className="text-rose-500" />;
  return <File className="text-gray-400" />;
}

export const UploadedFileItem: React.FC<UploadedFileItemProps> = ({
  file,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded px-3 py-2 bg-white border border-gray-200 shadow-sm hover:bg-gray-50">
      <div className="flex items-center gap-2">
        {getIconByType(file.type)}
        <div>
          <span className="text-sm font-medium text-gray-900">{file.name}</span>
          <span className="block text-xs text-gray-500">{Math.round(file.size/1024)} KB</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="p-1.5 rounded hover:bg-violet-100 text-violet-600"
          title="View"
          onClick={() => onView?.(file)}
          type="button"
        >
          <Eye size={18} />
        </button>
        <button
          className="p-1.5 rounded hover:bg-red-100 text-red-600"
          title="Delete"
          onClick={() => onDelete?.(file)}
          type="button"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

