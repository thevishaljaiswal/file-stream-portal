
import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { UploadedFileItem } from "./UploadedFileItem";
import { toast } from "@/hooks/use-toast";

type DocumentUploadSectionProps = {
  label: string;
};

export const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  label,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList);
    // Prevent duplicates by name+size+lastModified
    const filtered = newFiles.filter(
      (f) =>
        !files.some(
          (u) =>
            u.name === f.name &&
            u.size === f.size &&
            u.lastModified === f.lastModified
        )
    );
    setFiles((prev) => [...prev, ...filtered]);
    if (filtered.length > 0) {
      toast({
        title: "Upload Successful",
        description: `${filtered.length} file(s) added.`,
      });
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDelete = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
    toast({ title: "Deleted", description: `"${file.name}" removed.` });
  };

  const onView = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
      <h2 className="font-semibold text-[15px] text-gray-800 mb-2">{label}</h2>
      <div
        className="flex flex-col items-center gap-1 border-2 border-dashed border-gray-300 rounded px-1.5 py-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer mb-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload size={18} className="text-gray-500 mb-0.5" />
        <span className="text-xs font-medium text-gray-700">
          Upload Files
        </span>
        <input
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            handleFiles(e.target.files);
            if (inputRef.current) inputRef.current.value = "";
          }}
        />
      </div>
      <div className="space-y-0.5">
        {files.length === 0 ? (
          <p className="text-gray-400 text-[11px] italic pl-1">No files uploaded.</p>
        ) : (
          files.map((file, idx) => (
            <UploadedFileItem
              key={file.name + file.size + file.lastModified + idx}
              file={file}
              onView={onView}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
