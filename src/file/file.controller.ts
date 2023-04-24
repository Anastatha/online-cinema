import { Controller, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor(private readonly fileService:FileService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFiles(@UploadedFile() file:Express.Multer.File, @Query('folder') folder?: string) {
        return this.fileService.saveFiles([file], folder)
    }
}
