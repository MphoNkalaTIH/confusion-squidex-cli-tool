import fs from 'fs/promises';

export async function getRoot() {
  const files = await fs.readdir('squidex');
  const mappedFiles = files?.map((file) => ({ parent: 'squidex', self: file }));

  console.log({ mappedFiles });
  const formattedFiles = await getFileOrFolderDetails(mappedFiles);

  return formattedFiles;
}

export async function getFolderContent(parent?: string, self?: string) {
  if (!parent || !self || self == 'squidex') {
    return await getRoot();
  }

  const files = await fs.readdir(`${parent}/${self}`);
  const mappedFiles = files?.map((file) => ({ parent: `${parent}/${self}`, self: file }));
  const formattedFiles = await getFileOrFolderDetails(mappedFiles);

  return formattedFiles;
}

function getFileOrFolderDetails(files: { parent: string; self: string }[]) {
  return Promise.all(
    files.map(async (file) => {
      const filePath = `${file.parent}/${file.self}`;

      const stat = await fs.stat(filePath);

      const type = stat.isDirectory() ? 'directory' : 'file';
      const size = formatSize(stat.size);
      const modified = stat.mtime;
      const created = stat.birthtime;

      const identifier =
        type == 'directory'
          ? filePath
          : await fs.readFile(filePath, 'utf-8').then((content) => JSON.parse(content).id);

      return {
        id: identifier,
        label: file.self,
        parent: file.parent,
        type,
        size,
        modified,
        created,
        relativeFilePath: filePath,
        marked: false,
      };
    })
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function isValidPath(path: string) {
  return fs
    .stat(path)
    .then((stat) => stat.isDirectory() || stat.isFile())
    .catch(() => false);
}
