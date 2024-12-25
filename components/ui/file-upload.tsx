import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Mic, Video, X } from "lucide-react";

interface FileUploadProps {
  setMedia: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setMedia }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      setMedia(updatedFiles);
    },
    [files, setMedia]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "audio/*": [],
      "video/*": [],
    },
  });

  const handleDelete = (event: React.MouseEvent, fileToDelete: File) => {
    event.preventDefault();
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
    setMedia(updatedFiles);
  };

  const handleOpenFile = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <Card className="w-full mx-auto bg-card text-card-foreground shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upload Your Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
            isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : "border-muted bg-muted/10 dark:bg-muted/20"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-muted-foreground mb-2" />
          <p className="font-medium text-muted-foreground">
            {isDragActive ? "Drop your files here..." : "Drag & drop or click to upload"}
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <Card key={index} className="relative bg-muted/10 dark:bg-muted/20">
                <CardContent className="p-2">
                  {file.type.startsWith("image") && (
                    <div className="relative w-full h-24">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        onClick={() => handleOpenFile(file)}
                      />
                    </div>
                  )}
                  {file.type.startsWith("audio") && (
                    <div
                      className="flex items-center justify-center w-full h-24 bg-muted rounded-md"
                      onClick={() => handleOpenFile(file)}
                    >
                      <Mic className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  {file.type.startsWith("video") && (
                    <div
                      className="flex items-center justify-center w-full h-24 bg-muted rounded-md"
                      onClick={() => handleOpenFile(file)}
                    >
                      <Video className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 p-1 rounded-full text-destructive hover:bg-destructive/20"
                  onClick={(e) => handleDelete(e, file)}
                  aria-label="Delete file"
                >
                  <X className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      {selectedFile && (
        <Dialog open={true} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg">File Preview</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center items-center">
              {selectedFile.type.startsWith("image") && (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                  width={500}
                  height={500}
                  className="rounded-md"
                />
              )}
              {selectedFile.type.startsWith("audio") && (
                <audio controls className="w-full">
                  <source src={URL.createObjectURL(selectedFile)} />
                </audio>
              )}
              {selectedFile.type.startsWith("video") && (
                <video controls className="w-full">
                  <source src={URL.createObjectURL(selectedFile)} />
                </video>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default FileUpload;
