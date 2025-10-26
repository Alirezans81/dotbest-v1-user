import imageCompression from "browser-image-compression";

export const compressImageToTargetSize = async (
  file: File,
  maxSizeMB: number
) => {
  const options = {
    maxSizeMB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed:", error);
    return file; // fallback: upload original
  }
};

export const useCompressImageToTargetSize = () => {
  return compressImageToTargetSize;
};
