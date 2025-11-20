export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    type: string;
    image: string;
    github: string;
    live: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Dream Coach Lines - Tourism Web Application",
        description:
            "Canada-Based Tourism Web Application with payment gateway integration, email notifications with QR codes and a QR Code Scanner for ticket verification.",
        technologies: ["HTML", "CSS", "JAVASCRIPT", "FIREBASE"],
        type: "web",
        image: "/images/dream.JPG?height=300&width=400",
        github: "https://dreamcoachlines.com/",
        live: "https://github.com/shaliniPerer/Dream_Coach_Lines",
    },
    {
        id: 2,
        title: "Toursim Web Application",
        description:
            "Developed a responsive tourism web application for Ceylon Rich Tours and Travels using Wordpress to showcase Sri Lankan tourist attractions by category, allowing users to explore and book destinations.",
        technologies: ["Wordpress", "HTML", "CSS"],
        type: "web",
        image: "/images/ceylon.JPG?height=300&width=400",
        github: "https://rich.thewavedigital.com.lk/",
        live: "https://rich.thewavedigital.com.lk/",
    },
    {
        id: 3,
        title: "InvesterPro - Investment Management Web Application",
        description:
            "Management of investment portfolios, tracking stocks, bonds, and mutual funds and providing real-time market data.",
        technologies: ["Next.js", "TypeScript", "MongoDB"],
        type: "web",
        image: "/images/invest.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/investment",
        live: "https://investment-iota-gules.vercel.app/",
    },
    {
        id: 4,
        title: "Hostel Management Mobile Application",
        description:
            "Built a mobile application using Flutter and Firebase for hostel room bookings, request submissions, QR code attendance tracking, and in-app messaging for students.",
        technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
        type: "mobile",
        image: "/images/hostel.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/Hostel_Management_System",
        live: "https://github.com/shaliniPerer/Hostel_Management_System",
    },
    {
        id: 5,
        title: "Waste Management Mobile Application",
        description:
            "Developed a mobile application using Flutter to scan waste daily using QR Code and identify waste types.",
        technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore"],
        type: "mobile",
        image: "/images/was.JPG?height=300&width=400",
        github: "#",
        live: "#",
    },
    {
        id: 6,
        title: "High-way Bus Management System",
        description:
            "Enhanced a web-based reservation system using HTML, CSS, JavaScript, and MySQL, allowing passengers to view schedules, book seats, and receive payment confirmations.",
        technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
        type: "web",
        image: "/images/bus.JPG?height=300&width=400",
        github: "#",
        live: "#",
    },
    {
        id: 7,
        title: "Auto Grader - AI Powered Assignment Marker",
        description:
            "Created a web application and model using Random Forest to automate grading essay-type assignment answers.",
        technologies: ["Next.js", "TypeScript", "Node.js", "Python"],
        type: "ai",
        image: "/images/grader.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/autoGrader-v-1-dewmindi-do-4",
        live: "https://github.com/shaliniPerer/autoGrader-v-1-dewmindi-do-4",
    },
    {
        id: 8,
        title: "Food Delivery Web Based Application",
        description:
            "Developed a food ordering platform with account creation, login, shopping cart functionality, and Stripe payment gateway for secure online transactions.",
        technologies: ["React.js", "TypeScript", "Node.js", "Express"],
        type: "web",
        image: "/images/food.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/food_delivery_application",
        live: "https://github.com/shaliniPerer/food_delivery_application",
    },
];
