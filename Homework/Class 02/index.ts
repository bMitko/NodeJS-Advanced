// Го именував StudentIF за да се разликува од името на класата
interface StudentIF {
    id: number;
    name: string;
    age: number;
    grades: number[];
}

class Student implements StudentIF {
    constructor(
        public id: number,
        public name: string,
        public age: number,
        public grades: number[]
    ) {}
} 

// Ако не користиме класи пример како би изгледало

// const student1: StudentIF = {
//     id: 1,
//     name: "John",
//     age: 20,
//     grades: [4,5,4,3]
// }

const student1 = new Student(1, "John", 20, [4,5,4,3])
const student2 = new Student(2, "Jane", 19, [5,5,5,5])
const student3 = new Student(3, "Jack", 21, [2,4,3])
const student4 = new Student(4, "Jill", 21, [3,4,5])
const student5 = new Student(5, "Jeff", 18, [5,5,5])
const student6 = new Student(6, "Josh", 20, [4,2])

// Помошна функција
function calculateAverageGradePerStudent(student: StudentIF): number{
    let sum:number = 0
    for(let i=0; i<(student.grades).length; i++){
        sum = sum += (student.grades)[i]
    }
    const avgGrade:number = sum / (student.grades).length
    return avgGrade
}

function calculateAverageGrade(group:Student[]):void {
    let sum:number = 0
    for(let i=0; i<group.length; i++){
        sum = sum + calculateAverageGradePerStudent(group[i])
    }
    const avgGrade:number = sum / group.length
    console.log(Math.round(avgGrade))
}

// Testing

// const group1:StudentIF[] = [student1, student2, student3]

// calculateAverageGrade(group1)
// calculateAverageGrade([student1,student2,student3])
// calculateAverageGrade([student5])
// calculateAverageGrade([student2,student5,student6,student3])

enum GradeLevel {
    Freshman = 18,
    Sophomore = 19,
    Junior = 20,
    Senior = 21
}

function getGradeLevel(age:number): void{
    if (age < 18){
        console.log("You don't have grade level yet")
    }
    else
    if (age > 21) {
        console.log("You already finished the course you were studing")
    }
    else
    console.log(GradeLevel[age])
}

//Testing 

// getGradeLevel(student1.age)
// getGradeLevel(20)
// getGradeLevel(17)
// getGradeLevel(25)

interface CourseIF {
    id: number;
    name: string;
    students: StudentIF[];
    instructor: string;
    maxStudents: number;
}

const course1: CourseIF = {
    id: 1,
    name: "HTML",
    students: [student1,student2, student3],
    instructor: "Ross",
    maxStudents: 8
}

const course2: CourseIF = {
    id: 2,
    name: "JavaScript",
    students: [student4, student5],
    instructor: "Mike",
    maxStudents: 5
}

const course3: CourseIF = {
    id: 3,
    name: "PostgreSQL",
    students: [student1, student4, student6],
    instructor: "Alex",
    maxStudents: 3
}

class CourseMenager {
    private courses: CourseIF[] = [];

    public addCourse(course: CourseIF): void {
        this.courses.push(course)
    }

    public removeCourseById(courseId: number):void {
        this.courses = this.courses.filter(course => course.id !== courseId)
    }

    public getCourseById(courseId: number): CourseIF | undefined {
        let course = this.courses.find(course => course.id === courseId)
        return course
    }

    public getAllCourses():CourseIF[] {
        return this.courses
    }
}

//Testing (ако додадеме console.log и го смениме типот во void)

const courseMenager = new CourseMenager;

courseMenager.addCourse(course1)
courseMenager.addCourse(course2);
courseMenager.getCourseById(2)
courseMenager.removeCourseById(2)
courseMenager.getAllCourses();


function getTopStudents(courseId:number, top: number ):void {
    let course = courseMenager.getCourseById(courseId)
    if(!course){
        console.log("No course with this id")
    }
    else 
    if(course && (top > (course.students).length)){
        console.log("You can't ask to list more students that are actually attending the course")
    }
    else
    {
        let array = JSON.parse(JSON.stringify(course.students));
        for(let i=0; i<(course.students).length; i++){
            (array[i]).avg = calculateAverageGradePerStudent(array[i]);
        }
        array.sort((a:any, b:any) => b.avg - a.avg)
        console.log(array.slice(0, top))
    }
}

// Testing 

getTopStudents(1,2)
getTopStudents(2,2)
getTopStudents(1,4)