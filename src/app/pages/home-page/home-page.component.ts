import { Component, signal } from '@angular/core';
import {
  faBookOpenReader,
  faClone,
  faCodeMerge,
  faCoffee,
  faEdit,
  faFile,
  faFolder,
  faHome,
  faSync,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  protected readonly title = signal('confusion-squidex');

  pathItems: any[] | undefined;

  faSync = faSync;
  faFolder = faFolder;
  faFile = faFile;
  faUpload = faUpload;
  faCoffee = faCoffee;
  faHome = faHome;
  faEdit = faEdit;
  faTrash = faTrash;
  faClone = faClone;
  faCodeMerge = faCodeMerge;
  faBookOpenReader = faBookOpenReader;

  ngOnInit() {
    this.pathItems = [
      {
        label: 'src',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'folder',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
      },
      {
        label: 'components',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'folder',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
      },
      {
        label: 'app.tsx',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'file',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
      },
      {
        label: 'package.json',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'file',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
      },
      {
        label: 'index.css',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'file',
        size: '211.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
      },
      {
        label: 'utils.css',
        icon: 'pi pi-home',
        path: 'path/to/source',
        type: 'file',
        size: '111.2 Kbs',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
      },
    ];
  }

  fetchSimplifiedDate(date: string): string {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    return dateObj.toLocaleDateString('en-US', options);
  }

  pullLatestSquidexContent() {
    console.log('Pull Latest Squidex Content Clicked');
  }

  pushUpdatedSquidexContent() {
    console.log('Push Updated Squidex Content Clicked');
  }

  editFileContents() {
    console.log('Edit File Contents Clicked');
  }

  cloneFile() {
    console.log('Clone File Clicked');
  }

  mergeFiles() {
    console.log('Merge Files Clicked');
  }

  deleteFile() {
    console.log('Delete File Clicked');
  }

  previewFile() {
    console.log('Preview File Clicked');
  }
}
