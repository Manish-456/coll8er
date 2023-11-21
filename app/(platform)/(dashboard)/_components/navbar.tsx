import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {MobileNavbar} from "./mobile-navbar";
import { FormPopover } from "@/components/form/form-popover";

export function Navbar() {
  return (
    <nav className="fixed top-0 h-14 px-4 w-full z-50 border-b shadow-sm bg-white flex items-center">
      <MobileNavbar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18} >
        <Button
          size={"sm"}
          variant={"primary"}
          className="rounded-sm hidden md:block h-auto py-1.5 px-2"
        >
          Create
        </Button>
        </FormPopover>
       <FormPopover>
       <Button
          variant={"primary"}
          size={"sm"}
          className="rounded-sm md:hidden block"
        >
          <Plus className="h-4 w-4" />
        </Button>
       </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
