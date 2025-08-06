import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(), // Almacena el archivo en memoria como un Buffer
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB por archivo
  },
});

export default upload;
