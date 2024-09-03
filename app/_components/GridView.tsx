import React from 'react'
import { motion } from 'framer-motion'
import { Bookmark, MoreVertical, Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Student } from '@/types/student.type'
import { useTheme } from 'next-themes'

type Props = {
    currentStudents: Student[]
    handleDeleteStudent: (id: number) => void
    handleFlagStudent: (id: number) => void
}

const GridView = ({ currentStudents, handleDeleteStudent, handleFlagStudent }: Props) => {
    const { theme } = useTheme()

    return (
        <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <table className={`min-w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg rounded-lg overflow-hidden`}>
                <thead className={`${theme === 'dark' ? 'bg-purple-800' : 'bg-purple-600'} text-white`}>
                    <tr>
                        {['', 'ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Company', 'Address', 'City', 'Zipcode', 'Actions'].map((header) => (
                            <th key={header} className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                    {currentStudents.map((student) => (
                        <motion.tr
                            key={student.id}
                            className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-purple-50'} transition-colors duration-200`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <td className="px-4 py-3 w-6">
                                {student.flagged && <Bookmark className="w-5 h-5 text-purple-500" />}
                            </td>
                            <td className="px-4 py-3 text-sm">{student.id}</td>
                            <td className="px-4 py-3 text-sm font-medium">{student.name}</td>
                            <td className="px-4 py-3 text-sm">{student.username}</td>
                            <td className="px-4 py-3 text-sm">{student.email}</td>
                            <td className="px-4 py-3 text-sm">{student.phone}</td>
                            <td className="px-4 py-3 text-sm">{student.website}</td>
                            <td className="px-4 py-3 text-sm">{student.company?.name || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{student.address?.street || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{student.address?.city || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">{student.address?.zipcode || 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className={`flex items-center ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                                </DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Student</DialogTitle>
                                                    <DialogDescription className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                                        Make changes to the student&apos;s information here. Click save when you&apos;re done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input id="name" defaultValue={student.name} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="username" className="text-right">
                                                            Username
                                                        </Label>
                                                        <Input id="username" defaultValue={student.username} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input id="email" defaultValue={student.email} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'}`} />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className={theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}>Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <DropdownMenuItem onClick={() => handleDeleteStudent(student.id)} className={`flex items-center text-red-500 hover:text-red-700 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                            <Trash className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleFlagStudent(student.id)} className={`flex items-center ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                            <Bookmark className={`h-4 w-4 mr-2 ${student.flagged ? 'text-purple-500' : ''}`} />
                                            {student.flagged ? 'Unflag' : 'Flag'}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    )
}

export default GridView