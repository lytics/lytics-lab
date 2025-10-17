module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", ["feat", "bug", "maint"]],
    "scope-case": [2, "always", "lower-case"],
    "scope-enum": [
      2,
      "always",
      [
        "experience-editor",
        "recommendation-block",
        "repo",
        "ci",
        "deps",
        "docs",
        "tests",
      ],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          bug: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          maint: {
            description: "Other changes that don't modify src or test files",
            title: "Maintenance",
            emoji: "♻️",
          },
        },
      },
      scope: {
        description: "What is the scope of this change?",
        enum: {
          "experience-editor": {
            description: "Changes to experience-editor package",
            title: "Experience Editor",
          },
          "recommendation-block": {
            description: "Changes to recommendation-block package",
            title: "Recommendation Block",
          },
          repo: {
            description: "Repository-level changes (templates, configs)",
            title: "Repository",
          },
          ci: {
            description: "CI/CD pipeline changes",
            title: "CI/CD",
          },
          deps: {
            description: "Dependency updates across packages",
            title: "Dependencies",
          },
          docs: {
            description: "Documentation changes",
            title: "Documentation",
          },
          tests: {
            description: "Test infrastructure changes",
            title: "Tests",
          },
        },
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      breakingBody: {
        description:
          "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
      },
      breaking: {
        description: "Describe the breaking changes",
      },
      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
      issuesBody: {
        description:
          "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
