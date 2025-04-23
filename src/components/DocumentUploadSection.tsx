
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
    // Create a temporary object url and open in new tab
    const url = URL.createObjectURL(file);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-5 md:p-6">
      <h2 className="font-semibold text-lg text-violet-700 mb-2">{label}</h2>
      <div
        className="flex flex-col items-center gap-2 border-2 border-dashed border-violet-400 rounded-lg py-8 px-4 bg-white hover:bg-violet-50 transition cursor-pointer mb-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload size={32} className="text-violet-500 mb-2" />
        <span className="text-md font-medium text-violet-700">
          Drag & Drop files or <span className="underline text-violet-900">Click to Upload</span>
        </span>
        <span className="text-xs text-gray-400">(PDF, Images, Docs, Videos, Audio...)</span>
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
      <div className="space-y-2">
        {files.length === 0 ? (
          <p className="text-gray-400 text-sm italic pl-1">No files uploaded yet.</p>
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

