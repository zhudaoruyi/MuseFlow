import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileSelect }) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('audio/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileInput}
        className="hidden"
        id="audio-upload"
      />
      <label htmlFor="audio-upload" className="cursor-pointer">
        <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
        <p className="text-gray-600">选择文件</p>
      </label>
    </div>
  );
};

export default AudioUploader;