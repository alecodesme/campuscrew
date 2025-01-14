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
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "@/services/authService";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp, Handshake, Home, University, User2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function AppSidebar() {

  const { logout, user } = useAuth()
  const router = useRouter()

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

  const itemsOnUniversity = [
    {
      title: "Home",
      url: "/university",
      icon: Home,
    },
    {
      title: "Clubs",
      url: "/clubs",
      icon: Handshake,
    },
  ];

  // Decidir qué items mostrar dependiendo del rol del usuario
  const items = user?.role === "admin" ? itemsOnDashboard : itemsOnUniversity;

  const authService = new AuthService()

  return (
    <Sidebar >
      <SidebarHeader className="p-0">
        {
          user?.role === "admin" ? <div></div> : <Image
            alt="image-uni"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%" }}
            src="https://www.nyu.edu/content/nyu/en/employees/resources-and-services/media-and-communications/nyu-brand-guidelines/references/jcr:content/2/par-right/nyubasicpromo.img.320.medium.png/1645551437461.png"
          />
        }
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="px-0">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  <span className="font-bold text-base text-white px-2">Your space</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem
                        className="hover:text-white px-3" key={item.title}>
                        <SidebarMenuButton
                          onClick={() => {
                            router.push(item.url)
                          }}
                          className={`${router.pathname == item.url
                            ? "bg-campus_secondary rounded-md text-black"
                            : "text-gray-500"
                            } hover:bg-campus_secondary hover:rounded-md hover:text-black cursor-pointer`}
                          asChild
                        >
                          <div>
                            <item.icon />
                            <span>{item.title}</span>
                          </div>
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
      <SidebarFooter className="bg-black">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-campus_secondary" asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.name} - {user?.role}
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
                <DropdownMenuItem onClick={async () => {

                  const response = await authService.logOut()
                  if (response.status) {
                    localStorage.removeItem('authToken')
                    logout()
                    router?.replace("/auth/sign-in")
                  }

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
