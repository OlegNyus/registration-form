import React from 'react';

const sectionClass = "bg-amber-50 p-6 rounded-lg shadow mb-6";
const headingClass = "text-xl font-semibold text-teal-700 mb-4";

export default function QaHubTool() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-neutral-900 mb-6">QaHubTool Specification</h1>
      <p className="mb-6 text-neutral-700">A comprehensive guide to the QaHubTool VSCode extension for AI-assisted test asset generation.</p>
      <div className="space-y-6">
        <section className={sectionClass}>
          <h2 className={headingClass}>🎯 Purpose</h2>
          <p className="text-neutral-700">QaHubTool is a VSCode extension that reads a user requirement and guides the user through AI-assisted test asset generation. It outputs a detailed test plan, test cases, and Cypress or Playwright scripts. Users can customize each step with short instructions using inline chat prompts.</p>
        </section>
        <section className={sectionClass}>
          <h2 className={headingClass}>✨ MVP v1 Feature List</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700 pl-4">
            <li>Analyze open <code>.md</code> file to extract user stories</li>
            <li>Copy/paste user requirement in an input panel</li>
            <li>Generate Test Plan with table of scenarios</li>
            <li>Generate Test Cases in Markdown or JSON format</li>
            <li>Generate Test Script in Cypress or Playwright</li>
            <li>Configurable output format and framework</li>
            <li>Chat input to refine AI output at each stage</li>
            <li>Status bar icon for quick access</li>
            <li>Integration with Claude AI for enhanced AI assistance</li>
          </ul>
        </section>
        <section className={sectionClass}>
          <h2 className={headingClass}>🔁 End-to-End Workflow</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Step 1: Choose Requirement Input Mode</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 pl-4">
                <li>Analyze Opened <code>.md</code> File</li>
                <li>Paste Requirement</li>
                <li>Analyze Code Snippet (Coming in v2)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Step 2: Trigger via Status Bar</h3>
              <p className="text-neutral-700">One-click access through the "🧪 Generate QA Assets" button</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Step 3: Generate Test Plan</h3>
              <p className="text-neutral-700">WebView panel with objective and scenarios table</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Step 4: Generate Test Cases</h3>
              <p className="text-neutral-700">Table format with ID, Title, Steps, and Expected Results</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Step 5: Generate Automation Script</h3>
              <p className="text-neutral-700">Cypress or Playwright framework support</p>
            </div>
          </div>
        </section>
        <section className={sectionClass}>
          <h2 className={headingClass}>⚙️ User Configuration</h2>
          <div className="bg-white p-4 rounded-md">
            <pre className="text-sm text-neutral-800 overflow-x-auto"><code>{`
{
  "qahubtool.apiKey": "string",
  "qahubtool.outputFormat": "markdown | json",
  "qahubtool.testFramework": "cypress | playwright"
}
`}</code></pre>
          </div>
        </section>
        <section className={sectionClass}>
          <h2 className={headingClass}>🔮 Future Features – v2</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-700 pl-4">
            <li>Analyze existing code to infer testable requirements</li>
            <li>Pull stories from JIRA ticket ID</li>
            <li>Test coverage heatmaps</li>
            <li>Export to Xray/TestRail or Jira issue comments</li>
            <li>User story validation using acceptance criteria checklist</li>
            <li>Suggest missing scenarios via AI</li>
            <li>CLI mode for CI integration</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 