export const mockCourses = [
    {
        id: "1",
        title: "Complete Web Development Bootcamp",
        description: "Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and more.",
        instructor: "Sarah Johnson",
        price: 99.99,
        rating: 4.8,
        studentsEnrolled: 12543,
        thumbnail: "/web-development-coding.png",
        category: "Development",
        tags: ["Web Development", "JavaScript", "React"],
        videoUrl: "https://www.youtube.com/embed/YaN3Y597Ui4",
        syllabus: [
            { id: 1, title: "Introduction to Web Development", duration: "2 hours" },
            { id: 2, title: "HTML Fundamentals", duration: "3 hours" },
            { id: 3, title: "CSS Styling & Layout", duration: "4 hours" },
            { id: 4, title: "JavaScript Basics", duration: "5 hours" },
            { id: 5, title: "React Framework", duration: "6 hours" },
        ],
    },
    {
        id: "2",
        title: "Data Science with Python",
        description: "Learn data analysis, visualization, and machine learning with Python.",
        instructor: "Dr. Michael Chen",
        price: 129.99,
        rating: 4.9,
        studentsEnrolled: 9876,
        thumbnail: "/data-science-python-analytics.jpg",
        category: "Data Science",
        tags: ["Python", "Machine Learning", "Data Analysis"],
        videoUrl: "https://www.youtube.com/embed/qWjKN-5RiQw",
        syllabus: [
            { id: 1, title: "Python Basics", duration: "2 hours" },
            { id: 2, title: "NumPy & Pandas", duration: "3 hours" },
            { id: 3, title: "Data Visualization", duration: "3 hours" },
        ],
    },
    {
        id: "3",
        title: "UI/UX Design Masterclass",
        description: "Create stunning user interfaces and exceptional user experiences.",
        instructor: "Emma Williams",
        price: 89.99,
        rating: 4.7,
        studentsEnrolled: 8234,
        thumbnail: "/ui-ux-design-interface.png",
        category: "Design",
        tags: ["UI Design", "UX Design", "Figma"],
        videoUrl: "https://www.youtube.com/embed/VmJasnbX4xE",
        syllabus: [
            { id: 1, title: "Design Principles", duration: "2 hours" },
            { id: 2, title: "User Research", duration: "3 hours" },
        ],
    },
    {
        id: "4",
        title: "Digital Marketing Essentials",
        description: "Master SEO, social media marketing, content marketing, and analytics.",
        instructor: "David Martinez",
        price: 79.99,
        rating: 4.6,
        studentsEnrolled: 11234,
        thumbnail: "/digital-marketing-social-media.png",
        category: "Marketing",
        tags: ["Marketing", "SEO", "Social Media"],
        videoUrl: "https://www.youtube.com/embed/IKz44MDN9pw",
        syllabus: [{ id: 1, title: "Marketing Fundamentals", duration: "2 hours" }],
    },
]

export const mockLessons = [
    {
        id: "1",
        courseId: "1",
        title: "Introduction to Web Development",
        videoUrl: "https://www.youtube.com/embed/YaN3Y597Ui4",
        duration: "15:30",
        completed: true,
    },
    {
        id: "2",
        courseId: "1",
        title: "HTML Basics",
        videoUrl: "https://www.youtube.com/embed/qWjKN-5RiQw",
        duration: "22:45",
        completed: true,
    },
    {
        id: "3",
        courseId: "1",
        title: "CSS Fundamentals",
        videoUrl: "https://www.youtube.com/embed/VmJasnbX4xE",
        duration: "18:20",
        completed: true,
    },
    {
        id: "4",
        courseId: "1",
        title: "JavaScript Essentials",
        videoUrl: "https://www.youtube.com/embed/IKz44MDN9pw",
        duration: "25:10",
        completed: false,
    },
    {
        id: "5",
        courseId: "1",
        title: "React Introduction",
        videoUrl: "https://www.youtube.com/embed/A0mLGgA3x2Q",
        duration: "30:00",
        completed: false,
    },
    {
        id: "6",
        courseId: "1",
        title: "Building Your First Project",
        videoUrl: "https://www.youtube.com/embed/6lhK3Fs1FEQ",
        duration: "45:30",
        completed: false,
    },
]

export const mockEnrolledCourses = [
    {
        ...mockCourses[0],
        progress: 45,
        lastWatched: "CSS Fundamentals",
        enrolledDate: "2024-01-15",
    },
    {
        ...mockCourses[1],
        progress: 20,
        lastWatched: "NumPy & Pandas",
        enrolledDate: "2024-02-01",
    },
]

export const mockAssignments = [
    {
        id: "1",
        title: "Build a Portfolio Website",
        courseId: "1",
        courseName: "Complete Web Development Bootcamp",
        dueDate: "2024-12-20",
        status: "pending" as const,
        description: "Create a responsive portfolio website using HTML, CSS, and JavaScript.",
        submissionLink: "",
    },
    {
        id: "2",
        title: "Data Analysis Project",
        courseId: "2",
        courseName: "Data Science with Python",
        dueDate: "2024-12-25",
        status: "submitted" as const,
        description: "Analyze a dataset and create visualizations using Python.",
        submissionLink: "https://drive.google.com/file/d/example",
    },
    {
        id: "3",
        title: "Design a Mobile App",
        courseId: "3",
        courseName: "UI/UX Design Masterclass",
        dueDate: "2024-12-15",
        status: "approved" as const,
        description: "Design a complete mobile app interface in Figma.",
        submissionLink: "https://drive.google.com/file/d/example2",
    },
]

export const mockQuizzes = [
    {
        id: "1",
        title: "JavaScript Fundamentals Quiz",
        courseId: "1",
        courseName: "Complete Web Development Bootcamp",
        questions: [
            {
                id: 1,
                question: "What is the correct syntax to print a message in JavaScript?",
                options: ['console.log("Hello World")', 'print("Hello World")', 'echo("Hello World")', 'printf("Hello World")'],
                correctAnswer: 0,
            },
            {
                id: 2,
                question: "Which keyword is used to declare a constant in JavaScript?",
                options: ["var", "let", "const", "constant"],
                correctAnswer: 2,
            },
            {
                id: 3,
                question: "What does DOM stand for?",
                options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Display Object Management"],
                correctAnswer: 0,
            },
        ],
    },
]

export const mockBatches = [
    {
        id: "1",
        name: "Web Development - Batch 2024A",
        courseId: "1",
        courseName: "Complete Web Development Bootcamp",
        startDate: "2024-01-10",
        endDate: "2024-04-10",
        students: 45,
        status: "active" as const,
    },
    {
        id: "2",
        name: "Data Science - Morning Batch",
        courseId: "2",
        courseName: "Data Science with Python",
        startDate: "2024-02-01",
        endDate: "2024-05-01",
        students: 32,
        status: "active" as const,
    },
]

export const mockEnrollments = [
    {
        id: "1",
        studentName: "John Doe",
        studentEmail: "john@example.com",
        courseId: "1",
        courseName: "Complete Web Development Bootcamp",
        batchId: "1",
        batchName: "Web Development - Batch 2024A",
        enrolledDate: "2024-01-15",
        progress: 45,
    },
    {
        id: "2",
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        courseId: "2",
        courseName: "Data Science with Python",
        batchId: "2",
        batchName: "Data Science - Morning Batch",
        enrolledDate: "2024-02-05",
        progress: 60,
    },
]

export const mockAdminAssignments = [
    {
        id: "1",
        studentName: "John Doe",
        studentEmail: "john@example.com",
        assignmentTitle: "Build a Portfolio Website",
        courseName: "Complete Web Development Bootcamp",
        submittedDate: "2024-12-10",
        submissionLink: "https://drive.google.com/file/d/example1",
        status: "pending" as const,
    },
    {
        id: "2",
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        assignmentTitle: "Data Analysis Project",
        courseName: "Data Science with Python",
        submittedDate: "2024-12-08",
        submissionLink: "https://drive.google.com/file/d/example2",
        status: "approved" as const,
    },
]

export const mockReviews = [
    {
        id: "1",
        studentName: "Alice Johnson",
        rating: 5,
        comment: "Excellent course! The instructor explains everything clearly and the projects are very practical.",
        date: "2024-11-15",
    },
    {
        id: "2",
        studentName: "Bob Williams",
        rating: 4,
        comment: "Great content and well-structured. Would love more advanced topics.",
        date: "2024-11-10",
    },
    {
        id: "3",
        studentName: "Carol Davis",
        rating: 5,
        comment: "Best web development course I have taken. Highly recommend!",
        date: "2024-11-05",
    },
]
