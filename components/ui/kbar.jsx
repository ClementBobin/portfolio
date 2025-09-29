"use client";

import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  KBarResults,
  KBarProvider,
} from "kbar";
import { forwardRef, useState } from "react";
import kbarData from "@/data/kbar-actions.json";
import { actionHandlers } from "@/lib/kbar-handlers";
import Link from "next/link";
import { useTheme } from "next-themes";

// RenderResults function: Renders the KBar search results
function RenderResults() {
  const { results } = useMatches();

  return (
    <div className="flex flex-col">
      {results && results.length !== 0 && (
        <div className="border-t-2 border-white pb-3 pt-2">
          <KBarResults
            items={results}
            onRender={({ item, active }) =>
              typeof item === "string" ? (
                <div className="text-sm uppercase px-8 pt-3 pb-2 text-black font-black tracking-widest">
                  {item}
                </div>
              ) : (
                <ResultItem action={item} active={active} />
              )
            }
          />
        </div>
      )}
    </div>
  );
}

// ResultItem component: Renders each item in the KBar search results
const ResultItem = forwardRef(({ action, active }, ref) => {
  const Content = () => (
    <div
      className={`flex pl-4 py-3 transition-colors ${active ? "bg-slate-100 text-slate-700 border-black border-0 border-l-4" : "text-slate-500"}`}
    >
      {/* Icon */}
      {action.icon && (
        <div className="flex items-center justify-center ml-0 mr-3 w-6 h-6">
          {action.icon}
        </div>
      )}

      <div className="flex flex-col font-semibold">
        <span>{action.name}</span>
        {action.subtitle && (
          <span className="text-xs text-slate-400">{action.subtitle}</span>
        )}
      </div>

      {action.shortcut?.length ? (
        <div className="flex flex-row absolute right-[5%] gap-1">
          {action.shortcut.map((shortcut) => (
            <kbd
              key={shortcut}
              className="py-1 px-2 bg-slate-200 rounded text-[14px]"
            >
              {shortcut}
            </kbd>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="flex flex-col">
      {action.id.startsWith("#") || action.id.startsWith("/") ? (
        <Link
          href={action.id}
          className={`flex flex-col ${active && "cursor-pointer"}`}
        >
          <Content />
        </Link>
      ) : (
        <div className={`flex flex-col ${active && "cursor-pointer"}`}>
          <Content />
        </div>
      )}
    </div>
  );
});

// Main KBar Component
const KBar = ({ customStyles = {}, userConfig = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme } = useTheme(); // Use hook inside component

  // Language handler function
  const handleLanguageAction = (locale) => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const supportedLocales = ["en-US", "fr-FR"];
      const pathParts = currentPath.split("/").filter(Boolean);

      const hasExistingLocale = supportedLocales.includes(pathParts[0]);

      let newPath;
      if (hasExistingLocale) {
        pathParts[0] = locale;
        newPath = "/" + pathParts.join("/");
      } else {
        newPath = "/" + [locale, ...pathParts].join("/");
      }

      window.location.href = newPath;
    }
  };

  // Build actions from JSON data
  const buildActions = () => {
    const allActions = [];

    // Flatten all actions from different categories
    Object.values(kbarData.actions).forEach((category) => {
      category.forEach((actionConfig) => {
        allActions.push({
          ...actionConfig,
          icon: kbarData.icons[actionConfig.icon] || actionConfig.icon,
          perform: async (...args) => {
            setIsLoading(true);
            try {
              // Handle language actions
              if (actionConfig.perform === "setEnglish") {
                handleLanguageAction("en-US");
                setIsLoading(false);
                return "Switching to English...";
              }

              if (actionConfig.perform === "setFrench") {
                handleLanguageAction("fr-FR");
                setIsLoading(false);
                return "Switching to French...";
              }

              // Handle theme actions directly in the component
              if (actionConfig.perform === "setDarkMode") {
                setTheme("dark");
                setIsLoading(false);
                return "Dark mode activated";
              }

              if (actionConfig.perform === "setLightMode") {
                setTheme("light");
                setIsLoading(false);
                return "Light mode activated";
              }

              // Handle other actions using the handlers file
              const handler = actionHandlers[actionConfig.perform];
              if (!handler) {
                throw new Error(`No handler found for ${actionConfig.perform}`);
              }

              const result = await handler(...args);

              // Optional callback if provided
              if (typeof userConfig.onActionPerformed === "function") {
                userConfig.onActionPerformed(actionConfig.id, result, null);
              }

              return result;
            } catch (error) {
              console.error(`Action ${actionConfig.id} failed:`, error);

              if (typeof userConfig.onActionPerformed === "function") {
                userConfig.onActionPerformed(actionConfig.id, null, error);
              }

              throw error;
            } finally {
              setIsLoading(false);
            }
          },
        });
      });
    });

    // Add custom actions from user config
    if (userConfig.customActions) {
      userConfig.customActions.forEach((customAction) => {
        allActions.push({
          ...customAction,
          icon: kbarData.icons[customAction.icon] || customAction.icon,
        });
      });
    }

    return allActions;
  };

  const actions = buildActions();

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner
          className="bg-black/50 backdrop-blur-sm"
          style={customStyles.positioner}
        >
          <KBarAnimator
            className="rounded-xl bg-white shadow-xl flex flex-col space-x-4 w-[35rem] overflow-hidden dark:invert"
            style={customStyles.animator}
          >
            <div className="flex px-2 text-xl font-medium text-slate-600">
              <KBarSearch
                className="w-full outline-none pl-4 pr-6 py-4 bg-transparent selection:bg-sky-200 selection:text-black"
                placeholder={
                  isLoading ? "Processing..." : "Type a command or search..."
                }
                disabled={isLoading}
              />
            </div>
            <RenderResults />

            {/* Loading indicator */}
            {isLoading && (
              <div className="px-4 py-2 text-xs text-slate-500 border-t">
                ⏳ Processing action...
              </div>
            )}
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
};

export default KBar;
