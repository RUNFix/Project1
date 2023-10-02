import { useState } from 'react';

type Props = {
  onImageDrop: (file: File) => void;
  index?: number;
};
export default function ImageDropzone({ onImageDrop, index }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    onImageDrop(file);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageDrop(file);
    }
  };

  return (
    <div
      className={`dropzone ${
        dragging ? 'dragging' : ''
      } border-4 border-gray-700 relative p-3 text-center mb-2`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging ? <p>Drop image here</p> : `Imagen numero ${index + 1}`}
      <input
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
      />
    </div>
  );
}
