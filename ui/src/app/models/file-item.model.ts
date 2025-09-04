export interface FileItem {
  id: string;
  label: string;
  relativeFilePath: string;
  parent: string;
  type: string;
  size: string;
  created: string;
  modified: string;
  marked: boolean;
}
