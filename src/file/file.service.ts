import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './file.response.dto';

@Injectable()
export class FileService {
	async saveFiles(files: Express.Multer.File[], folder: string = 'default'): Promise<FileResponse[]> {
		const uploadFolder = `${path}/uploads/${folder}`//папка куда будем грузить
		await ensureDir(uploadFolder)//ensureDir-проверяет существует наша папка или нет, если нет создает
		
        const res: FileResponse[] = await Promise.all(//Promise.all нежен для того что бы map был асихронным
			files.map(async (file) => {
				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)//указываем сам файл и куда будем записывать
				return {
					url: `/uploads/${folder}/${file.originalname}`,//то что получаем на фронте
					name: file.originalname,
				}
			})
		)
		return res
	}
}


// <iframe width="1901" height="808" src="https://www.youtube.com/embed/_J8tYxYB_YU" title="Vincenzo |
// Official Trailer | Netflix" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
//encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>