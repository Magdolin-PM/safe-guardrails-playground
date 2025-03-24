
export type CodeExample = {
  bad: string;
  good: string;
  language: string;
  explanation: string;
};

export type Recommendation = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  relevantTechnologies?: string[];
  relevantDataTypes?: string[];
};

export type Guardrail = {
  id: string;
  title: string;
  description: string;
  icon: string;
  recommendations: Recommendation[];
  codeExamples: CodeExample[];
  projectTypes: string[];
};

export const guardrails: Guardrail[] = [
  {
    id: 'authentication',
    title: 'Authentication Security',
    description: 'Ensures your users\' accounts remain secure through proper credential handling and session management.',
    icon: '🔐',
    projectTypes: ['website', 'saas', 'api', 'mobile', 'ecommerce'],
    recommendations: [
      {
        title: 'Use password hashing',
        description: 'Never store passwords as plain text. Always use strong hashing algorithms like bcrypt or Argon2.',
        priority: 'high',
        relevantTechnologies: ['nodejs', 'django', 'php', 'laravel'],
        relevantDataTypes: ['user_accounts']
      },
      {
        title: 'Implement multi-factor authentication',
        description: 'Add an extra layer of security by requiring a second form of verification beyond passwords.',
        priority: 'medium',
        relevantDataTypes: ['user_accounts', 'payment_info', 'pii', 'medical']
      },
      {
        title: 'Use secure session management',
        description: 'Set proper cookie attributes (HttpOnly, Secure, SameSite) and implement token rotation.',
        priority: 'high',
        relevantTechnologies: ['nodejs', 'express', 'django', 'php', 'laravel']
      }
    ],
    codeExamples: [
      {
        language: 'javascript',
        bad: `// NEVER do this
function storePassword(username, password) {
  // Store plain text password directly in database
  db.users.insert({ username, password });
}`,
        good: `// Do this instead
const bcrypt = require('bcrypt');

async function storePassword(username, password) {
  // Hash password before storing
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  db.users.insert({ username, password: hashedPassword });
}`,
        explanation: 'The secure version uses bcrypt to hash passwords before storing them in the database. This ensures that even if your database is compromised, the actual passwords remain protected.'
      }
    ]
  },
  {
    id: 'api_security',
    title: 'API Security',
    description: 'Protects your application\'s data exchange channels from unauthorized access and abuse.',
    icon: '🔌',
    projectTypes: ['saas', 'api', 'mobile', 'ecommerce'],
    recommendations: [
      {
        title: 'Implement rate limiting',
        description: 'Prevent abuse by limiting how many requests a client can make in a given timeframe.',
        priority: 'medium',
        relevantTechnologies: ['nodejs', 'express', 'django', 'flask', 'laravel']
      },
      {
        title: 'Use proper authentication for APIs',
        description: 'Implement JWT or OAuth for stateless authentication of API requests.',
        priority: 'high',
        relevantTechnologies: ['nodejs', 'express', 'django', 'flask', 'php']
      },
      {
        title: 'Validate and sanitize all inputs',
        description: 'Never trust client-provided data; always validate and sanitize it on the server.',
        priority: 'high'
      }
    ],
    codeExamples: [
      {
        language: 'javascript',
        bad: `// NEVER do this
app.get('/api/users/:id', (req, res) => {
  // No authentication check before providing sensitive data
  const userData = getUserById(req.params.id);
  res.json(userData);
});`,
        good: `// Do this instead
app.get('/api/users/:id', authenticateToken, (req, res) => {
  // Verify the authenticated user can access this data
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  const userData = getUserById(req.params.id);
  res.json(userData);
});`,
        explanation: 'The secure version ensures the requester is authenticated and authorized to access the specific user data they\'re requesting, preventing unauthorized access to sensitive information.'
      }
    ]
  },
  {
    id: 'database_security',
    title: 'Database Security',
    description: 'Safeguards your application\'s data storage from unauthorized access and injection attacks.',
    icon: '💾',
    projectTypes: ['website', 'saas', 'api', 'ecommerce'],
    recommendations: [
      {
        title: 'Use parameterized queries',
        description: 'Prevent SQL injection by using prepared statements or query builders.',
        priority: 'high',
        relevantTechnologies: ['mysql', 'postgresql']
      },
      {
        title: 'Limit database user permissions',
        description: 'Apply the principle of least privilege to database users and connections.',
        priority: 'medium',
        relevantTechnologies: ['mysql', 'postgresql', 'mongodb']
      },
      {
        title: 'Encrypt sensitive data',
        description: 'Apply field-level encryption for sensitive information stored in your database.',
        priority: 'high',
        relevantDataTypes: ['payment_info', 'pii', 'medical']
      }
    ],
    codeExamples: [
      {
        language: 'javascript',
        bad: `// NEVER do this
function getUserByUsername(username) {
  // This allows SQL injection
  const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
  return db.execute(query);
}`,
        good: `// Do this instead
function getUserByUsername(username) {
  // Parameterized query prevents SQL injection
  const query = 'SELECT * FROM users WHERE username = ?';
  return db.execute(query, [username]);
}`,
        explanation: 'The secure version uses parameterized queries that separate SQL code from user data, preventing attackers from injecting malicious SQL commands through the username parameter.'
      }
    ]
  },
  {
    id: 'input_validation',
    title: 'Input Validation & Sanitization',
    description: 'Ensures that all user input is properly checked and cleaned to prevent injection attacks.',
    icon: '✅',
    projectTypes: ['website', 'saas', 'api', 'mobile', 'ecommerce'],
    recommendations: [
      {
        title: 'Validate input on both client and server',
        description: 'Never rely solely on client-side validation; always validate data on the server.',
        priority: 'high'
      },
      {
        title: 'Sanitize user-generated HTML',
        description: 'Use libraries like DOMPurify to clean user-generated HTML and prevent XSS.',
        priority: 'high',
        relevantDataTypes: ['content']
      },
      {
        title: 'Use content security policy (CSP)',
        description: 'Implement CSP headers to restrict which resources can be loaded on your pages.',
        priority: 'medium',
        relevantTechnologies: ['react', 'angular', 'vue']
      }
    ],
    codeExamples: [
      {
        language: 'javascript',
        bad: `// NEVER do this
function displayUserComment(comment) {
  // Directly inserting user input into the DOM
  document.getElementById('comment-section').innerHTML += comment;
}`,
        good: `// Do this instead
function displayUserComment(comment) {
  // Sanitize user input before inserting into the DOM
  const sanitizedComment = DOMPurify.sanitize(comment);
  document.getElementById('comment-section').innerHTML += sanitizedComment;
}`,
        explanation: 'The secure version uses DOMPurify to sanitize the user-generated content before inserting it into the DOM, preventing Cross-Site Scripting (XSS) attacks that could steal user cookies or execute malicious code.'
      }
    ]
  },
  {
    id: 'general_security',
    title: 'General Security Recommendations',
    description: 'Overall best practices to keep your application secure and resilient against various threats.',
    icon: '🛡️',
    projectTypes: ['website', 'saas', 'api', 'mobile', 'ecommerce'],
    recommendations: [
      {
        title: 'Keep dependencies updated',
        description: 'Regularly update libraries and frameworks to patch known vulnerabilities.',
        priority: 'medium'
      },
      {
        title: 'Use HTTPS for all traffic',
        description: 'Encrypt all data in transit using TLS/SSL certificates.',
        priority: 'high'
      },
      {
        title: 'Implement proper error handling',
        description: 'Avoid exposing sensitive information in error messages to users.',
        priority: 'medium'
      },
      {
        title: 'Set up security headers',
        description: 'Configure headers like X-Content-Type-Options and X-Frame-Options.',
        priority: 'medium',
        relevantTechnologies: ['nodejs', 'express', 'django', 'php', 'laravel']
      }
    ],
    codeExamples: [
      {
        language: 'javascript',
        bad: `// NEVER do this
app.use((err, req, res, next) => {
  // Detailed error exposed to client
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    details: err
  });
});`,
        good: `// Do this instead
app.use((err, req, res, next) => {
  // Log detailed error for debugging
  console.error('Error:', err);
  
  // Return generic message to client
  res.status(500).json({
    message: 'An unexpected error occurred'
  });
});`,
        explanation: 'The secure version logs the detailed error information for developers but only returns a generic message to users, preventing potential attackers from gaining insights into your application structure through error messages.'
      }
    ]
  }
];
