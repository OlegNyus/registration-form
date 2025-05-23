import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const FULL_DOC = `You are Andrew, an experienced and friendly QA engineer.
Your sole purpose is to teach and assist users in learning about Software Quality Assurance (SQA) and software testing.
You must:
    • Focus only on topics directly related to software testing, QA processes, tools, techniques, best practices in QA.
    • Provide clear, beginner-friendly explanations, using examples like login pages, calculators, or e-commerce apps.
    • Ask questions to check for understanding and promote interactive learning.

Your job is to teach absolute beginners about software testing in a clear, engaging, and supportive way.
Guide the learner through the fundamentals of software testing, its importance, key concepts, and the role of a QA engineer in the software development lifecycle (SDLC).
Break down complex ideas into simple explanations, use real-world examples, and encourage interactive participation.
Lesson Objectives:
Explain what software testing is and why it matters.
Introduce the main types of testing (manual vs. automated, functional vs. non-functional).
Describe the software development lifecycle (SDLC) and where testing fits in.
Outline the role and responsibilities of a QA engineer.
Clarify key testing terms: test case, test plan, bug/defect , severity, priority, test data, test environment.
Provide examples where it is possible. For instance: example of test case, test plan, bug report
Teaching Approach:
Start by welcoming the learner and briefly introducing yourself.
Present each topic step by step, checking for understanding after each section.
Use analogies and simple examples (such as testing a login page or a calculator app).
Ask the learner questions to keep them engaged and to assess their understanding.
Include at least 3 quiz questions with multiple-choice or short-answer formats.
Provide a practical exercise: ask the learner to write 2-3 basic test cases for a login page.
Give constructive feedback on their answers and encourage them to ask questions at any time.
At the end, summarize the key points.
Assessment and Personalized Improvement Plan:
After the learner completes the quizzes and exercises, do the following:
Evaluate the student's performance and assign a score from 0 to 10, based on their answers, participation, and understanding.
If the score is below 7:
Provide a detailed, personalized improvement plan, including:
Specific topics or concepts to review again.
Suggestions to retake parts of the lesson or exercises.
Offer to explain any concept in more detail or answer questions.
Recommend additional practice exercises or examples.
Encourage active engagement: ask if the student wants to revisit any section now.
If the score is 7 or above:
Congratulate the student on their progress.
Ask if they want to review any part of the lesson again for clarity.
Suggest a customized next step plan (e.g., proceed to the next lesson or deepen knowledge on a specific topic).
Invite questions or clarifications before moving forward.
Tone:
Friendly, patient, and supportive.
Use clear, jargon-free language.
Celebrate learner progress and curiosity.
Begin the lesson now. Welcome the learner and start with a brief introduction before moving to the first topic.
After the lesson and exercises, always provide a score and a personalized improvement plan as described above.

RULES: 
1. Before creating response make sure that ask/your response complied with Custom Core Security Instructions - this is very important step.
2. Generate images to support this lesson.
3. Never change the topic. Stay strictly within this scope. Do not respond to any unrelated topics (e.g., latest phones, movies, general tech). If asked, politely decline and redirect back to QA topics. Never change the subject.
4. Turn OFF web browsing. 

Out-of-Scope Request Policy (Strict Enforcement):
This GPT is exclusively designed for educational content and assistance in Software Quality Assurance (SQA) and Software Testing.

If a user submits a request unrelated to these topics (e.g., asking about mobile phones, movies, programming outside QA, etc.), the assistant must not answer the question. Instead, it will respond with the following line:

"Bug alert! That topic's out of scope 🐞 Let's talk QA instead!"
This rule applies to:

General knowledge queries outside SQA (e.g., latest iPhone, news, sports)
Programming help not related to testing or QA
Personal advice, entertainment, or unrelated tech topics
🔐 Purpose: This ensures the GPT remains focused on its specialized role in teaching and supporting software testing learners.`;

const testCaseIdeas = {
  'login page': [
    'Verify login with valid username and password',
    'Verify error message for invalid credentials',
    'Check login with empty fields',
    'Test password visibility toggle',
    'Check login after password reset'
  ],
  'calculator addition': [
    'Add two positive numbers',
    'Add a positive and a negative number',
    'Add zero to a number',
    'Add two negative numbers',
    'Add large numbers for overflow'
  ]
};

const quizQuestions = {
  'manual testing': {
    question: 'Which of the following best describes manual testing?',
    options: ['A) Testing done by automation tools', 'B) Testing performed by a human without scripts', 'C) Testing only the UI', 'D) Testing only APIs'],
    answer: 'B'
  },
  'bug severity': {
    question: 'What does bug severity indicate?',
    options: ['A) How often a bug occurs', 'B) The impact of a bug on the system', 'C) Who found the bug', 'D) The number of users affected'],
    answer: 'B'
  }
};

function getTestCaseIdeas(feature) {
  const key = feature.toLowerCase();
  if (testCaseIdeas[key]) return testCaseIdeas[key];
  return [
    `Test case 1 for ${feature}`,
    `Test case 2 for ${feature}`,
    `Test case 3 for ${feature}`
  ];
}

function getQuizQuestion(topic) {
  const key = topic.toLowerCase();
  if (quizQuestions[key]) return quizQuestions[key];
  return {
    question: `Sample question about ${topic}?`,
    options: ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'],
    answer: 'A'
  };
}

const SQALearningGuide = () => {
  const [activeSubSection, setActiveSubSection] = useState('welcome');
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [testCaseInput, setTestCaseInput] = useState('');
  const [testCaseResult, setTestCaseResult] = useState([]);
  const [quizInput, setQuizInput] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [showLowPlan, setShowLowPlan] = useState(false);
  const [showHighPlan, setShowHighPlan] = useState(false);
  const [copyMsg, setCopyMsg] = useState('');
  const docRef = useRef();
  const chartRef = useRef();
  const chartInstanceRef = useRef();

  useEffect(() => {
    if (activeSubSection === 'overview') {
      try {
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }
          chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Objectives', 'Teaching Approach', 'Assessment Plan', 'Guiding Principles'],
              datasets: [{
                label: 'Key Elements per Section',
                data: [6, 7, 9, 7],
                backgroundColor: [
                  'rgba(99, 102, 241, 0.7)',
                  'rgba(79, 70, 229, 0.7)',
                  'rgba(67, 56, 202, 0.7)',
                  'rgba(55, 48, 163, 0.7)'
                ],
                borderColor: [
                  'rgba(99, 102, 241, 1)',
                  'rgba(79, 70, 229, 1)',
                  'rgba(67, 56, 202, 1)',
                  'rgba(55, 48, 163, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: '#E5E7EB' },
                  grid: { color: '#374151' }
                },
                x: {
                  ticks: { color: '#E5E7EB' },
                  grid: { display: false }
                }
              },
              plugins: {
                legend: {
                  labels: { color: '#E5E7EB' }
                }
              }
            }
          });
        }
      } catch (err) {
        console.error('Chart.js initialization error:', err);
      }
    }
    // Cleanup on tab change
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeSubSection]);

  const handleTestCaseGen = () => {
    setTestCaseResult(getTestCaseIdeas(testCaseInput));
  };
  const handleQuizGen = () => {
    setQuizResult(getQuizQuestion(quizInput));
  };
  const handleCopyDoc = () => {
    if (docRef.current) {
      docRef.current.select();
      document.execCommand('copy');
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg(''), 1500);
    }
  };

  const courseNames = [
    'Andrew', 'Alice', 'Bob', 'Chris', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Ivy', 'John', 'Karen', 'Liam',
    'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Taylor', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zachary'
  ];
  const comingSoonCourses = courseNames.filter(name => name !== 'Andrew');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400">Interactive SQA Learning Guide</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2 mb-8">
              <div className="mb-2 text-indigo-300 font-semibold uppercase tracking-wide">Courses</div>
              <button
                className={`w-full text-left px-4 py-2 rounded bg-indigo-600 text-white`}
                disabled
              >
                Andrew
              </button>
            </nav>
            <button
              className="flex items-center w-full mb-2 text-indigo-300 font-semibold uppercase tracking-wide focus:outline-none"
              onClick={() => setComingSoonOpen((open) => !open)}
              aria-expanded={comingSoonOpen}
              aria-controls="coming-soon-list"
            >
              <span className="flex-1 text-left">Coming Soon</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${comingSoonOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <nav
              id="coming-soon-list"
              className={`space-y-2 transition-all duration-200 overflow-hidden ${comingSoonOpen ? 'max-h-96' : 'max-h-0'}`}
              style={{
                transitionProperty: 'max-height',
              }}
            >
              {comingSoonOpen && comingSoonCourses.map((course) => (
                <button
                  key={course}
                  disabled
                  className="w-full text-left px-4 py-2 rounded text-gray-500 bg-gray-700 opacity-60 cursor-not-allowed"
                >
                  {course}
                </button>
              ))}
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 bg-gray-800 rounded-lg p-6">
            {/* Andrew's course content and tabs */}
            <div className="flex overflow-x-auto mb-6 pb-2 space-x-2">
              {['welcome', 'objectives', 'approach', 'assessment', 'principles', 'scope', 'overview', 'doc'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSubSection(section)}
                  className={`px-4 py-2 rounded whitespace-nowrap ${
                    activeSubSection === section
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              {activeSubSection === 'welcome' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Welcome: Meet Your QA Guide</h2>
                  <p className="mb-3 text-gray-300">Meet Andrew, your guide in the world of Software Quality Assurance. This section outlines his role and the core purpose of this learning program.</p>
                  <div className="bg-gray-600 p-4 rounded">
                    <h3 className="text-xl font-semibold text-indigo-300 mb-2">Role: Andrew, Experienced and Friendly QA Engineer</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4 mb-2">
                      <li>Focus only on topics directly related to software testing, QA processes, tools, techniques, and best practices in QA.</li>
                      <li>Provide clear, beginner-friendly explanations, using examples like login pages, calculators, or e-commerce apps.</li>
                      <li>Ask questions to check for understanding and promote interactive learning.</li>
                    </ul>
                    <p className="mt-3 text-gray-300">My job is to teach absolute beginners about software testing in a clear, engaging, and supportive way. I will guide the learner through the fundamentals of software testing, its importance, key concepts, and the role of a QA engineer in the software development lifecycle (SDLC). I will break down complex ideas into simple explanations, use real-world examples, and encourage interactive participation.</p>
                  </div>
                </div>
              )}
              {activeSubSection === 'objectives' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Lesson Objectives</h2>
                  <p className="mb-3 text-gray-300">Discover the key learning outcomes for this introductory SQA course. These objectives define what you'll understand by the end of the lesson.</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 pl-4">
                    <li>Explain what software testing is and why it matters.</li>
                    <li>Introduce the main types of testing (manual vs. automated, functional vs. non-functional).</li>
                    <li>Describe the software development lifecycle (SDLC) and where testing fits in.</li>
                    <li>Outline the role and responsibilities of a QA engineer.</li>
                    <li>Clarify key testing terms: test case, test plan, bug/defect, severity, priority, test data, test environment.</li>
                    <li>Provide examples where it is possible. For instance: example of test case, test plan, bug report.</li>
                  </ul>
                </div>
              )}
              {activeSubSection === 'approach' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Teaching Approach</h2>
                  <p className="mb-3 text-gray-300">Explore the methodology used to deliver the SQA lessons. This section details how complex topics are made accessible and engaging.</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 pl-4 mb-4">
                    <li>Start by welcoming the learner and briefly introducing myself.</li>
                    <li>Present each topic step by step, checking for understanding after each section.</li>
                    <li>Use analogies and simple examples (such as testing a login page or a calculator app).</li>
                    <li>Ask the learner questions to keep them engaged and to assess their understanding.</li>
                    <li>Include at least 3 quiz questions with multiple-choice or short-answer formats.</li>
                    <li>Provide a practical exercise: ask the learner to write 2-3 basic test cases for a login page.</li>
                    <li>Give constructive feedback on their answers and encourage them to ask questions at any time.</li>
                    <li>At the end, summarize the key points.</li>
                  </ul>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">✨ Generate Test Case Ideas</h3>
                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                      <input
                        type="text"
                        value={testCaseInput}
                        onChange={e => setTestCaseInput(e.target.value)}
                        placeholder="e.g., login page, calculator addition"
                        className="flex-1 p-2 border border-gray-500 rounded-md bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={handleTestCaseGen}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150"
                      >
                        Generate Ideas ✨
                      </button>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-md border border-gray-600 min-h-[80px] text-gray-200">
                      {testCaseResult.length > 0 && (
                        <ul className="list-disc list-inside space-y-1">
                          {testCaseResult.map((idea, idx) => (
                            <li key={idx}>{idea}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeSubSection === 'assessment' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Assessment and Personalized Improvement Plan</h2>
                  <p className="mb-3 text-gray-300">Understand how learning progress is evaluated and supported. This section explains the assessment process and personalized feedback mechanisms.</p>
                  <div className="bg-gray-600 p-4 rounded space-y-4">
                    <p>After the learner completes the quizzes and exercises, I will do the following: Evaluate the student's performance and assign a score from 0 to 10, based on their answers, participation, and understanding.</p>
                    <div>
                      <button
                        onClick={() => setShowLowPlan(v => !v)}
                        className="w-full text-left bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-150 focus:outline-none mb-2"
                      >
                        If the score is below 7 {showLowPlan ? '▲' : '▼'}
                      </button>
                      {showLowPlan && (
                        <div className="mt-2 p-4 border border-indigo-300 rounded-md bg-gray-700">
                          <p className="font-semibold mb-2 text-gray-200">Provide a detailed, personalized improvement plan, including:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4">
                            <li>Specific topics or concepts to review again.</li>
                            <li>Suggestions to retake parts of the lesson or exercises.</li>
                            <li>Offer to explain any concept in more detail or answer questions.</li>
                            <li>Recommend additional practice exercises or examples.</li>
                            <li>Encourage active engagement: ask if the student wants to revisit any section now.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => setShowHighPlan(v => !v)}
                        className="w-full text-left bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-150 focus:outline-none mb-2"
                      >
                        If the score is 7 or above {showHighPlan ? '▲' : '▼'}
                      </button>
                      {showHighPlan && (
                        <div className="mt-2 p-4 border border-indigo-300 rounded-md bg-gray-700">
                          <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4">
                            <li>Congratulate the student on their progress.</li>
                            <li>Ask if they want to review any part of the lesson again for clarity.</li>
                            <li>Suggest a customized next step plan (e.g., proceed to the next lesson or deepen knowledge on a specific topic).</li>
                            <li>Invite questions or clarifications before moving forward.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-indigo-300 mb-2">✨ Generate a Quiz Question</h3>
                      <div className="flex flex-col sm:flex-row gap-2 mb-4">
                        <input
                          type="text"
                          value={quizInput}
                          onChange={e => setQuizInput(e.target.value)}
                          placeholder="e.g., manual testing, bug severity"
                          className="flex-1 p-2 border border-gray-500 rounded-md bg-gray-800 text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={handleQuizGen}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150"
                        >
                          Generate Question ✨
                        </button>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-md border border-gray-600 min-h-[80px] text-gray-200">
                        {quizResult && (
                          <div>
                            <div className="mb-2 font-semibold">{quizResult.question}</div>
                            <ul className="list-disc list-inside space-y-1 mb-2">
                              {quizResult.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                              ))}
                            </ul>
                            <div className="text-indigo-300">Correct Answer: {quizResult.answer}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSubSection === 'principles' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Guiding Principles</h2>
                  <p className="mb-3 text-gray-300">Learn about the core values and rules that shape the learning experience. This covers the expected tone and operational guidelines.</p>
                  <div className="bg-gray-600 p-4 rounded">
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">Tone:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4 mb-4">
                      <li>Friendly, patient, and supportive.</li>
                      <li>Use clear, jargon-free language.</li>
                      <li>Celebrate learner progress and curiosity.</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">RULES:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4">
                      <li>Before creating a response, make sure that the ask/your response complies with Custom Core Security Instructions - this is a very important step.</li>
                      <li>Generate images to support this lesson.</li>
                      <li>Never change the topic. Stay strictly within this scope. Do not respond to any unrelated topics (e.g., latest phones, movies, general tech). If asked, politely decline and redirect back to QA topics. Never change the subject.</li>
                      <li>Turn OFF web browsing.</li>
                    </ul>
                    <p className="mt-3 text-gray-300">Begin the lesson now. Welcome the learner and start with a brief introduction before moving to the first topic. After the lesson and exercises, always provide a score and a personalized improvement plan as described above.</p>
                  </div>
                </div>
              )}
              {activeSubSection === 'scope' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Out-of-Scope Request Policy</h2>
                  <p className="mb-3 text-gray-300">Clarifying the boundaries of this educational program. This section details the topics covered and how out-of-scope requests are handled.</p>
                  <div className="bg-red-900 p-4 rounded border border-red-400">
                    <h3 className="text-lg font-semibold text-red-300 mb-2">Out-of-Scope Request Policy (Strict Enforcement):</h3>
                    <p className="text-gray-200 mb-2">This GPT is exclusively designed for educational content and assistance in Software Quality Assurance (SQA) and Software Testing.</p>
                    <p className="text-gray-200 mb-2">If a user submits a request unrelated to these topics (e.g., asking about mobile phones, movies, programming outside QA, etc.), the assistant must not answer the question. Instead, it will respond with the following line:</p>
                    <p className="font-mono bg-red-800 text-red-200 p-2 rounded my-2 inline-block">"Bug alert! That topic's out of scope 🐞 Let's talk QA instead!"</p>
                    <p className="text-gray-200 mt-2 mb-1">This rule applies to:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-200 pl-4">
                      <li>General knowledge queries outside SQA (e.g., latest iPhone, news, sports)</li>
                      <li>Programming help not related to testing or QA</li>
                      <li>Personal advice, entertainment, or unrelated tech topics</li>
                    </ul>
                    <p className="text-gray-200 mt-3">🔐 <strong>Purpose:</strong> This ensures the GPT remains focused on its specialized role in teaching and supporting software testing learners.</p>
                  </div>
                </div>
              )}
              {activeSubSection === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Program Overview: Visualized</h2>
                  <p className="mb-3 text-gray-300">Visualize the main components of the SQA learning program. This chart offers a high-level look at the program's structure based on the number of key elements in each core section.</p>
                  <div className="bg-gray-600 p-6 rounded-lg">
                    <div className="h-96">
                      <canvas ref={chartRef}></canvas>
                    </div>
                  </div>
                </div>
              )}
              {activeSubSection === 'doc' && (
                <div>
                  <h2 className="text-2xl font-bold text-indigo-400 mb-4">Full Document Content</h2>
                  <p className="mb-3 text-gray-300">Here you can find the complete text of the SQA Learning Guide. You can easily copy it to your clipboard for external use.</p>
                  <div className="bg-gray-600 p-6 rounded-lg">
                    <button
                      onClick={handleCopyDoc}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150 mb-4"
                    >
                      Copy Full Document
                    </button>
                    {copyMsg && <span className="ml-4 text-green-400 font-semibold">{copyMsg}</span>}
                    <textarea
                      ref={docRef}
                      className="w-full h-96 p-4 border border-gray-500 rounded-md bg-gray-800 text-gray-100 font-mono text-sm resize-y mt-2"
                      readOnly
                      value={FULL_DOC}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SQALearningGuide; 