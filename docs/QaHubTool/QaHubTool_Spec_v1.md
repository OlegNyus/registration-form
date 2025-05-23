# 📘 QaHubTool – Functional Specification (MVP v1.1)

---

## 🎯 Purpose

QaHubTool is a VSCode extension that reads a user requirement and guides the user through AI-assisted test asset generation. It outputs a detailed test plan, test cases, and Cypress or Playwright scripts. Users can customize each step with short instructions using inline chat prompts.

---

## ✨ MVP v1 Feature List

- [x] Analyze open `.md` file to extract user stories
- [x] Copy/paste user requirement in an input panel
- [x] Generate Test Plan with table of scenarios
- [x] Generate Test Cases in Markdown or JSON format
- [x] Generate Test Script in Cypress or Playwright
- [x] Configurable output format and framework
- [x] Chat input to refine AI output at each stage
- [x] Status bar icon for quick access
- [ ] Placeholder for "Analyze Code to Infer Requirement" (planned in v2)
- [x] Integration with Claude AI for enhanced AI assistance

---

## 🔁 End-to-End Workflow Overview

### 🟩 Step 1: Choose Requirement Input Mode

User selects one of the following:

1. **📄 Analyze Opened `.md` File**  
   - Reads structured user story from active markdown file

2. **📋 Paste Requirement**  
   - Opens input panel where user can paste plain English requirement

3. **🧠 Analyze Code Snippet** *(placeholder)*  
   - [Coming in v2] Analyze code to infer intended behavior

---

### 🟦 Step 2: Trigger via Status Bar

- A status bar button appears:
  ```
  🧪 Generate QA Assets
  ```
- One-click to open the input selection menu

---

### 🟨 Step 3: Generate Test Plan (WebView Panel)

- Displays:
  - Objective
  - Table of Positive & Negative Scenarios
- Includes:
  - 🔁 Regenerate
  - ✅ Approve
  - 💬 Chat input

---

### 🟧 Step 4: Generate Test Cases

- Based on approved test plan.
- Output shown in a table:
  | ID | Title | Steps | Expected Result |
- Includes:
  - 🔁 Regenerate
  - ✅ Approve
  - 💬 Chat input

---

### 🟥 Step 5: Generate Automation Script

- Based on approved test cases.
- Framework: Cypress or Playwright (configurable)
- Output in code block view
- Includes:
  - 🔁 Regenerate
  - ✅ Approve
  - 💬 Chat input

---

## ⚙️ User Configuration (via VSCode settings)

```json
{
  "qahubtool.apiKey": "string",
  "qahubtool.outputFormat": "markdown | json",
  "qahubtool.testFramework": "cypress | playwright"
}
```

---

## 💬 Chat Input Summary by Step

| Step        | Chat Examples                                           |
|-------------|----------------------------------------------------------|
| Test Plan   | "Add negative flows", "Edge cases only"                  |
| Test Cases  | "Use testData.json", "Add field validations"             |
| Test Script | "Use POM", "Wrap login logic", "Avoid hardcoded selectors" |

---

## 📁 Output Folder Structure

```
/generated-tests/<slug>/
├── test-plan.md
├── test-cases.md or .json
└── resetPassword.spec.cy.js
```

---

## 🧪 Simulated AI Mode (For Demos or Offline Use)

In demo mode:
- Button clicks simulate updated content
- Chat input regenerates local variants

---

## 🔮 Future Features – Planned for v2

- Analyze existing code to infer testable requirements
- Pull stories from JIRA ticket ID
- Test coverage heatmaps
- Export to Xray/TestRail or Jira issue comments
- User story validation using acceptance criteria checklist
- Suggest missing scenarios via AI
- CLI mode for CI integration

---

## 🌐 Web App Integration

- The QaHubTool now includes a web app interface for enhanced user interaction.
- Features:
  - Editor section for copy/paste functionality
  - Claude AI integration for advanced AI assistance
  - Real-time updates and feedback

---

## 📝 Additional Notes

- The web app is built using React and Vite, ensuring a modern and responsive user experience.
- The integration with Claude AI allows for more sophisticated AI-driven test asset generation and refinement.
