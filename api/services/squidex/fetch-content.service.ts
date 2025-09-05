import axios from 'axios';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';

function getOutputDir(schema: string) {
  const environment = process.env['ENVIRONMENT']?.toLocaleLowerCase();

  switch (schema) {
    case 'qoute-sections':
      return `squidex/${environment}/qoute-sections`;

    case 'qoute-flow':
      return `squidex/${environment}/qoute-flow`;

    case 'static-data':
      return `squidex/${environment}/static-data`;

    case 'enums':
      return `squidex/${environment}/static-enums`;

    default:
      console.error(`[#] Unknown schema: ${schema} [#]`);
      return '';
  }
}

function getEnvironmentUrl(app: string, schema: string) {
  const key = `${app} ${schema}`;
  const environment = process.env['ENVIRONMENT'];

  switch (key) {
    case 'con-fusion qoute-sections':
      return `${environment}_QOUTE_SECTIONS_URL`;

    case 'con-fusion qoute-flow':
      return `${environment}_QOUTE_FLOW_URL`;

    case 'con-fusion-static static-data':
      return `${environment}_STATIC_DATA_URL`;

    case 'con-fusion-static enums':
      return `${environment}_ENUMS_URL`;
    default:
      return '';
  }
}

async function getComponentsData(token: string, app: string, schema: string) {
  const ENVIRONMENT_URL = getEnvironmentUrl(app, schema);

  return await axios
    .get(process.env[ENVIRONMENT_URL] ?? '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      console.log('[#] Done doing fetch components from squidex [#]');
      return resp.data.items;
    })
    .catch((err) => {
      console.log({ error_fetching: err });
      return null;
    });
}

function getNameAsRoute(name: string) {
  return name.replace(' ', '-').toLocaleLowerCase();
}

function buildFilePath(
  app: string,
  data: {
    environmentId: { iv: string };
    brand: { iv: string };
    route: { iv: string };
    baseRoute: { iv: string };
    name: { iv: any };
  },
  id: any,
  outDir: string
) {
  if (app === 'con-fusion-static') {
    return path.join(outDir, `${id}.json`);
  } else if (app === 'con-fusion') {
    let env = data.environmentId?.iv ?? '';
    let brand = data.brand?.iv ?? '';
    let route = data.route?.iv ?? '';
    let baseRoute = data.baseRoute?.iv != '' ? data.baseRoute.iv : getNameAsRoute(data.name.iv);

    const folderPath = path.join(outDir, env, brand, baseRoute);

    let fileName = '';
    if (route == '') fileName = `${baseRoute}-${id}.json`;
    else fileName = `${route}-${id}.json`;

    return path.join(folderPath, fileName);
  } else return '';
}

async function writeDataFiles(app: string, items: any, outDir: string) {
  for (const item of items) {
    const filePath = buildFilePath(app, item.data, item.id, outDir);
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    try {
      await fs.access(filePath);
      console.log(`Updating existing file: ${filePath}`);
    } catch {
      console.log(`Creating new file: ${filePath}`);
    }

    await fs.writeFile(filePath, JSON.stringify(item, null, 2), 'utf-8');
  }
}

export async function fetchSquidexContent(PULL_FROM_APP: any, PULL_FROM_SCHEMA: any) {
  try {
    const environment = process.env['ENVIRONMENT'];
    const ACCESS_TOKEN = process.env[`${environment}_TOKEN`];

    if (!ACCESS_TOKEN) {
      console.error('[#] No access token found. Please set the TOKEN environment variable [#]');
      return;
    }

    if (!PULL_FROM_APP || !PULL_FROM_SCHEMA) {
      console.error(
        '[#] Usage: node pull-latest-squidex.js <pull-from-app> <pull-from-schema> [#]'
      );
      return;
    }

    console.log(
      `Pulling latest data from Squidex app: ${PULL_FROM_APP}, schema: ${PULL_FROM_SCHEMA}`
    );

    const items = await getComponentsData(ACCESS_TOKEN, PULL_FROM_APP, PULL_FROM_SCHEMA);
    if (!items) {
      console.error('[#] No items found or error fetching data [#]');
      return;
    }

    const outputDir = getOutputDir(PULL_FROM_SCHEMA);
    if (items) await writeDataFiles(PULL_FROM_APP, items, `./${outputDir}`);

    console.log(`Data files written to ./${outputDir}`);
  } catch (err) {
    console.error('Error fetching Squidex data:', err);
  }
}
