import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { AlertCircle, BookOpen, Calendar, ClipboardCheck, FileText, GraduationCap, LayoutDashboard, PieChart, Search, Settings, Users } from "lucide-react";
import { useState } from "react";
import NavLink from "./NavLink";
import { Input } from "@/components/ui/input";
import Dropdown from "./Dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

const navLinks = [
    {
        name: "Dashboard",
        route: "dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Audits",
        route: "audits.index",
        icon: FileText
    },
    {
        name: "Auditors",
        route: "auditors.index",
        icon: Users
    },
    // {
    //     name: "Reports",
    //     route: "reports.index",
    //     icon: PieChart
    // },
]

export default function Sidebar({ user }: { user: User }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <aside className="hidden w-64 bg-[#1E0505] text-gray-300 md:block">
            <div className="flex h-full flex-col py-4">
                <div className="text-white flex items-center justify-center h-16 border-b border-transparent">
                    <img className="h-10 w-10 text-primary" src="https://www.pup.edu.ph/about/images/PUPLogo.png" />
                    <div className="ml-2 flex flex-col">
                        <span className="text-xl font-serif">PUP</span>
                        <span className="text-xs font-bold">Audit Management System</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 mt-4">
                    <form className="relative m-2">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="w-full bg-gray-100 pl-8 dark:bg-gray-700"
                            placeholder="Search..."
                            type="search"
                        />
                    </form>
                    <ul className="p-2 space-y-1">
                        {
                            navLinks.map((link) => (
                                <li>
                                    <NavLink href={route(link.route)} active={route().current(link.route)}>
                                        <link.icon className="h-5 w-5 mr-3" />
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                    {/* <ul className="p-2 space-y-1">
                        {
                            navLinks.map((link) => (
                                <li>
                                    <NavLink href={route(link.route)} active={route().current(link.route)} className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                        <link.icon className="h-5 w-5 mr-3" />
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <LayoutDashboard className="h-5 w-5 mr-3" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <FileText className="h-5 w-5 mr-3" />
                                Audits
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <AlertCircle className="h-5 w-5 mr-3" />
                                Findings
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <Users className="h-5 w-5 mr-3" />
                                Auditors
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                <PieChart className="h-5 w-5 mr-3" />
                                Reports
                            </Link>
                        </li>
                    </ul> */}
                </nav>
                {/* <div className="border-t p-4">
                    <Button className="w-full justify-start" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </div> */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="flex rounded-md mx-2">
                            <div
                                className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium  hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 w-full"
                            >


                                <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                    <AvatarFallback>{user.name.split('')[0].toUpperCase()}</AvatarFallback>
                                </Avatar>

                                <div className="ml-4">
                                    <p className="">{user.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                                </div>

                            </div>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </aside>
    )
}