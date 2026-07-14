/* RetroUI - Tabs with list/trigger/content */
import { cn } from "@/lib/utils";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";

interface ITabsTriggerList extends React.ComponentProps<typeof BaseTabs.List> {
  className?: string;
}
const TabsTriggerList = ({
  children,
  className,
  ...props
}: ITabsTriggerList) => {
  return (
    <BaseTabs.List className={cn("flex flex-row items-center justify-center w-full gap-2", className)} {...props}>
      {children}
    </BaseTabs.List>
  );
};

interface ITabsTrigger extends React.ComponentProps<typeof BaseTabs.Tab> {
  className?: string;
}
const TabsTrigger = ({ children, className, ...props }: ITabsTrigger) => {
  return (
    <BaseTabs.Tab
      className={cn(
        "px-4 py-2 text-sm font-medium border-2 border-transparent text-muted-foreground data-active:border-border data-active:bg-primary data-active:text-foreground data-active:font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
    </BaseTabs.Tab>
  );
};

interface ITabsContent extends React.ComponentProps<typeof BaseTabs.Panel> {
  className?: string;
}
const TabsContent = ({ children, className, ...props }: ITabsContent) => {
  return (
    <BaseTabs.Panel className={cn("w-full", className)} {...props}>
      {children}
    </BaseTabs.Panel>
  );
};

const TabsObj = Object.assign(BaseTabs.Root, {
  List: TabsTriggerList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { TabsObj as Tabs };
