import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {  deleteCookie, getCookie, getUserRole } from "@/lib/app/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronUp, Handshake, Home, University, User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";



export function AppSidebar() {
  const router = useRouter();
  const role = getUserRole(); // Obtener el rol del usuario

  // Menú para el rol de "admin"
  const itemsOnDashboard = [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Universities",
      url: "/universities",
      icon: University,
    },
  ];

  // Menú para el rol de "university"
  const itemsOnUniversity = [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Clubs",
      url: "/clubs",
      icon: Handshake,
    },
  ];

  // Decidir qué items mostrar dependiendo del rol del usuario
  const items = role === "admin" ? itemsOnDashboard : itemsOnUniversity;



  return (
    <Sidebar>
      <SidebarHeader className="p-0">
      {
        role == "admin" ? <></> : <Image
        alt="image-uni"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%" }}
        src="https://www.nyu.edu/content/nyu/en/employees/resources-and-services/media-and-communications/nyu-brand-guidelines/references/jcr:content/2/par-right/nyubasicpromo.img.320.medium.png/1645551437461.png"
      />
      }
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="px-0">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  <span className="font-bold text-base">Dashboard</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem className="hover:text-white" key={item.title}>
                        <SidebarMenuButton
                          className={`${
                            router.pathname == item.url
                              ? "bg-indigo-500 rounded-none text-white"
                              : "text-gray-500"
                          } hover:bg-indigo-500 hover:rounded-none hover:text-white`}
                          asChild
                        >
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() =>{
                    deleteCookie(getCookie("user_role")!)
                    router?.replace("/auth/sign-in")
                  }}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
}
