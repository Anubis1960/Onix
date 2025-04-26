import multer from 'multer';
import {Request, Response} from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        // Specify the upload directory
        cb(null, 'uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        // Generate a unique filename
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage});

export default upload;
