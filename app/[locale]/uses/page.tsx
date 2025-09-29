"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconDatabase,
  IconBrandTypescript,
  IconBrandTailwind,
  IconCloud,
  IconShield,
} from "@tabler/icons-react";
import { Skeleton } from "@/components/ui/skeleton";

// Tool items with enhanced data
const toolItems = [
  {
    title: "React",
    description: "UI library for building interactive applications",
    url: "https://react.dev",
    category: "Frontend",
    icon: <IconBrandReact className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Next.js",
    description: "Full-stack React framework for production",
    url: "https://nextjs.org",
    category: "Frontend",
    icon: <IconBrandNextjs className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "TypeScript",
    description: "Typed JavaScript for better developer experience",
    url: "https://typescriptlang.org",
    category: "Frontend",
    icon: <IconBrandTypescript className="h-4 w-4 text-blue-600" />,
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    url: "https://tailwindcss.com",
    category: "Frontend",
    icon: <IconBrandTailwind className="h-4 w-4 text-cyan-500" />,
  },
  {
    title: "Node.js",
    description: "JavaScript runtime for server-side development",
    url: "https://nodejs.org",
    category: "Backend",
    icon: <IconBrandNodejs className="h-4 w-4 text-green-600" />,
  },
  {
    title: "Prisma",
    description: "Next-generation ORM for TypeScript and Node.js",
    url: "https://www.prisma.io",
    category: "Backend",
    icon: <IconDatabase className="h-4 w-4 text-emerald-500" />,
  },
  {
    title: "Vercel",
    description: "Platform for frontend frameworks and static sites",
    url: "https://vercel.com",
    category: "DevOps",
    icon: <IconCloud className="h-4 w-4 text-black dark:text-white" />,
  },
  {
    title: "Auth.js",
    description: "Authentication for the modern web",
    url: "https://authjs.dev",
    category: "Security",
    icon: <IconShield className="h-4 w-4 text-blue-500" />,
  },
];

// Skeleton components for visual appeal
const SkeletonFrontend = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
      <motion.div className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black">
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonBackend = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%" },
  };

  const arr = new Array(4).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skeleton-backend" + i}
          variants={variants}
          style={{ maxWidth: Math.random() * (100 - 60) + 60 + "%" }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
        />
      ))}
    </motion.div>
  );
};

const SkeletonDevOps = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background: "linear-gradient(-45deg, #22c55e, #3b82f6, #8b5cf6)",
        backgroundSize: "400% 400%",
      }}
    />
  );
};

const SkeletonSecurity = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-2">
          Secure
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/2 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-2">
          Reliable
        </p>
      </motion.div>
    </motion.div>
  );
};

// Map tool items to bento grid format
const bentoItems = toolItems.map((tool, index) => {
  // Assign different skeletons based on category
  const getHeader = () => {
    switch (tool.category) {
      case "Frontend":
        return <SkeletonFrontend />;
      case "Backend":
        return <SkeletonBackend />;
      case "DevOps":
        return <SkeletonDevOps />;
      case "Security":
        return <SkeletonSecurity />;
      default:
        return <SkeletonFrontend />;
    }
  };

  // Assign different column spans for visual variety
  const getClassName = () => {
    const classes = ["md:col-span-1"];
    if (index % 5 === 0) return "md:col-span-2";
    if (index % 7 === 0) return "md:col-span-2";
    return classes.join(" ");
  };

  return {
    title: tool.title,
    description: (
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {tool.description}
      </span>
    ),
    header: getHeader(),
    className: getClassName(),
    icon: tool.icon,
    url: tool.url,
  };
});

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/`}>clementBOBIN</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>portfolio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Bento</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Title */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {"My Toolbox"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            {
              "A curated collection of tools and technologies I use to build amazing products"
            }
          </p>
        </header>

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
          {bentoItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
              href={item.url}
            />
          ))}
        </BentoGrid>

        {/* Categories Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {["Frontend", "Backend", "DevOps", "Security"].map((category) => (
            <div
              key={category}
              className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {toolItems.filter((tool) => tool.category === category).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
