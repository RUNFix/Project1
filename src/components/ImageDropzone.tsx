import React, { useState } from 'react';

type Props = {
  onImageDrop: (file: File) => void;
  index?: number;
  className?: string;
};

export default function ImageDropzone({ onImageDrop, index, className }: Props) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // Estado para la vista previa de la imagen

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
    if (file) {
      setPreview(URL.createObjectURL(file)); // Crear y almacenar la URL de la vista previa de la imagen
      onImageDrop(file);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Crear y almacenar la URL de la vista previa de la imagen
      onImageDrop(file);
    }
  };

  return (
    <div className={className}>
      <div
        className={`dropzone ${
          dragging ? 'dragging' : ''
        } border-4 border-dashed p-4 relative text-center m-2`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
       
          <img src={preview} alt={`Preview ${index}`} className="object-cover w-full  xl:h-72" />

        ) : (
          dragging ? <p>Drop image here</p> : <p>Foto del vehículo</p>
        )}
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
    </div>
  );
}
