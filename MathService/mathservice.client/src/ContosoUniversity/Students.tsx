import { useState, useEffect } from 'react';
import { fetchWithObject, fetch } from '../utilities';

interface Student {
    studentID: number;
    lastName: string;
    firstMidName: string;
    enrollmentDate: string;
    enrollments: object[];
}

function CreateStudent() {
    return <div />;
}

function StudentItem({ student, onStudentChanged }: { student: Student, onStudentChanged: () => void }) {
    const [showDetail, setShowDetail] = useState(false);
    console.log(`Student: ${JSON.stringify(student)}`)

    return (<>
        <tr>
            <td>{student.lastName}</td>
            <td>{student.firstMidName}</td>
            <td>{student.enrollmentDate}</td>
            <td><a className='btn btn-default' href='#' onClick={toggleShowDetail}>Detail</a></td>
        </tr>
        <DetailView showDetail={showDetail} colSpan='4' />
    </>);

    function DetailView({ showDetail, colSpan }: { showDetail: boolean, colSpan: number }): JSX.Element {
        if (showDetail) {
            return (<tr><td colSpan={colSpan}>
                <table>
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </td></tr>);
        } else {
            return (<></>);
        }
    }

    function toggleShowDetail() {
        setShowDetail(!showDetail);
    }
}

function StudentsTable({ students, onStudentChanged }: {students: Student[], onStudentChanged: () => void }) {


    return (<table className="table">
        <thead>
            <tr>
                <th>Last Name</th>
                <th>Given Names</th>
                <th>Enrollment Date</th>
                <th />
            </tr>
        </thead>

        <tbody>
            {students.map(student =>
                <StudentItem key={student.studentID} student={student} onStudentChanged={onStudentChanged} />
            )}
        </tbody>
    </table>);
}

export function StudentsView() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => { populateStudents() }, []);

    return (<div>
        <CreateStudent />
        <StudentsTable students={students} onStudentChanged={populateStudents} />
    </div>)

    async function populateStudents() {
        const response = await fetch('/api/Students', 'GET', undefined)
        const data = await response.json();
        setStudents(data);
    }
}