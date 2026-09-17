export interface Experience {
  period: string
  role: string
  company: string
  description: string
}

export interface Education {
  period: string
  course: string
  school: string
}

export interface Profile {
  name: string
  title: string
  location: string
  summary: string
  linkedinUrl: string
  cvUrl: string
  skills: string[]
  experience: Experience[]
  education: Education[]
}

export const profile: Profile = {
  name: 'Joakim Månsson',
  title: 'Digital builder with a curious mind',
  location: 'Sweden',
  summary: 'A practical, people-focused professional who enjoys turning ideas into clear digital experiences and useful results.',
  linkedinUrl: 'https://www.linkedin.com/in/joakim-m%C3%A5nsson-%F0%9F%92%BB%F0%9F%A5%B7-0186a957/',
  cvUrl: `${import.meta.env.BASE_URL}CV_260618_SE_Swedish.pdf`,
  skills: ['Communication', 'Problem solving', 'Digital tools', 'Project work', 'Teamwork', 'Adaptability'],
  experience: [
    {
      period: 'Professional experience',
      role: 'See the complete profile',
      company: 'LinkedIn',
      description: 'Explore Joakim’s latest roles, projects, and professional connections on LinkedIn.',
    },
  ],
  education: [
    {
      period: 'Education & certifications',
      course: 'Full background available in the CV',
      school: 'Download the Swedish CV for the complete record.',
    },
  ],
}