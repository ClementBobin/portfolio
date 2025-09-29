"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
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

// JSON data structure for tools
const toolsData = {
  categories: ["Frontend", "Backend", "DevOps", "Security"],
  tools: [
    {
      id: 1,
      title: "React",
      description: "UI library for building interactive applications",
      url: "https://react.dev",
      category: "Frontend",
      icon: "react",
      color: "blue",
    },
    {
      id: 2,
      title: "Next.js",
      description: "Full-stack React framework for production",
      url: "https://nextjs.org",
      category: "Frontend",
      icon: "nextjs",
      color: "black",
    },
    {
      id: 3,
      title: "TypeScript",
      description: "Typed JavaScript for better developer experience",
      url: "https://typescriptlang.org",
      category: "Frontend",
      icon: "typescript",
      color: "blue",
    },
    {
      id: 4,
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      url: "https://tailwindcss.com",
      category: "Frontend",
      icon: "tailwind",
      color: "cyan",
    },
    {
      id: 5,
      title: "Node.js",
      description: "JavaScript runtime for server-side development",
      url: "https://nodejs.org",
      category: "Backend",
      icon: "nodejs",
      color: "green",
    },
    {
      id: 6,
      title: "Prisma",
      description: "Next-generation ORM for TypeScript and Node.js",
      url: "https://www.prisma.io",
      category: "Backend",
      icon: "database",
      color: "emerald",
    },
    {
      id: 7,
      title: "Vercel",
      description: "Platform for frontend frameworks and static sites",
      url: "https://vercel.com",
      category: "DevOps",
      icon: "cloud",
      color: "black",
    },
    {
      id: 8,
      title: "Auth.js",
      description: "Authentication for the modern web",
      url: "https://authjs.dev",
      category: "Security",
      icon: "shield",
      color: "blue",
    },
  ],
};

// Icon mapping
const iconMap = {
  react: IconBrandReact,
  nextjs: IconBrandNextjs,
  typescript: IconBrandTypescript,
  tailwind: IconBrandTailwind,
  nodejs: IconBrandNodejs,
  database: IconDatabase,
  cloud: IconCloud,
  shield: IconShield,
};

// Color mapping
const colorMap = {
  blue: "text-blue-500",
  black: "text-black dark:text-white",
  cyan: "text-cyan-500",
  green: "text-green-600",
  emerald: "text-emerald-500",
};

// Single Skeleton component with Anime.js animations
const SkeletonCard = ({ category }: { category: string }) => {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const [animation, setAnimation] = useState<any>(null);

  useEffect(() => {
    if (!skeletonRef.current) return;

    const elements = skeletonRef.current.querySelectorAll('.skeleton-element');
    
    const anim = animate({
      targets: elements,
      translateX: [
        { value: -10, duration: 0 },
        { value: 0, duration: 800 },
        { value: 10, duration: 800 },
        { value: 0, duration: 800 },
      ],
      scale: [
        { value: 0.98, duration: 400 },
        { value: 1, duration: 400 },
        { value: 0.98, duration: 400 },
      ],
      opacity: [
        { value: 0.7, duration: 400 },
        { value: 1, duration: 400 },
        { value: 0.7, duration: 400 },
      ],
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200, { start: 100 }),
    });

    setAnimation(anim);

    return () => {
      if (animation) animation.pause();
    };
  }, [category]);

  const getSkeletonContent = () => {
    switch (category) {
      case "Frontend":
        return (
          <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 flex-col space-y-3">
            <div className="skeleton-element flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
              <div className="h-3 bg-blue-200 dark:bg-blue-800 rounded-full flex-1" />
            </div>
            <div className="skeleton-element flex items-center space-x-2 ml-4">
              <div className="h-3 bg-purple-200 dark:bg-purple-800 rounded-full flex-1" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
            </div>
            <div className="skeleton-element flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-red-500" />
              <div className="h-3 bg-pink-200 dark:bg-pink-800 rounded-full flex-1" />
            </div>
          </div>
        );
      
      case "Backend":
        return (
          <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 flex-col space-y-2">
            {[60, 80, 45, 90].map((width, index) => (
              <div
                key={index}
                className="skeleton-element h-3 bg-green-200 dark:bg-green-800 rounded-full"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        );
      
      case "DevOps":
        return (
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="skeleton-element w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30" />
            </div>
          </div>
        );
      
      case "Security":
        return (
          <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <div className="skeleton-element flex-1 flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-md" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-md" />
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-1 w-full h-full min-h-[6rem] bg-gray-100 dark:bg-gray-800 rounded-lg" />
        );
    }
  };

  return (
    <div ref={skeletonRef} className="w-full h-full">
      {getSkeletonContent()}
    </div>
  );
};

// Map tools to bento grid format
const getBentoItems = () => {
  return toolsData.tools.map((tool, index) => {
    const IconComponent = iconMap[tool.icon as keyof typeof iconMap];
    const iconColor = colorMap[tool.color as keyof typeof colorMap];

    // Assign different column spans for visual variety
    const getClassName = () => {
      if (index % 5 === 0) return "md:col-span-2";
      if (index % 7 === 0) return "md:col-span-2";
      return "md:col-span-1";
    };

    return {
      id: tool.id,
      title: tool.title,
      description: (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {tool.description}
        </span>
      ),
      header: <SkeletonCard category={tool.category} />,
      className: getClassName(),
      icon: IconComponent ? <IconComponent className={cn("h-4 w-4", iconColor)} /> : null,
      url: tool.url,
    };
  });
};

export default function UsesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const bentoItems = getBentoItems();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.bento-item');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate({
              targets: entry.target,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutCubic',
              delay: anime.stagger(100, { start: 200 }),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

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
                <BreadcrumbPage>Uses</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Title */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Toolbox
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            A curated collection of tools and technologies I use to build amazing products
          </p>
        </header>

        {/* Bento Grid */}
        <div ref={gridRef}>
          <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem]">
            {bentoItems.map((item, i) => (
              <div key={item.id} className="bento-item opacity-0">
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={item.header}
                  className={cn("[&>p:text-lg]", item.className)}
                  icon={item.icon}
                  href={item.url}
                />
              </div>
            ))}
          </BentoGrid>
        </div>

        {/* Categories Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {toolsData.categories.map((category) => (
            <div
              key={category}
              className="text-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {toolsData.tools.filter(tool => tool.category === category).length}
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