import { motion } from 'framer-motion'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Student } from '@/types/student.type'

type Props = {
    selectedStudent: Student;
    onBackClick: () => void;
}

const Detail = ({ selectedStudent, onBackClick }: Props) => {
    return (
        <motion.div
            className="bg-background shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Button variant="outline" onClick={onBackClick} className="mb-6 hover:bg-accent">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h2 className="text-3xl font-bold mb-6 text-foreground">{selectedStudent.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: "Username", value: selectedStudent.username },
                    { label: "Email", value: selectedStudent.email },
                    { label: "Phone", value: selectedStudent.phone },
                    { label: "Website", value: selectedStudent.website },
                    { label: "Company", value: selectedStudent.company.name },
                    { label: "Address", value: `${selectedStudent.address.street}, ${selectedStudent.address.city}, ${selectedStudent.address.zipcode}` }
                ].map((item, index) => (
                    <div key={index} className="bg-card p-4 rounded-md shadow-sm">
                        <p className="font-semibold text-sm text-muted-foreground mb-1">{item.label}:</p>
                        <p className="text-foreground">{item.value}</p>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Detail