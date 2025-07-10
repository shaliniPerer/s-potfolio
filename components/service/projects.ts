export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    type: string;
    image: string; // Assuming this is a path to an image
    github: string;
    live: string;
}

// Sample projects data
export const projects: Project[] = [
    {
        id: 1,
        title: "MS Travel - Tourism Web Application",
        description:
            "Developed a responsive web application using HTML,CSS,JAVASCRIPT and Firebase to showcase Sri Lankan tourist attraction by category , allowing users to explore and book destinations",
        technologies: ["HTML", "CSS", "JAVASCRIPT", "FIREBASE"],
        type: "web",
        image: "/images/tourist.jpg?height=300&width=400",
        github: "https://github.com/shaliniPerer/MS-Travel",
        live: "https://github.com/shaliniPerer/MS-Travel",
    },
    {
        id: 2,
        title: "Hostel Management Mobile Application",
        description:
            "Built a mobile application using Flutter and Firebase for hostel room bookings, request submissions, QR code attendence tracking, and in- app messaging for students.",
        technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
        type: "mobile",
        image: "/images/hostel.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/Hostel_Management_System",
        live: "https://github.com/shaliniPerer/Hostel_Management_System",
    },
    {
        id: 3,
        title: "Waste Management Mobile Application",
        description:
            "Developed a mobile application using flutter for scan waste daily using scanner and identify waste types using QR Code.",
        technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
        type: "mobile",
        image: "/images/was.JPG?height=300&width=400",
        github: "#",
        live: "#",
    },
    {
        id: 4,
        title: "High-way Bus Management System",
        description: "Enhanced a web-based reservation system using HTML,CSS, JavaScript, and MySQL, allowing passengers to view schedules, book seats, and receive payment confirmations",
        technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
        type: "web",
        image: "/images/bus.JPG?height=300&width=400",
        github: "#",
        live: "#",
    },
    {
        id: 5,
        title: "Auto Grader - AI Powerd Assignment Marker",
        description:
            "Created a web application and model using Random Forest for automate grading eassy type assignment answers",
        technologies: ["Nex.js", "TypeScript", "Node.js", "Python"],
        type: "ai",
        image: "/images/grader.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/autoGrader-v-1-dewmindi-do-4",
        live: "https://github.com/shaliniPerer/autoGrader-v-1-dewmindi-do-4",
    },
    {
        id: 6,
        title: "Food Delivery Web Based Application",
        description: "Developed a food ordering platform with accout creation, login, shopping cart functionality and Stripe payemnt gateway for secure online transactions",
        technologies: ["React.js", "TypeScript", "Node.js", "Express"],
        type: "web",
        image: "/images/food.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/food_delivery_application",
        live: "https://github.com/shaliniPerer/food_delivery_application",
    },
]