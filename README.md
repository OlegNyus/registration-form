# React + Vite.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

Follow these steps to run the application locally:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd registration-form
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up API key for AI functionality**

   **For macOS/Linux:**
   ```bash
   # Create the directory for API keys
   mkdir -p ~/.api_keys
   
   # Create the JSON file with your API key
   echo '{"CLAUDE_API_KEY": "your-actual-api-key-here"}' > ~/.api_keys/claude_keys.json
   ```
   
   **For Windows (Command Prompt):**
   ```cmd
   # Create the directory for API keys
   mkdir %USERPROFILE%\.api_keys
   
   # Create the JSON file with your API key
   echo {"CLAUDE_API_KEY": "your-actual-api-key-here"} > %USERPROFILE%\.api_keys\claude_keys.json
   ```
   
   **For Windows (PowerShell):**
   ```powershell
   # Create the directory for API keys
   New-Item -Path "$env:USERPROFILE\.api_keys" -ItemType Directory -Force
   
   # Create the JSON file with your API key
   $apiKeyJson = @{
       CLAUDE_API_KEY = "your-actual-api-key-here"
   } | ConvertTo-Json
   
   $apiKeyJson | Out-File -FilePath "$env:USERPROFILE\.api_keys\claude_keys.json" -Encoding utf8
   ```
   
   **Manually (All platforms):**
   1. Create a folder named `.api_keys` in your home directory:
      - macOS/Linux: `/home/username/.api_keys/` or `~/.api_keys/`
      - Windows: `C:\Users\YourUsername\.api_keys\`
   2. Create a file named `claude_keys.json` in that folder
   3. Add the following content to the file:
      ```json
      {
        "CLAUDE_API_KEY": "your-actual-api-key-here"
      }
      ```
   4. Replace `your-actual-api-key-here` with your actual Claude API key

4. **Start the development server**
   ```bash
   # Start the React app
   npm run dev
   # or
   yarn dev
   
   # In a separate terminal, start the API server
   node server.cjs
   ```
   The React app will run at `http://localhost:3000` and the API server at `http://localhost:3001`

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```
   This will create a `dist` folder with the production build

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Locally preview the production build
- `node server.cjs` - Runs the API server for AI functionality

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:3001/api/claude
PORT=3001
```

**For Windows users:**
1. Create a new file named `.env` in the project root directory
   - Note: Windows might prevent you from creating files that start with a dot
   - You can create it using Notepad by saving as "All Files" and naming it `.env`
   - Or use PowerShell: `New-Item -Path ".env" -ItemType File`
2. Add the environment variables to the file:
   ```
   REACT_APP_API_URL=http://localhost:3001/api/claude
   PORT=3001
   ```

## Troubleshooting

### API Key Issues
- **Error: "Claude API key is missing"**
  1. Verify the key file exists in the correct location:
     - macOS/Linux: `ls -la ~/.api_keys/claude_keys.json`
     - Windows: `dir %USERPROFILE%\.api_keys\claude_keys.json`
  2. Check the file contents to ensure it has the correct format
  3. Restart the server after making changes

### Windows-Specific Issues
- **Hidden Files**: Make sure to show hidden files in File Explorer to see the `.api_keys` folder
  1. Open File Explorer
  2. Click on the "View" tab
  3. Check the "Hidden items" checkbox
  
- **File Creation**: If you have trouble creating files with a dot prefix:
  1. Open Notepad
  2. Save the file with quotes: `".env"` or `"claude_keys.json"`
  3. Select "All Files" in the "Save as type" dropdown

## Security Notes

- API keys are stored outside the repository in `~/.api_keys/claude_keys.json`
- Never commit API keys or sensitive information to the repository
- The `.gitignore` file is configured to exclude sensitive files
