import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageProps, User } from "@/types";
import { Bell, Menu, Search } from "lucide-react";
import Dropdown from "./Dropdown";

export default function Header({ user }: { user: User }) {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:bg-gray-800">
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
                {/* <h1 className="ml-2 text-lg font-semibold md:ml-0">Dashboard</h1> */}
            </div>
            <div className="flex items-center gap-4">
                <form className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        className="w-full bg-gray-100 pl-8 dark:bg-gray-700"
                        placeholder="Search..."
                        type="search"
                    />
                </form>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>


                <div className="hidden sm:flex sm:items-center sm:ms-6">
                    <div className="ms-3 relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >

                                        {/* {user.name} */}

                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                            <AvatarFallback>{user.name.split('')[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>




                                        {/* <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg> */}


                                    </button>
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
                </div>
            </div>
        </header>
    )
}