import { RefObject, useEffect } from 'react';
import { useLocalFiles } from './useFiles';

export const useDropZone = <T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>
) => {
  const { loadLocalSamples } = useLocalFiles();

  const handleDragOver = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { files } = e.dataTransfer;
    loadLocalSamples(files);
  };

  useEffect(() => {
    ref.current.addEventListener('dragover', handleDragOver);
    ref.current.addEventListener('drop', handleDrop);
    return () => {
      ref.current.removeEventListener('dragover', handleDragOver);
      ref.current.addEventListener('drop', handleDrop);
    };
  }, []);

  return { loadLocalSamples };
};
