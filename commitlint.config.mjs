const Configuration = {
  /*
   * Base conventional commit rules
   */
  extends: ["@commitlint/config-conventional"],

  parserPreset: {
    parserOpts: {
      headerPattern: "^(\\w*)(?:\\(([\\w$.*-]*)\\))?(!)?:\\s(.*)$",
      headerCorrespondence: ["type", "scope", "breaking", "subject"],
    },
  },

  /*
   * Output formatter
   */
  formatter: "@commitlint/format",

  /*
   * Rules
   */
  rules: {
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],

    /* scope */
    "scope-case": [2, "always", "lower-case"],
    "scope-empty": [0, "never"],

    /* subject */
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],

    /* header */
    "header-max-length": [2, "always", 72],
  },

  /*
   * Help URL shown on failure
   */
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",

  /*
   * Commit prompt configuration
   */
  prompt: {
    messages: {},
    questions: {
      type: {
        description: "please input type:",
      },
    },
  },
};

export default Configuration;
