/* const Question = [
  ["combine", "how", "you", "are"],
  ["combine","what", "you", "name"],
  ["combine", "today", "time"],
  "today",
  "time",
  "bye",
  ["combine", "about", "yourself"],
  ["combine", "motivated", "you"],
  ["combine", "other", ["or","professional","student","cod","programm"]],
  ["combine", "describe", "challen", ["or", "project", "situation"]],
  ["combine", "approach", "continuous", "learning", "profession", "development"],
  ["combine", "what", "are", "you", "doing"],
  "portfolio",
  "experience",
  ["combine", "more", "about", "your", "project"],
  "project",
  ["combine", "strength", "weak"],
  "strength",
  "weak",
  ["combine", "share", "succes"],
  ["combine", "about", "your", "education"],
  ["combine", "inspire", "you"],
  ["combine", "skill", "you", "use", "project", "succes"],
  ["combine", ["or","problem-solving", "problem", "solv"], "approach"],
  ["combine","communication", "skill"],
  "leadership",
  ["combine", ["or","preferred","favori"], "programming", "languages"],
  ["combine", "project", "management"],
  ["combine", "data", "analys"],
  ["combine", "customer", "service", "philosophy"],
  ["combine", ["or","career", "goals"]],
  ["", "hi", "hello", "hey"], // Array inside question
  "teamwork",
  ["combine","you", "approach", "learning", "new", "techno"],
  ["combine",["or","tight deadlines","high-pressure situations"]],
  ["combine","you", "resolve", "conflict", "team"],
  ["combine","you", "stay" ["or","motivated", "productive"]],
  ["combine","describe", "time", "you", ["or","improve","solve problem"]],
  ["combine", "your", "work", "schedule"],
  ["combine", "handle", ["or", "difficult"], "client"],
  ["combine", "your", "work", "ethic"],
  ["combine", "your", "time", "management", "skills"],
  ["combine", "handle", "stressful", "situation"],
  ["combine", "your", "preferred", "method", "of", "communication"],
  ["combine", "your", "approach", "to", "creativity"],
  ["combine", "handle", "feedback", "and", "criticism"],
  ["combine", "balance", "multiple", "projects"],
  ["combine", "overcome", "challenges", "in", "your", "career"],
  ["combine", "favorite", "hobbies"],
  ["combine", "learn", "you", "school"],
  "skill",
  ["combine", "core", "value"]
  ["combine", "time", "when", "adapt", ["or","to change", "unexpected circumstance"]],
  ["combine", "preferred", "method", "collaboration"],
  ["combine", "describe", "difficult", "client", "situation"],
  ["combine", "maintain", "work-life", "balance", "prevent", "burnout"],
  ["combine", "step", "take", "quality", "accuracy", "work"],
];

const Responses = [
  "I'm doing well, thank you!",
  "I'm Chatbot, nice to meet you!",
  "Today is " + new Date().toDateString() + " and the current time is " + new Date().toLocaleTimeString(),
  "Today is " + new Date().toDateString(),
  "The current time is " + new Date().toLocaleTimeString(),
  "Goodbye!",
  "I'm a web development student and I'm avid about programming and problem solving. I'm a self-taught person, and I'm excited to showcase my work and share my journey with you.",
  "I've always had a deep fascination for technology, even from a young age. Since the beginning of my journey, I have created games for people close to me. I know the impact programming can have on society, and that's what inspired me to pursue a career in this field. I find joy in continuing my studies and continually seek opportunities to learn and grow within the industry.",
  "What sets me apart is a unique combination of self-taught, communication, problem-solving, adaptability, teamwork, critical thinking, resilience, analytical skills and self-awareness. I possess a strong foundation in Data-driven decision-making, Global Mindset, Strategic thinking, Continuous learning and improvement, which will enable me to deliver exceptional results, approach challenges with ease, and provide a unique perspective on the challenges that come with it. Additionally, my Personal Projects and Research have allowed me to develop a distinctive approach that is both practical and self-sufficient. I strive for excellence in everything I do and continually seek opportunities to innovate and make a positive impact.",
  "One of the most challenging projects I encountered was [describe the project briefly]. It presented various obstacles such as [specific challenges or constraints]. To overcome these challenges, I adopted a proactive approach by [describe your problem-solving or decision-making strategies]. I collaborated closely with the team, leveraging their expertise and fostering open communication. Through perseverance, adaptability, and creative thinking, we successfully [describe the outcome or resolution]. This experience taught me valuable lessons in resilience and reinforced my ability to navigate complex situations effectively.", //remplir
  "I truly believe in the power of continuous learning and actively seek opportunities to expand my knowledge and skills. I try to stay up-to-date with industry trends, attend conferences, and participate in relevant workshops and training programs. I also engage in self-directed learning through online courses and podcasts. Furthermore, I value feedback and actively seek opportunities for constructive criticism, as it helps me identify areas for improvement and personal growth. By embracing a growth mindset, I am dedicated to staying at the forefront of my field and continually honing my craft.",
  "Nothing right now",
  "I have created a portfolio that showcases my work, skills, and experiences. You can check it out at www.portfolio.io. It provides an overview of my projects, achievements, and contributions. Feel free to explore it and get a deeper understanding of my capabilities and expertise.",
  "Throughout my career, I have gained valuable experience in [list of relevant experiences or positions]. These experiences have allowed me to [accomplishments or projects]. I have honed my skills and expertise in [specific areas] and have demonstrated my ability to [highlight key achievements or outcomes]. I'm always excited to apply my experience and contribute to new projects and opportunities.",//remplir
  "I have worked on various projects that have allowed me to showcase my skills and expertise. One notable project is [describe a significant project and its impact]. It involved [key details about the project, technologies used, or challenges encountered]. I'm proud of the results achieved and the positive impact it made.",//remplir
  "I have worked on various projects that have allowed me to showcase my skills and expertise. One notable project is [describe a significant project and its impact]. It involved [key details about the project, technologies used, or challenges encountered]. I'm proud of the results achieved and the positive impact it made.",//remplir
  "Some of my strengths include [list of strengths]. These strengths enable me to [accomplish specific tasks or contribute to projects effectively]. As for weaknesses, I continuously strive to improve in [areas for growth or development] and actively seek feedback to enhance my skills and overcome any limitations.",//remplir
  "Some of my strengths include [list of strengths]. These strengths enable me to [accomplish specific tasks or contribute to projects effectively]. As for weaknesses, I continuously strive to improve in [areas for growth or development] and actively seek feedback to enhance my skills and overcome any limitations.",//remplir
  "Some of my strengths include [list of strengths]. These strengths enable me to [accomplish specific tasks or contribute to projects effectively]. As for weaknesses, I continuously strive to improve in [areas for growth or development] and actively seek feedback to enhance my skills and overcome any limitations.",//remplir
  "One success story that stands out is [describe a specific success story or achievement]. It was a challenging situation that required [specific skills or strategies]. Through perseverance and collaboration, we were able to [describe the outcome or accomplishment]. It was a great learning experience that reinforced my belief in the power of determination and teamwork.",//remplir
  "I have a [degree or qualification] in [your field] from [university or educational institution]. During my education, I gained a solid foundation in [relevant subjects or areas]. Additionally, I have participated in [relevant extracurricular activities or projects] that have enriched my learning experience and provided practical insights into [your field].",//remplir
  "I find inspiration in [specific sources or individuals]. [Describe what inspires you, such as industry leaders, innovative ideas, or societal impact]. It fuels my motivation and drives me to continually push boundaries and seek new opportunities for growth and learning.",//remplir
  "I have worked on several projects that have allowed me to apply my skills and contribute to their success. Some notable projects include [project names or brief descriptions]. These projects involved [specific technologies or challenges]. It was a rewarding experience to be part of these initiatives and witness their positive impact.",
  "When it comes to problem-solving, I follow a systematic approach that involves several key steps. Firstly, I thoroughly analyze the problem at hand, breaking it down into its components and identifying the underlying causes. This helps me gain a clear understanding of the situation. Once I have a grasp of the problem, I brainstorm potential solutions and evaluate their feasibility and potential outcomes. I consider various perspectives and gather relevant information to make informed decisions. Next, I develop a well-structured plan of action, outlining the steps required to implement the chosen solution. I prioritize tasks, set deadlines, and allocate resources effectively to ensure efficient execution. During the implementation phase, I remain adaptable and open to feedback. I monitor the progress closely, making adjustments as needed. If unexpected obstacles arise, I approach them with a positive mindset, seeking creative alternatives or collaborating with others to find solutions. After the solution is implemented, I evaluate the results and assess the effectiveness of the chosen approach. I identify lessons learned and document them for future reference. This reflection process allows me to continuously improve my problem-solving skills and enhance my decision-making abilities. Overall, my problem-solving approach combines analytical thinking, creativity, collaboration, and a commitment to continuous improvement. By following this approach, I aim to tackle challenges efficiently and deliver optimal results. When it comes to problem-solving, I approach challenges systematically. I gather all relevant information, analyze the situation, and break it down into manageable steps. I also leverage my creativity to think outside the box and come up with innovative solutions. Collaboration is essential to me, as I believe that diverse perspectives can lead to more effective problem-solving.",
  "Communication is a crucial skill, and I prioritize clear and concise communication in both verbal and written formats. I actively listen to others, ask clarifying questions, and ensure that I convey information effectively. I also adapt my communication style to different audiences and contexts to ensure understanding and engagement.",
  "For a leader, I believe in leading by example and empowering team members. I encourage open communication, foster a collaborative environment, and provide guidance and support when needed. He should strive to create a positive and inclusive team culture that promotes creativity, growth, and personal development.",
  "I have experience working with various programming languages, including [list of preferred programming languages]. Each language has its strengths and best use cases, and I have adapted my choices based on project requirements. I stay updated with emerging languages and technologies to ensure that I can effectively contribute to projects and stay current with industry trends.",
  "When it comes to project management, I follow a structured approach that includes defining clear goals, creating a detailed plan, assigning tasks and responsibilities, monitoring progress, and adapting as needed, and then working on the project as needed. I emphasize effective communication, resource allocation, and risk management to ensure project success.",
  "Data analysis is a core skill that I possess. I have experience in collecting, organizing, and analyzing data using various tools and techniques. I use data to derive insights, make informed decisions, and drive business growth. I am also proficient in data visualization to effectively communicate my findings.",
  "Customer service is a customer priority. I believe in delivering exceptional experiences by understanding customer needs, providing prompt and helpful assistance, and exceeding expectations. I strive to build strong customer relationships based on trust, empathy, and a customer-centric mindset.",
  "My career goals include continuous learning, professional growth, and making a meaningful impact in my field. I aim to contribute to innovative projects. I also aspire to stay at the forefront of emerging trends and technologies while remaining adaptable and relevant.",
  ["Hey! What's up?", "Hey! How are you doing?"],
  "I have extensive teamwork experience, having collaborated with diverse teams on various projects over the years. I value open communication, active listening, and respect for differing perspectives. I believe that teamwork fosters creativity, innovation, and collective success.",
  "When it comes to learning new technologies, I follow a structured approach. I start by researching and gathering information about the technology, its applications, and best practices. I then engage in hands-on practice, working on small projects or exercises to gain practical experience. I also leverage online tutorials, documentation, and communities to deepen my understanding and seek guidance when needed. Additionally, I enjoy collaborating with colleagues or participating in workshops to learn from others' experiences. Overall, I believe in a combination of self-study, practical application, and collaboration to effectively learn new technology from the ground up.",
  "Handling tight deadlines and high-pressure situations requires effective time management, prioritization, and maintaining a calm mindset. I start by assessing the tasks at hand and breaking them down into manageable steps. I create a schedule or action plan, setting clear priorities and deadlines. During this time of execution, I remain focused, maintaining open communication with others, managing expectations and providing regular updates. If necessary, I delegate tasks and seek support from my team members. I also make sure to take short breaks to recharge and maintain productivity. Ultimately, my goal is to deliver quality results while managing stress and ensuring a healthy work-life balance.",
  "In a previous project, there was a conflict between two team members who had different opinions on how to approach a specific task. To resolve the conflict, I took the initiative to facilitate a discussion between them, allowing each person to express their viewpoints and concerns. I actively listened to both sides, acknowledging their perspectives and fostering an open dialogue. I encourage them to find common ground and explore potential compromises. Through effective communication and mediation, we were able to reach a mutually agreeable solution that satisfied both team members. The conflict resolution process not only resolved the immediate issues but also strengthened the team's communication and collaboration moving forward.",
  "To stay motivated and productive, I employ several strategies. Firstly, I set clear goals and break them down into smaller, manageable tasks. This helps me maintain focus and track my progress. Secondly, I prioritize tasks based on their importance and urgency, ensuring that I allocate my time and energy effectively. Additionally, I find it helpful to establish a routine and create a conducive work environment that minimizes distractions. Regular breaks, exercise, and maintaining a healthy work-life balance also contribute to my overall productivity. Lastly, I find inspiration in the work itself and the impact it can have, which drives me to stay motivated and continually strive for excellence.",
  "In a previous role, I noticed inefficiencies in the existing workflow that were causing delays and affecting productivity. Recognizing the issue, I took the initiative to analyze the process, identify bottlenecks, and propose improvements. I conducted thorough research and gathered feedback from team members. Based on my findings, I developed a new process flow that streamlined the workflow, eliminated unnecessary steps, and introduced automation where applicable. I presented my proposal to the team and gained their support through clear communication and showcasing the potential benefits. Implementing the new process resulted in significant time savings and improved productivity, demonstrating the value of taking proactive measures to enhance efficiency in the workplace.",
  "I combine my work schedule by prioritizing tasks, setting deadlines, and using time management techniques. By organizing my tasks and allocating time for each one, I ensure that I can effectively manage my workload and meet deadlines.",
  "When it comes to handling difficult or challenging clients, I combine patience, empathy, and effective communication to help me get through the day. I strive to understand their concerns, address their needs, and find mutually beneficial solutions to maintain a positive working relationship.",
  "I combine a strong work ethic with a dedication to being disciplined, and being proactive in my approach to work. I believe in putting in the necessary effort, going the extra mile, and delivering high-quality results to achieve both personal and professional goals.",
  "Combining my time management skills involves prioritizing tasks, setting clear goals, breaking down complex projects into manageable steps, and utilizing productivity tools to achieve those goals. By effectively managing my time, I can maximize productivity and meet deadlines.",
  "In stressful situations, I combine my ability to stay calm, maintain perspective, and problem-solve effectively. I focused on identifying the root cause of this stress, breaking it down into manageable parts, and finding practical solutions to alleviate that stress and restore balance.",
  "My preferred method of communication combines both verbal and written channels, depending on the context. For quick and straightforward discussions, I find face-to-face or phone conversations to be efficient. For detailed information about asynchronous communication, I rely on emails and/or project management tools.",
  "When it comes to creativity, I combine both structured and open-ended approaches. I start with researching things, gathering inspiration, and defining goals. Then, I allow for free-thinking, brainstorming, and exploring various possibilities. Finally, I refine and structure ideas to ensure they align with the project's objectives.",
  "I combine a constructive approach to handling feedback and criticism. I listen actively, seek to understand the perspectives and intentions behind the feedback, and reflect on ways to improve upon those perspectives. I embrace feedback as an opportunity for growth and use it to refine my skills and deliver better results.",
  "To balance multiple projects, I would combine effective prioritization, time management, and communication with the most effective approach possible. I break down each project into tasks, set clear goals and deadlines, and regularly assess progress as I go along. By staying organized, communicating expectations, and managing my time efficiently, I ensure all projects receive the attention they deserve.",
  "To overcome the challenges of my career, I combined resilience, adaptability, and a proactive mindset. I view challenges as opportunities for growth, seek solutions, and continuously learn and improve. By staying focused, seeking support when needed, and maintaining a positive attitude, I can successfully navigate the challenges I face as a person.",
  "Some of my favorite hobbies include [list of hobbies or activities]. They provide me with a way to relax and recharge outside of work, and I find them to be a great source of inspiration and creativity.",
  "i have learned at school this:",
  "I have a diverse range of skills that include [list of skills or areas of expertise]. These skills enable me to [accomplish specific tasks or solve particular challenges]. I continually strive to enhance my skills and stay updated with emerging technologies and industry trends.",
  "My core values include integrity, empathy, continuous learning, and collaboration.",
  "I adapted to change by remaining flexible, seeking solutions, and communicating effectively with the team and the community.",
  "My preferred method of collaboration is through regular communication, active listening, and leveraging collaborative tools for efficient teamwork.",
  "I handled a difficult client situation by actively listening, understanding their concerns, and finding a mutually beneficial solution to their problems.",
  "I maintain my work-life balance by setting boundaries, prioritizing self-care, and managing time efficiently.",
  "I ensure quality and accuracy in my work by double-checking information, seeking feedback, and following established processes and guidelines.",
]; */

/* const Prompt = [
  {
    question:"About yourself?",
    type:"Personnal",
  },
  {
    question:"What motivated you?",
    type:"Personnal",
  },
  {
    question:"Describe a challenging situation or project?",
    type:"Situation",
  },
  {
    question:"What is your approach for continous learning, profession et developement?",
    type:"Education",
  },
  {
    question:"What is this portfolio?",
    type:"Other",
  },
  {
    question:"What experience do you have?",
    type:"Work",
  },
  {
    question:"Is there more about your project?",
    type:"Education",
  },  
  {
    question:"What are your strength and weakness?",
    type:"Personnal",
  },
  {
    question:"Can you share a succes?",
    type:"Personnal",
  },
  {
    question:"About your education?",
    type:"Education",
  },
  {
    question:"What inspire you?",
    type:"Personnal",
  },
  {
    question:"What are the skill you use to make your project succesfull?",
    type:"Personnal",
  },
  {
    question:"What is your problem-solving approach?",
    type:"Personnal",
  },
  {
    question:"What are your communication skill?",
    type:"Personnal",
  },
  {
    question:"What is for you a good leadership?",
    type:"Personnal",
  },
  {
    question:"What is your preferred programming languages?",
    type:"Personnal",
  },
  {
    question:"What is your project management?",
    type:"Personnal",
  },
  {
    question:"Does you work with data and do you analyse this data?",
    type:"Work",
  },
  {
    question:"Does you have a customer philosophy?",
    type:"Work",
  },
  {
    question:"Does you have some goals in your life?",
    type:"Personnal",
  },
  {
    question:"Can you accept teamwork in your life?",
    type:"Work",
  },
  {
    question:"What is your approach to learning new technologies?",
    type:"Education",
  },
  {
    question:"Can you work on tight deadlines?",
    type:"Work",
  },
  {
    question:"How did you resolve a conflict with your team?",
    type:"Work",
  },
  {
    question:"How do you stay motivated or productive?",
    type:"Personnal",
  },  
  {
    question:"Describe a time where you have solve problem?",
    type:"Work",
  },
  {
    question:"How do you manage your work schedule?",
    type:"Personnal",
  },
  {
    question:"How do you handle difficult clients?",
    type:"Work",
  },
  {
    question:"What is your work ethic?",
    type:"Work",
  },
  {
    question:"What are your time management skills?",
    type:"Personnal",
  },
  {
    question:"How do you handle stressfull situations?",
    type:"Personnal",
  },
  {
    question:"What is your preferred method of communication?",
    type:"Personnal",
  },
  {
    question:"What is your approach to creativity?",
    type:"Personnal",
  },
  {
    question:"How do you handle feedback and criticism?",
    type:"Personnal",
  },
  {
    question:"How do you balance between multiple projects?",
    type:"Personnal",
  },
  {
    question:"How do you overcome challenges in your career?",
    type:"Personnal",
  },
  {
    question:"What is your favorite hobbies?",
    type:"Personnal",
  },
  {
    question:"What have you learn at school?",
    type:"Education",
  },
  {
    question:"What are your skill?",
    type:"Personnal",
  },
  {
    question:"What are your core values?",
    type:"Personnal",
  },
  {
    question:"Tell me a time when you have adapt to a unexpected circumstances?",
    type:"Personnal",
  },
  {
    question:"What is your preferred method of collaboration?",
    type:"Personnal",
  },
  {
    question:"Describe a difficult client situation?",
    type:"Work",
  },
  {
    question:"How does you maintain the balance of your work-life to prevent burnout?",
    type:"Personnal",
  },
  {
    question:"What steps does you take to improve quality and accuracy of your work?",
    type:"Personnal",
  },
]

export { Question, Responses, Prompt }; */