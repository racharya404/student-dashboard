import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React from 'react'
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
import { Bookmark, Edit, MoreVertical, Trash } from 'lucide-react'
import { Student } from '@/types/student.type'
import { useTheme } from 'next-themes'

type Props = {
    currentStudents: Student[]
    handleFlagStudent: (id: number) => void
    handleDeleteStudent: (id: number) => void
    handleStudentClick: (student: Student) => void
}

const TileView = ({ currentStudents, handleFlagStudent, handleDeleteStudent, handleStudentClick }: Props) => {
    const { theme } = useTheme()

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {currentStudents.map((student) => (
                <motion.div
                    key={student.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className={`hover:shadow-lg transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center">
                                    <h3 className="text-lg font-semibold">{student.name}</h3>
                                    <div className="w-6 ml-2">
                                        {student.flagged && <Bookmark className={`h-5 w-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className={theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}>
                                            <MoreVertical className="h-5 w-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className={theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className={theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}>
                                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                                </DropdownMenuItem>
                                            </DialogTrigger>
                                            <DialogContent className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}>
                                                <DialogHeader>
                                                    <DialogTitle>Edit Student</DialogTitle>
                                                    <DialogDescription className={theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}>
                                                        Make changes to the student&apos;s information here. Click save when you&apos;re done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="name" className="text-right">
                                                            Name
                                                        </Label>
                                                        <Input id="name" value={student.name} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="username" className="text-right">
                                                            Username
                                                        </Label>
                                                        <Input id="username" value={student.username} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="email" className="text-right">
                                                            Email
                                                        </Label>
                                                        <Input id="email" value={student.email} className={`col-span-3 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button type="submit" className={theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}>Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <DropdownMenuItem onClick={() => handleFlagStudent(student.id)} className={theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}>
                                            <Bookmark className="h-4 w-4 mr-2" /> {student.flagged ? 'Unflag' : 'Flag'}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteStudent(student.id)} className={`text-red-500 ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                                            <Trash className="h-4 w-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{student.email}</p>
                            <Button
                                variant="link"
                                className={`p-0 h-auto font-normal ${theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
                                onClick={() => handleStudentClick(student)}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default TileView