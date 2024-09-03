import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MoreVertical, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setViewMode('detail');
  };

  const handleBackToTiles = () => {
    setSelectedStudent(null);
    setViewMode('tile');
  };

  const renderMenu = () => (
    <nav className="bg-purple-600 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <div className={`md:flex ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <Button variant="ghost">Home</Button>
            </li>
            <li className="relative group">
              <Button variant="ghost" className="flex items-center">
                Students <ChevronDown className="ml-1" />
              </Button>
              <ul className="absolute hidden group-hover:block bg-purple-700 rounded-md p-2 space-y-2">
                <li><Button variant="ghost">Add Student</Button></li>
                <li><Button variant="ghost">Student List</Button></li>
              </ul>
            </li>
            <li><Button variant="ghost">Reports</Button></li>
            <li><Button variant="ghost">Settings</Button></li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const renderGrid = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-purple-600 text-white">
          <tr>
            {['ID', 'Name', 'Username', 'Email', 'Phone', 'Website', 'Company', 'Address', 'City', 'Zipcode'].map((header) => (
              <th key={header} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-purple-50 transition-colors duration-200">
              <td className="px-4 py-2">{student.id}</td>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.username}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.phone}</td>
              <td className="px-4 py-2">{student.website}</td>
              <td className="px-4 py-2">{student.company.name}</td>
              <td className="px-4 py-2">{student.address.street}</td>
              <td className="px-4 py-2">{student.address.city}</td>
              <td className="px-4 py-2">{student.address.zipcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTiles = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {students.map((student) => (
        <Card key={student.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Flag</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="link"
              className="mt-2 p-0 h-auto font-normal text-purple-600"
              onClick={() => handleStudentClick(student)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDetail = () => (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <Button variant="ghost" onClick={handleBackToTiles} className="mb-4">
        <ArrowLeft className="mr-2" /> Back to Tiles
      </Button>
      <h2 className="text-2xl font-bold mb-4">{selectedStudent.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Username:</p>
          <p>{selectedStudent.username}</p>
        </div>
        <div>
          <p className="font-semibold">Email:</p>
          <p>{selectedStudent.email}</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>{selectedStudent.phone}</p>
        </div>
        <div>
          <p className="font-semibold">Website:</p>
          <p>{selectedStudent.website}</p>
        </div>
        <div>
          <p className="font-semibold">Company:</p>
          <p>{selectedStudent.company.name}</p>
        </div>
        <div>
          <p className="font-semibold">Address:</p>
          <p>{`${selectedStudent.address.street}, ${selectedStudent.address.city}, ${selectedStudent.address.zipcode}`}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {renderMenu()}
      <main className="container mx-auto p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Student Data</h2>
          <div>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="mr-2"
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === 'tile' ? 'default' : 'outline'}
              onClick={() => setViewMode('tile')}
            >
              Tile View
            </Button>
          </div>
        </div>
        {viewMode === 'grid' && renderGrid()}
        {viewMode === 'tile' && renderTiles()}
        {viewMode === 'detail' && renderDetail()}
      </main>
    </div>
  );
};

export default StudentDashboard;