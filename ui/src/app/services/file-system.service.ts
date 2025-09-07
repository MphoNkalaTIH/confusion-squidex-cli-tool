import { Injectable } from '@angular/core';
import { ConfusionApiService } from './confusion-api.service';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  constructor(private confusionApiService: ConfusionApiService) {}

  getRoot() {
    // GET /files/get-root
    return this.confusionApiService.request('GET', `/files/get-root`);
  }

  getFolderItems(parent: string, label: string) {
    return this.confusionApiService.request('GET', `/files/get-folder-content`, {
      parent,
      self: label,
    });
  }

  mergeFiles(mergeFromFilePath: string, mergeIntoFilePath: string) {
    // POST /files/merge
    console.log({ mergeFromFilePath, mergeIntoFilePath });

    return this.confusionApiService.request('POST', `/files/merge-files`, {
      mergeFromFilePath,
      mergeIntoFilePath,
    });
  }

  createFile(path: string, data: any) {
    // POST /files
    return this.confusionApiService.request('POST', `/files`, { path, ...data });
  }

  updateFile(fileId: string, data: any) {
    // PUT /files/:id
    return this.confusionApiService.request('PUT', `/files/${fileId}`, data);
  }

  deleteFile(fileId: string) {
    // DELETE /files/:id
    return this.confusionApiService.request('DELETE', `/files/${fileId}`);
  }
}
