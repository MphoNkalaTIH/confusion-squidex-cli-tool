# Confusion-Squidex CLI Tool

A robust command-line interface tool designed for managing Squidex content version control for the **Con-Fusion** project. This tool facilitates synchronization between local development environments and various deployment stages (DEV, SIT, UAT), allowing seamless content migration and versioning.

## 🚀 Features

- **Pull Content:** Fetch the latest content models (`quote-flow`, `quote-sections`, `static-data`, `enums`) from Squidex environments.
- **Push Content:** Update Squidex with local modifications, ensuring content consistency.
- **Merge Utilities:** Intelligent JSON merging capabilities to handle content updates and avoid conflicts during integration.
- **Multi-Environment Support:** Seamlessly switch between DEV, SIT, and UAT environments via configuration.

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (Latest LTS version recommended)
- **TypeScript** (Global installation optional, as `npx` is used)
- **Visual Studio Code** (Recommended editor)

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MphoNkalaTIH/Confusion-Squidex.git
   cd Confusion-Squidex
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## ⚙️ Configuration

Create a `.env` file in the root directory. You can copy the structure below and fill in your specific Squidex credentials and endpoints.

```env
# General Configuration
ENVIRONMENT="DEV" # Options: DEV, SIT, UAT

# Authentication
CLIENT_ID="<your_client_id>"
CLIENT_SECRET="<your_client_secret>"
# Token is required for pushing content.
# Note: The push script might use specific tokens found in session storage or generated client secrets.
DEV_TOKEN="<your_access_token>"

# Base URLs (Required for Push)
DEV_BASE_URL="https://squidex-dev.isservices.co.za"
SIT_BASE_URL="<sit_base_url>"
UAT_BASE_URL="<uat_base_url>"

# API Endpoints (Required for Pull)
# Format: {ENV}_QUOTE_SECTIONS_URL, {ENV}_QUOTE_FLOW_URL, etc.

# DEV Endpoints
DEV_QUOTE_SECTIONS_URL="https://squidex-dev.isservices.co.za/api/content/con-fusion/quote-sections"
DEV_QUOTE_FLOW_URL="https://squidex-dev.isservices.co.za/api/content/con-fusion/quote-flow"
DEV_STATIC_DATA_URL="https://squidex-dev.isservices.co.za/api/content/con-fusion-static/static-data"
DEV_ENUMS_URL="https://squidex-dev.isservices.co.za/api/content/con-fusion-static/enums"

# SIT Endpoints (Example)
# SIT_QUOTE_SECTIONS_URL="..."
```

> **Tip:** To get your Access Token for pushing, log in to Squidex, go to your Profile -> Session Storage. For Client ID/Secret, check the App Settings in Squidex.

## 💻 Usage

### 1. Pulling Content

Fetch the latest data from Squidex to your local machine. The data is saved in folders corresponding to the configured `ENVIRONMENT` (e.g., `dev/`, `sit/`).

**Syntax:** `npm run pull-latest <app-name> <schema-name>`

| Command                                             | Description            |
| :-------------------------------------------------- | :--------------------- |
| `npm run pull-latest con-fusion quote-sections`     | Fetches Quote Sections |
| `npm run pull-latest con-fusion quote-flow`         | Fetches Quote Flows    |
| `npm run pull-latest con-fusion-static static-data` | Fetches Static Data    |
| `npm run pull-latest con-fusion-static enums`       | Fetches Enums          |

### 2. Pushing Content

Push specific local JSON files back to Squidex to update the content.

**Syntax:** `npm run push-squidex-content <file-path>`

```bash
npm run push-squidex-content output/thabang/budget/car-insurance/car-details-68a9b8df.json
```

_Note: Ensure the file path is correct and relative to the project root. The file needs to contain the `_links` property for the update URL._

### 3. Merging Files

Merge changes from a source file into a target file. This uses a diff/patch mechanism to update the target file with changes from the source.

**Syntax:** `npm run merge-files <source-file> <target-file>`

```bash
npm run merge-files new-version.json old-version.json
```

_Effect: Updates `old-version.json` to match `new-version.json`._

## 📂 Project Structure

```
Confusion-Squidex/
├── dev/                 # Output folder for DEV environment data
│   ├── quote-flow/
│   ├── quote-sections/
│   └── ...
├── sit/                 # Output folder for SIT environment data
├── uat/                 # Output folder for UAT environment data
├── pull-latest-squidex.ts   # Script to fetch data
├── push-squidex-content.ts  # Script to update data
├── merge-squidex-files.ts   # Script to merge JSON files
├── commands.md          # Reference for commands
├── .env                 # Environment variables (GitIgnored)
└── package.json         # Project dependencies and scripts
```

## ⚠️ Troubleshooting

- **App Not Running?**
  - Run `npm install` to ensure all dependencies are present.
  - Verify your `.env` file exists and has valid credentials.

- **Authentication Errors?**
  - Check if your `CLIENT_ID` and `CLIENT_SECRET` are correct.
  - For push operations, ensure your `TOKEN` is valid and not expired.

- **"Unknown Schema" Error?**
  - Ensure you are using the exact schema names: `quote-sections`, `quote-flow`, `static-data`, or `enums`.

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
