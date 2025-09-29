export const actionHandlers = {
  // General actions
  copyLink: () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      return "URL copied to clipboard";
    }
    return "Cannot copy URL";
  },

  openSource: () => {
    if (typeof window !== "undefined") {
      window.open("https://github.com/ClementBobin/portfolio", "_blank");
    }
  },

  navigateToHome: () => {
    if (typeof window !== "undefined") {
      window.location.pathname = "/";
    }
  },

  navigateToProjects: () => {
    if (typeof window !== "undefined") {
      window.location.pathname = "/projects";
    }
  },

  navigateToUses: () => {
    if (typeof window !== "undefined") {
      window.location.pathname = "/uses";
    }
  },

  navigateToReminder: () => {
    if (typeof window !== "undefined") {
      window.location.pathname = "/reminder";
    }
  },

  navigateToTechNews: () => {
    if (typeof window !== "undefined") {
      window.location.pathname = "/technews";
    }
  },

  // Project actions
  openMyNote: () => {
    if (typeof window !== "undefined") {
      window.open("https://note-clement.vercel.app/", "_blank");
    }
  },

  // Social actions
  openGitHub: () => {
    if (typeof window !== "undefined") {
      window.open("https://github.com/ClementBobin", "_blank");
    }
  },

  openLinkedIn: () => {
    if (typeof window !== "undefined") {
      window.open("https://www.linkedin.com/in/clément-bobin", "_blank");
    }
  },

  openCodewars: () => {
    if (typeof window !== "undefined") {
      window.open("https://www.codewars.com/users/ClementBobin", "_blank");
    }
  },

  openBuyMeCoffee: () => {
    if (typeof window !== "undefined") {
      window.open("https://www.buymeacoffee.com/clementbobin", "_blank");
    }
  },
};
