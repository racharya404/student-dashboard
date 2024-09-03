"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { Student } from '@/types/student.type';
import Detail from '@/components/commons/Detail';
import TileView from '@/app/_components/TileView';
import GridView from '@/app/_components/GridView';
import Menu from '@/components/commons/Menu';
import Pagination from '@/app/_components/Pagination';
import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import StudentForm from './StudentForm';

const StudentDashboard = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'tile' | 'detail'>('grid');
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<keyof Student>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                const studentsData = Array.from({ length: 100 }, (_, index) => {
                    const user = data[index % data.length]; // Cycle through the original data
                    return {
                        id: index + 1,
                        name: `${user.name.split(' ')[0]} ${Math.random().toString(36).substring(7)}`,
                        username: `user${index + 1}`, // Add username field
                        email: `${Math.random().toString(36).substring(7)}@example.com`,
                        phone: `+1-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
                        website: `www.${Math.random().toString(36).substring(7)}.com`,
                        company: {
                            name: `${user.company.name} ${Math.random().toString(36).substring(7)}`,
                            catchPhrase: `${user.company.catchPhrase} ${Math.random().toString(36).substring(7)}`,
                            bs: `${user.company.bs} ${Math.random().toString(36).substring(7)}`
                        },
                        address: {
                            street: `${Math.floor(Math.random() * 1000)} ${user.address.street}`,
                            suite: `Suite ${Math.floor(Math.random() * 1000)}`,
                            city: user.address.city,
                            zipcode: `${Math.floor(Math.random() * 100000)}-${Math.floor(Math.random() * 10000)}`,
                            geo: {
                                lat: (Math.random() * 180 - 90).toFixed(6),
                                lng: (Math.random() * 360 - 180).toFixed(6)
                            }
                        },
                        flagged: Math.random() < 0.2, // 20% chance of being flagged
                        group: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
                        tags: Array.from({ length: Math.floor(Math.random() * 5) }, () =>
                            ['student', 'active', 'alumni', 'freshman', 'senior', 'graduate'][Math.floor(Math.random() * 6)]
                        ),
                    };
                });
                setStudents(studentsData as Student[]); // Type assertion to Student[]
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleStudentClick = (student: Student) => {
        setSelectedStudent(student);
        setViewMode('detail');
    };

    const handleBackToTiles = () => {
        setSelectedStudent(null);
        setViewMode('tile');
    };

    const handleDeleteStudent = (studentId: number) => {
        setStudents(students.filter(student => student.id !== studentId));
    };

    const handleFlagStudent = (studentId: number) => {
        setStudents(students.map(student =>
            student.id === studentId ? { ...student, flagged: !student.flagged } : student
        ));
    };

    const handleAddStudent = (newStudent: Partial<Student>) => {
        setStudents([...students, { ...newStudent, id: students.length + 1 } as Student]);
        setIsFormOpen(false);
    };

    const handleEditStudent = (editedStudent: Partial<Student>) => {
        setStudents(students.map(student =>
            student.id === editedStudent.id ? { ...student, ...editedStudent } as Student : student
        ));
        setIsFormOpen(false);
    };

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [students, searchTerm]);

    const sortedStudents = useMemo(() => {
        return [...filteredStudents].sort((a, b) => {
            if (sortBy === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            }
            if (sortBy === 'flagged') {
                return sortOrder === 'asc'
                    ? Number(a.flagged) - Number(b.flagged)
                    : Number(b.flagged) - Number(a.flagged);
            }
            const aValue = String(a[sortBy] ?? '').toLowerCase();
            const bValue = String(b[sortBy] ?? '').toLowerCase();
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    }, [filteredStudents, sortBy, sortOrder]);

    const currentStudents = sortedStudents.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const toggleSort = (key: keyof Student) => {
        setSortBy(key);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Name", "Email", "Group", "Tags", "Flagged"];
        const tableRows = sortedStudents.map(student => [
            student.name ?? '',
            student.email ?? '',
            student.group ?? '',
            student.tags ?? '',
            student.flagged ? "Yes" : "No"
        ]);
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20
        });
        doc.save('students.pdf');
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <Menu />
            <main className="container mx-auto p-4">
                <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center">
                    <h2 className="text-3xl font-bold mb-4 md:mb-0">Student Data</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full md:w-auto mb-2 md:mb-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                            aria-label="Search students"
                        />
                        <Select onValueChange={(value) => toggleSort(value as keyof Student)}>
                            <SelectTrigger className={`w-full md:w-[180px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="id">ID</SelectItem>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="flagged">Flagged</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </Button>
                        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </Button>
                        <div className="w-full md:w-auto">
                            <Select onValueChange={(value) => {
                                if (value === 'add') setIsFormOpen(true);
                                else if (value === 'csv') {
                                    const csvLink = document.querySelector('.csv-link') as HTMLAnchorElement;
                                    csvLink?.click();
                                }
                                else if (value === 'pdf') exportToPDF();
                            }}>
                                <SelectTrigger className={`w-full md:hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                                    <SelectValue placeholder="Actions" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="add">Add Student</SelectItem>
                                    <SelectItem value="csv">Export CSV</SelectItem>
                                    <SelectItem value="pdf">Export PDF</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={() => setIsFormOpen(true)}
                            className={`hidden md:inline-flex ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
                            Add Student
                        </Button>
                        <CSVLink data={students} filename="students.csv" className="csv-link hidden md:block">
                            <Button className={`${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'}`}>
                                Export CSV
                            </Button>
                        </CSVLink>
                        <Button onClick={exportToPDF}
                            className={`hidden md:inline-flex ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}>
                            Export PDF
                        </Button>
                    </div>
                </div>
                <div className="mb-6 flex flex-wrap gap-2">
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        onClick={() => setViewMode('grid')}
                        className={`transition-colors duration-200 ${viewMode === 'grid'
                            ? theme === 'dark'
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-purple-500 hover:bg-purple-600 text-white'
                            : theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                : 'bg-white hover:bg-gray-100 text-gray-800'
                            }`}
                    >
                        Grid View
                    </Button>
                    <Button
                        variant={viewMode === 'tile' ? 'default' : 'outline'}
                        onClick={() => setViewMode('tile')}
                        className={`transition-colors duration-200 ${viewMode === 'tile'
                            ? theme === 'dark'
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-purple-500 hover:bg-purple-600 text-white'
                            : theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                : 'bg-white hover:bg-gray-100 text-gray-800'
                            }`}
                    >
                        Tile View
                    </Button>
                </div>
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center items-center h-64"
                        >
                            <div className={`animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 ${theme === 'dark' ? 'border-blue-500' : 'border-blue-600'}`}></div>
                        </motion.div>
                    ) : currentStudents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-10"
                        >
                            <p className="text-xl font-semibold">No students found</p>
                            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Try adjusting your search or add a new student</p>
                        </motion.div>
                    ) : (
                        <>
                            {viewMode === 'grid' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <GridView
                                        currentStudents={currentStudents}
                                        handleDeleteStudent={handleDeleteStudent}
                                        handleFlagStudent={handleFlagStudent}
                                    />
                                </motion.div>
                            )}
                            {viewMode === 'tile' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <TileView
                                        currentStudents={currentStudents}
                                        handleFlagStudent={handleFlagStudent}
                                        handleDeleteStudent={handleDeleteStudent}
                                        handleStudentClick={handleStudentClick}
                                    />
                                </motion.div>
                            )}
                            {viewMode === 'detail' && selectedStudent && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Detail onBackClick={handleBackToTiles} selectedStudent={selectedStudent} />
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
                {!isLoading && viewMode !== 'detail' && currentStudents.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(sortedStudents.length / studentsPerPage)}
                        paginate={paginate}
                    />
                )}
            </main>
            {isFormOpen && (
                <StudentForm
                    onSubmit={selectedStudent ? handleEditStudent : handleAddStudent}
                    onClose={() => setIsFormOpen(false)}
                    initialData={selectedStudent as Student}
                />
            )}
        </div>
    );
};

export default StudentDashboard;