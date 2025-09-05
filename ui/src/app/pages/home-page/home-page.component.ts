import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faBookOpenReader,
  faCheckDouble,
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
import { BreadCumb } from '../../models/breadcrumb.model';
import { FileItem } from '../../models/file-item.model';
import { SquidexApp, SquidexSchema } from '../../models/squidex-app.model';
import { FileSystemService } from '../../services/file-system.service';

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
  protected mergeFilesModal = signal(false);

  protected selectedItems = signal<FileItem[]>([]);
  protected pathItems = signal<FileItem[]>([]);
  protected squidexApps = signal<SquidexApp[]>([]);
  protected squidexSchemas = signal<SquidexSchema[]>([]);
  protected pullLatestContentForm = signal<FormGroup | null>(null);
  protected breadCrumbItems = signal<BreadCumb[] | undefined>([]);

  constructor(
    private formBuilder: FormBuilder,
    private fileSystemService: FileSystemService,
  ) {}

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
  faCheckDouble = faCheckDouble;

  ngOnInit() {
    this.initRoot();

    this.breadCrumbItems.set([{ label: 'squidex', navigation: 'squidex' }]);

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

  initRoot() {
    this.fileSystemService.getRoot().then((root) => {
      this.pathItems.set(root);
    });
  }

  onBreadCrumbNavigate(breadCrumb: BreadCumb) {
    this.fileSystemService.getFolderItems(breadCrumb.navigation, breadCrumb.label).then((items) => {
      this.pathItems.set(items);

      // Remove everything after the clicked breadcrumb
      this.breadCrumbItems.update((crumbs) => {
        const index = (crumbs ?? []).findIndex(
          (c) => c.label === breadCrumb.label && c.navigation === breadCrumb.navigation,
        );
        return index !== -1 ? (crumbs ?? []).slice(0, index + 1) : (crumbs ?? []);
      });
    });
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

    const result = dateObj.toLocaleDateString('en-US', options);

    return result;
  }

  clearAllSelectedItems() {
    this.selectedItems().forEach((item) => (item.marked = false));
    this.selectedItems.set([]);
  }

  markFileItem(item: FileItem) {
    item.marked = !item.marked;

    if (item.marked) {
      this.selectedItems().push(item);
    } else if (this.selectedItems().includes(item) && !item.marked) {
      const findIndex = this.selectedItems().findIndex((v) => v.id == item.id);

      const filteredArray = this.selectedItems().filter((v) => !(v.id == item.id));

      this.selectedItems.set([...filteredArray]);
    }
  }

  openFile(item: FileItem) {
    this.fileSystemService.getFolderItems(item.parent, item.label).then((child_root) => {
      this.pathItems.set(child_root);

      this.breadCrumbItems.update((items) => [
        ...(items ?? []),
        { label: item.label, navigation: item.parent },
      ]);
    });
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
    this.mergeFilesModal.set(true);
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

  handleMergeFilesEvent($event: any) {
    switch ($event) {
      case 'cancel':
        this.mergeFilesModal.set(false);
        break;
      case 'submit':
        this.mergeFilesModal.set(false);
        break;
      default:
        alert('Invalid action there');
    }
  }
  getMergeFilesBodyText() {
    const filesToMerge = this.selectedItems().map((item) => ({
      label: item.label,
      path: item.relativeFilePath,
    }));

    return `Are you sure you want to merge\n${filesToMerge[0].label}\n ${filesToMerge[0].path}\n into file\n ${filesToMerge[1].label}\n${filesToMerge[1].path}`;
  }
}
