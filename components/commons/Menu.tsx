import React from 'react'
import { Menu as MenuIcon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'

type Props = {}

const Menu = (props: Props) => {
    const { theme } = useTheme()

    return (
        <nav className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-4 shadow-md transition-colors duration-200`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex justify-between items-center w-full md:w-auto">
                    <h1 className="text-xl md:text-2xl font-bold">Student Dashboard</h1>
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <MenuIcon className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                                <SheetHeader>
                                    <SheetTitle className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>Menu</SheetTitle>
                                    <SheetDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                        Navigate through the dashboard
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-4 flex flex-col space-y-4">
                                    <Button variant="ghost" className="justify-start hover:bg-gray-200 dark:hover:bg-gray-700">Home</Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="justify-start hover:bg-gray-200 dark:hover:bg-gray-700">Students</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                                            <DropdownMenuItem className="hover:bg-gray-200 dark:hover:bg-gray-600">Add Student</DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-gray-200 dark:hover:bg-gray-600">Student List</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button variant="ghost" className="justify-start hover:bg-gray-200 dark:hover:bg-gray-700">Reports</Button>
                                    <Button variant="ghost" className="justify-start hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <ul className="flex space-x-4">
                        <li><Button variant="ghost" className="hover:bg-gray-200 dark:hover:bg-gray-700">Home</Button></li>
                        <li className="relative group">
                            <Button variant="ghost" className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                                Students <ChevronDown className="ml-1" />
                            </Button>
                            <ul className={`absolute hidden group-hover:block ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-md p-2 space-y-2 shadow-lg`}>
                                <li><Button variant="ghost" className="w-full text-left hover:bg-gray-200 dark:hover:bg-gray-600">Add Student</Button></li>
                                <li><Button variant="ghost" className="w-full text-left hover:bg-gray-200 dark:hover:bg-gray-600">Student List</Button></li>
                            </ul>
                        </li>
                        <li><Button variant="ghost" className="hover:bg-gray-200 dark:hover:bg-gray-700">Reports</Button></li>
                        <li><Button variant="ghost" className="hover:bg-gray-200 dark:hover:bg-gray-700">Settings</Button></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu