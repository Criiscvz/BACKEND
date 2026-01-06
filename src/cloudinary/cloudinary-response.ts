
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

//aqui cloudinary nos devuelve dos tipos de respuestas, una si la subida fue exitosa y otra si hubo un error
//por eso usamos un tipo union para manejar ambas respuestas