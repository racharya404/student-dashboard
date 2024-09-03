import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/types/student.type';
import { useTheme } from 'next-themes';

interface StudentFormProps {
    onSubmit: (student: Partial<Student>) => void;
    onClose: () => void;
    initialData?: Partial<Student>;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, onClose, initialData }) => {
    const [formData, setFormData] = useState<Partial<Student>>(initialData || {});
    const { theme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className={`p-6 rounded-lg shadow-xl max-w-md w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
                        }`}
                >
                    <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit Student' : 'Add New Student'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            required
                            className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                            className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}
                        />
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}
                        />
                        <Select
                            onValueChange={(value) => setFormData(prev => ({ ...prev, group: value }))}
                            value={formData.group}
                        >
                            <SelectTrigger className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}>
                                <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                            <SelectContent className={theme === 'dark' ? 'bg-gray-700 text-white' : ''}>
                                <SelectItem value="A">Group A</SelectItem>
                                <SelectItem value="B">Group B</SelectItem>
                                <SelectItem value="C">Group C</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default StudentForm;
