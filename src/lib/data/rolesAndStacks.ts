// lib/rolesAndStacks.ts

export const roles = [
  {
    label: 'Desarrollo',
    options: [
      { label: 'Frontend Developer', value: 'Frontend Developer' },
      { label: 'Backend Developer', value: 'Backend Developer' },
      { label: 'Full Stack Developer', value: 'Full Stack Developer' },
      { label: 'Mobile Developer', value: 'Mobile Developer' },
      { label: 'DevOps Engineer', value: 'DevOps Engineer' },
      { label: 'QA Engineer', value: 'QA Engineer' },
      { label: 'Software Engineer', value: 'Software Engineer' },
      { label: 'Tech Lead', value: 'Tech Lead' },
      { label: 'Engineering Manager', value: 'Engineering Manager' },
      { label: 'Cloud Engineer', value: 'Cloud Engineer' },
      { label: 'Embedded Systems Developer', value: 'Embedded Systems Developer' },
    ],
  },
  {
    label: 'Diseño',
    options: [
      { label: 'UI Designer', value: 'UI Designer' },
      { label: 'UX Designer', value: 'UX Designer' },
      { label: 'Product Designer', value: 'Product Designer' },
      { label: 'Design Lead', value: 'Design Lead' },
      { label: 'Graphic Designer', value: 'Graphic Designer' },
      { label: 'Interaction Designer', value: 'Interaction Designer' },
      { label: 'Motion Designer', value: 'Motion Designer' },
    ],
  },
  {
    label: 'Producto',
    options: [
      { label: 'Product Manager', value: 'Product Manager' },
      { label: 'Product Owner', value: 'Product Owner' },
      { label: 'Technical Product Manager', value: 'Technical Product Manager' },
      { label: 'Growth Product Manager', value: 'Growth Product Manager' },
    ],
  },
  {
    label: 'Datos',
    options: [
      { label: 'Data Analyst', value: 'Data Analyst' },
      { label: 'Data Scientist', value: 'Data Scientist' },
      { label: 'Data Engineer', value: 'Data Engineer' },
      { label: 'Machine Learning Engineer', value: 'Machine Learning Engineer' },
      { label: 'AI Engineer', value: 'AI Engineer' },
    ],
  },
  {
    label: 'Infraestructura y soporte',
    options: [
      { label: 'System Administrator', value: 'System Administrator' },
      { label: 'IT Support Specialist', value: 'IT Support Specialist' },
      { label: 'Security Engineer', value: 'Security Engineer' },
      { label: 'Network Engineer', value: 'Network Engineer' },
    ],
  },
  {
    label: 'Otros',
    options: [
      { label: 'Scrum Master', value: 'Scrum Master' },
      { label: 'Project Manager', value: 'Project Manager' },
      { label: 'Business Analyst', value: 'Business Analyst' },
      { label: 'CTO', value: 'CTO' },
      { label: 'Technical Writer', value: 'Technical Writer' },
    ],
  },
];

export const stacks = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Nuxt.js', 'Angular',
  'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'Flask', 'Ruby on Rails',
  'Java', 'Spring Boot', 'Kotlin', 'Swift', 'Objective-C', 'Flutter', 'React Native',
  'PHP', 'Laravel', 'Go', 'Rust', 'C#', '.NET', 'C++', 'SQL', 'PostgreSQL', 'MySQL',
  'MongoDB', 'Firebase', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
  'GraphQL', 'REST API', 'SASS/SCSS', 'Tailwind CSS', 'Bootstrap', 'Jest', 'Cypress',
  'Playwright', 'Jenkins', 'GitHub Actions', 'Figma', 'Framer', 'TensorFlow', 'PyTorch',
  'Pandas', 'dbt', 'Looker', 'Power BI', 'Tableau',
].map(tech => ({ label: tech, value: tech }));