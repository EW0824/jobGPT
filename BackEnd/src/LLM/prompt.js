


export const COVER_LETTER_PROMPT = `

Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me. My name is {name}, with email {email}.

I am applying to work at {company} as a {position}. Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience which are relevant to the job, and explain why I am a great fit for the position using information from the job description. Also highlight my skills: '{skills}' when you see fit! Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!

Please only output the cover letter and nothing else.
`;



const COVER_LETTER_PROMPT_FULL = `

Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me. Here's information about me:

--------
name: {name}
email: {email}
phoneNumber: {phoneNumber}
--------

My experiences and skills:
--------
{experiences}
{skills}
--------

I am applying to work at {company} as a {position} with the following job description:
--------
{jobDescription}
--------

Please use information about what recruiters like to write a perfect cover letter. Make sure to highlight my experience and skills which are relevant to the job, and explain why I am a great fit for the position. Please keep it engaging, persuasive, and also professional. Keep it short, within {wordLimit} words. Thanks a lot for your help!
`;

// const PROMPT = 
// `
// Hope you are doing well! You are a recruiter at a large company with experience reading and writing cover letters. I need your help crafting a perfect letter for me. My name is {name}, with email address {email}.

// I am applying to {company} for the role {position}.

// Beside my resume and experiences, I also have the following skills:
// --------
// {skills}
// --------

// The following lists the skills and experiences that I have. Please use these information along with 

// Please thoroughly analyze the content below and select the skills and experiences that you reckon to be relevant for the application of this role.


// `


// export default generate_cover_letter_prompt = ({skills, experiences}) => {

//     const intorduction = ``

//     const company_section = ``

//     const skills_and_experiences = ``

//     const get_skills_and_experiences_prompt = (skills, experiences) => {
//       const skills_string = `Skills: \n` + skills.map((skill, idx) => {
//         return `${idx}.${skill}`
//       }).join('\n')

//       const experiences_string = `Experiences: \n` + experiences.map((experience, idx) => {
//         return `${idx}.${experience.jobTitle} at ${experience.company}: ${experience.jobDescription}`
//       }).join('\n')

//       return [skills_string, experiences_string].join('\n')
//     }

//     const skills_and_experiences_detail = get_skills_and_experiences_prompt(skills, experiences)

//     const ending = `According to the provided experiences, skills, and job description, please generate an individualized cover letter with a word limit of {wordLimist}. Please ONLY display the content of the generated cover letter in your response.`
  
//     return [intorduction, company_section, skills_and_experiences, skills_and_experiences_detail, ending].join('\n')
// }