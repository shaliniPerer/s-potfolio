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
        github: "https://github.com/shaliniPerer/Dream_Coach_Lines",
        live: "https://www.dreamcoachlines.com//",
    },
    {
        id: 2,
        title: "Toursim Web Application",
        description:
            "Developed a responsive tourism web application for Ceylon Rich Tours and Travels using Wordpress to showcase Sri Lankan tourist attractions by category, allowing users to explore and book destinations.",
        technologies: ["Wordpress", "Elementor","HTML", "CSS"],
        type: "web",
        image: "/images/ceylon.JPG?height=300&width=400",
        github: "https://rich.thewavedigital.com.lk/",
        live: "https://rich.thewavedigital.com.lk/",
    },
      {
         id: 3,
        title: "Mango WebSite",
        description:
            "One page website for Mango - A fictional fruit selling company.",
        technologies: ["HTML", "CSS", "JavaScript"],
        type: "web",
        image: "/images/mango.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/website",
        live: "https://website-svrh.vercel.app/",
    },
   {
         id: 4,
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
         id: 5,
        title: "Auto Grader",
        description:
            "AI Assignment Corrector.Uses NLP techniques to evaluate and grade student assignments automatically, providing feedback on grammar, coherence, and content quality.",
        technologies: ["Next", "Python", "Node.js"],
        type: "web",
        image: "/images/grader.JPG?height=300&width=400",
        github: "https://github.com/dewmindi/autoGrader",
        live: "https://github.com/dewmindi/autoGrader",
    },
    {
        id: 5,
        title: "Tourism Web Application",
        description:
            "Tourism Web Application For Booking Sri Lankan Tourist Destinations , And Enhance The User Experience.",
        technologies: ["HTML", "CSS", "JAVASCRIPT", "FIREBASE"],
        type: "web",
        image: "/images/tourist.JPG?height=300&width=400",
        github: "https://github.com/shaliniPerer/MS-Travel",
        live: "https://github.com/shaliniPerer/MS-Travel",
    },
    
    
]
