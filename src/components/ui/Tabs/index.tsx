// src/components/ui/Tabs/index.tsx
import * as React from "react";
import { cn } from "@/utilities/helpers";

const TabsContext = React.createContext<{
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}>({
  selectedTab: "",
  setSelectedTab: () => {},
});

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const Tabs = ({ defaultValue, value, onValueChange, className, children }: TabsProps) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);

  React.useEffect(() => {
        if (value !== undefined) {
            setSelectedTab(value);
        }
    }, [value]);

    const handleTabChange = (newValue: string) => {
        if (value === undefined) {
            setSelectedTab(newValue);
        }
        onValueChange?.(newValue);
    };

    return (
        <TabsContext.Provider 
            value={{ 
                selectedTab: value ?? selectedTab, 
                setSelectedTab: handleTabChange 
            }}
        >
            <div className={cn("w-full", className)}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const { selectedTab, setSelectedTab } = React.useContext(TabsContext);
    const isSelected = selectedTab === value;

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        onClick={() => setSelectedTab(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { selectedTab } = React.useContext(TabsContext);
    const isSelected = selectedTab === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = "TabsContent";

