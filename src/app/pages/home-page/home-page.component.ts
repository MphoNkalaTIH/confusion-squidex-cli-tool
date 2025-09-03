import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { FileItem } from '../../models/file-item.model';
import { SquidexApp, SquidexSchema } from '../../models/squidex-app.model';

@Component({
  selector: 'confusion-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: false,
})
export class HomePageComponent {
  protected readonly title = signal('confusion-squidex');

  protected deleteFileModal = signal(false);
  protected cloneFileModal = signal(false);
  protected pullLatestContentModal = signal(false);

  protected selectedItems = signal<FileItem[]>([]);
  protected pathItems = signal<FileItem[]>([]);
  protected squidexApps = signal<SquidexApp[]>([]);
  protected squidexSchemas = signal<SquidexSchema[]>([]);

  protected pullLatestContentForm = signal<FormGroup | null>(null);

  constructor(private formBuilder: FormBuilder) {}

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
    console.log({ launched_home_page: true });

    this.pathItems.set([
      {
        id: '6c232046-63ba-4793-8c59-048b325213f6',
        label: 'src',
        path: 'path/to/source',
        type: 'folder',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
        marked: false,
      },
      {
        id: '6c232046-4793-63ba-8c59-048b325213f6',
        label: 'components',
        path: 'path/to/source',
        type: 'folder',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
        marked: false,
      },
      {
        id: '2c294846-4793-63ba-8c59-048b325213f6',
        label: 'app.tsx',
        path: 'path/to/source',
        type: 'file',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2023-10-01',
        marked: false,
      },
      {
        id: '6c232046-4793-63ba-8c59-048b3250983f6',
        label: 'package.json',
        path: 'path/to/source',
        type: 'file',
        size: '1.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
        marked: false,
      },
      {
        id: '1c234046-4793-63ba-3e34-048b329286323f6',
        label: 'index.css',
        path: 'path/to/source',
        type: 'file',
        size: '211.2 MB',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
        marked: false,
      },
      {
        id: '3d2342346-4793-34ba-3e34-048b323223f6',
        label: 'utils.css',
        path: 'path/to/source',
        type: 'file',
        size: '111.2 Kbs',
        dateCreated: '2023-10-01',
        dateModified: '2024-02-13',
        marked: false,
      },
    ]);

    this.squidexApps.set([
      {
        id: '101-219-1203-12',
        label: 'con-fusion',
      },
      {
        id: '203-193-1034-32',
        label: 'con-fusion-static',
      },
    ]);

    this.squidexSchemas.set([
      {
        id: '001-219-1203-12',
        label: 'qoute-sections',
      },
      {
        id: '203-193-1034-32',
        label: 'qoute-flow',
      },
      {
        id: '002-193-1034-32',
        label: 'static-data',
      },
      {
        id: '301-193-1034-32',
        label: 'enums',
      },
    ]);
  }

  initPullLatestContentForm() {
    const form = this.formBuilder.group({
      app: [null, Validators.required],
      schema: [null, Validators.required],
    });

    this.pullLatestContentForm.set(form);
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

  markFileItem(item: any) {
    item.marked = !item.marked;

    if (item.marked) {
      this.selectedItems().push(item);
    } else if (this.selectedItems().includes(item) && !item.marked) {
      const findIndex = this.selectedItems().findIndex((v) => v.id == item.id);

      const filteredArray = this.selectedItems().filter((v) => !(v.id == item.id));

      this.selectedItems.set([...filteredArray]);
    }
  }

  pullLatestSquidexContent() {
    this.pullLatestContentModal.set(true);
  }
  pullLatestSquidexContentEvent($event: any) {
    switch ($event) {
      case 'cancel':
        this.pullLatestContentModal.set(false);
        break;
      case 'submit':
        this.pullLatestContentModal.set(false);
        break;
      default:
        alert('Invalid action there');
    }
  }

  pushUpdatedSquidexContent() {
    console.log('Push Updated Squidex Content Clicked');
  }

  editFileContents() {
    console.log('Edit File Contents Clicked');
  }

  cloneFile() {
    this.cloneFileModal.set(true);
  }

  mergeFiles() {
    console.log('Merge Files Clicked');
  }

  deleteFile() {
    this.deleteFileModal.set(true);
  }

  previewFile() {
    console.log('Preview File Clicked');
  }

  handleDeleteFileEvent($event: any) {
    switch ($event) {
      case 'cancel':
        this.deleteFileModal.set(false);
        break;
      case 'submit':
        this.deleteFileModal.set(false);
        break;
      default:
        alert('Invalid action there');
    }
  }

  handleCloneFileEvent($event: any) {
    switch ($event) {
      case 'cancel':
        this.cloneFileModal.set(false);
        break;
      case 'submit':
        this.cloneFileModal.set(false);
        break;
      default:
        alert('Invalid action there');
    }
  }
}
