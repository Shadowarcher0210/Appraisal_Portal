// // appraisalData.js

// export const instructionsList = [
//     "You fill your appraisal and submit to your manager.",
//     "Your manager fills their comments and ratings for your appraisal and submits to HR.",
//     "HR finalizes your appraisal.",
//     "Your manager discusses the appraisal with you and submits for your acceptance.",
//     "You accept the appraisal to close the process for this year.",
//   ];
  
//   export const impInstructions = [
//     "It is mandatory to provide ratings and comments against all Competencies in the Competency Form and Goals in the Goal Sheet form. These ratings help you in defining your achievements as also help your manager in entering in ratings and comments while filling up your appraisal.",
//     "As a good practice, go through all the forms and understand what data is required to be filled in. While you can complete the appraisal in multiple sittings, it may be a good idea to collect all the details prior to your starting to fill in the forms.",
//   ];
  
//   export const questionsAndAnswers = [
//     { question: "Adaptability", answer: "I am very adaptable." },
//     { question: "Collaboration", answer: "I work well with others." },
//     { question: "Problem Solving", answer: "I solve problems efficiently." },
//     { question: "Communication", answer: "I communicate effectively." },
//     { question: "Leadership", answer: "I take initiative in team projects." },
//     { question: "Technical Skills", answer: "I excel at coding." },
//     { question: "Time Management", answer: "I manage time effectively." },
//     { question: "Teamwork", answer: "I value teamwork and cooperation." },
//     { question: "Creativity", answer: "I think outside the box." },
//     { question: "Client Interaction", answer: "I engage well with clients." },
//   ];
  
//   export const goalsResponse = [
//     {
//       question: "Performance Improvement",
//       answer: "Implemented time management techniques to boost my productivity.",
//     },
//     {
//       question: "Skill Development",
//       answer: "Pursued a project management certification that enhanced my planning and organizational skills.",
//     },
//     {
//       question: "Collaboration and Teamwork",
//       answer: "Worked closely with colleagues on a cross-departmental project, leading to improved outcomes.",
//     },
//     {
//       question: "Leadership and Initiative",
//       answer: "Led a team initiative that increased project efficiency and fostered teamwork.",
//     },
//     {
//       question: "Customer Satisfaction",
//       answer: "Actively sought customer feedback and made adjustments to improve service quality.",
//     },
//     {
//       question: "Project Management",
//       answer: "Successfully managed the launch of a new product by coordinating with various stakeholders.",
//     },
//     {
//       question: "Work-Life Balance",
//       answer: "Established clear boundaries for work hours, allowing time for personal activities and relaxation.",
//     },
//     {
//       question: "Innovation and Creativity",
//       answer: "Introduced a new workflow process that streamlined operations and reduced turnaround time.",
//     },
//   ];
  

// appraisalData.js

const data = {
    instructionsList: [
      "You fill your appraisal and submit to your manager.",
      "Your manager fills their comments and ratings for your appraisal and submits to HR.",
      "HR finalizes your appraisal.",
      "Your manager discusses the appraisal with you and submits for your acceptance.",
      "You accept the appraisal to close the process for this year.",
    ],
    impInstructions: [
      "It is mandatory to provide ratings and comments against all Competencies in the Competency Form and Goals in the Goal Sheet form. These ratings help you in defining your achievements as also help your manager in entering in ratings and comments while filling up your appraisal.",
      "As a good practice, go through all the forms and understand what data is required to be filled in. While you can complete the appraisal in multiple sittings, it may be a good idea to collect all the details prior to your starting to fill in the forms.",
    ],
    questionsAndAnswers: [
      { question: "Adaptability", answer: "I am very adaptable." },
      { question: "Collaboration", answer: "I work well with others." },
      { question: "Problem Solving", answer: "I solve problems efficiently." },
      { question: "Communication", answer: "I communicate effectively." },
      { question: "Leadership", answer: "I take initiative in team projects." },
      { question: "Technical Skills", answer: "I excel at coding." },
      { question: "Time Management", answer: "I manage time effectively." },
      { question: "Teamwork", answer: "I value teamwork and cooperation." },
      { question: "Creativity", answer: "I think outside the box." },
      { question: "Client Interaction", answer: "I engage well with clients." },
    ],
    goalsResponse: [
      {
        question: "Performance Improvement",
        answer: "Implemented time management techniques to boost my productivity.",
      },
      {
        question: "Skill Development",
        answer: "Pursued a project management certification that enhanced my planning and organizational skills.",
      },
      {
        question: "Collaboration and Teamwork",
        answer: "Worked closely with colleagues on a cross-departmental project, leading to improved outcomes.",
      },
      {
        question: "Leadership and Initiative",
        answer: "Led a team initiative that increased project efficiency and fostered teamwork.",
      },
      {
        question: "Customer Satisfaction",
        answer: "Actively sought customer feedback and made adjustments to improve service quality.",
      },
      {
        question: "Project Management",
        answer: "Successfully managed the launch of a new product by coordinating with various stakeholders.",
      },
      {
        question: "Work-Life Balance",
        answer: "Established clear boundaries for work hours, allowing time for personal activities and relaxation.",
      },
      {
        question: "Innovation and Creativity",
        answer: "Introduced a new workflow process that streamlined operations and reduced turnaround time.",
      },
    ],
  };
  
  export default data;
  
  // If you need to export any item individually
  export const { instructionsList, impInstructions, questionsAndAnswers, goalsResponse } = data;
  