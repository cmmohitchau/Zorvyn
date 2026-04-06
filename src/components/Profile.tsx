import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar , AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { setRole } from "../redux/slices/roleSlice";
import type { RootState } from "../redux/store/store";

interface ProfileProps {
  username : String;
  email : String;
}


export function Profile({username , email} : ProfileProps) {

  const dispatch = useAppDispatch();
  
  // const role = useAppSelector((s : RootState) => s.roles.role);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 bg-white border rounded-xl px-3 py-1 shadow-sm w-fit cursor-pointer hover:shadow-md transition">
        <span className="border flex justify-center items-center rounded-full w-10 h-10">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="https://avatars.githubusercontent.com/u/134165344?v=4" alt={"Mohit Chaudhary"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </span>
        <div className="hidden lg:flex flex-col text-left">
            <span className="text-sm font-semibold text-gray-900">
            {username}
            </span>
            <span className="text-xs text-gray-500">
            {email}
            </span>
        </div>

        <svg
            className="w-4 h-4 text-gray-500 lg:ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => dispatch(setRole("admin"))}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => dispatch(setRole("viewer"))}>Viewer</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}



