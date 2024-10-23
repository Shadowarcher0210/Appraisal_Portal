// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   instructionsList,
//   impInstructions,
//   questionsAndAnswers,
//   goalsResponse,
// } from "./appraisalQuestions";

// import IntroductionTab from "../Tabs/introductionTab";
// import SelfAppraisalTab from "../Tabs/selfAppraisalTab";
// import GoalsTab from "../Tabs/goalsTab";

// const TABS = ["Introduction", "Self Appraisal", "Goal"];

// const EmpForm = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [weights, setWeights] = useState(Array(15).fill(0));
//   const [notes, setNotes] = useState(Array(15).fill(""));
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selfAppraisalPage, setSelfAppraisalPage] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState(0);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
//   const location = useLocation();
//   const { timePeriod } = location.state || {};

//   const updateWeight = (index, percentage) => {
//     const newWeights = [...weights];
//     newWeights[index] = percentage;
//     setWeights(newWeights);
//   };

//   const saveNotes = (index, data) => {
//     const newNotes = [...notes];
//     newNotes[index] = data;
//     setNotes(newNotes);
//   };

//   const handleContinue = () => {
//     if (activeTab === 1 && selfAppraisalPage === 0) {
//       setSelfAppraisalPage(1);
//     } else if (activeTab < TABS.length - 1) {
//       setActiveTab(activeTab + 1);
//       setSelfAppraisalPage(0);
//       setCompletedSteps(Math.max(completedSteps, activeTab + 1));
//     }
//   };

//   const handlePreviousForm = () => {
//     if (selfAppraisalPage > 0) {
//       setSelfAppraisalPage(selfAppraisalPage - 1);
//     } else if (activeTab > 0) {
//       setActiveTab(activeTab - 1);
//     }
//   };
//   const userDetails = async () => {
//     const userId = localStorage.getItem("userId");
//     console.log("Retrieved userId:", userId);

//     if (userId) {
//       try {
//         const response = await axios.get(
//           `http://localhost:3003/all/details/${userId}`
//         );
//         setEmail(response.data.user.email);
//         console.log("email", response.data.user.email);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     } else {
//       console.log("User ID not found in local storage.");
//     }
//   };
//   useEffect(() => {
//     console.log("useEffect called to fetch user details");

//     userDetails();
//   }, []);
//   const handleSubmit = async () => {
//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("No token found. Please log in.");
//       return;
//     }
//     const pageData = [
//       {
//         questionId: 1,
//         question:
//           "Job-Specific Knowledge: I possess and apply the expertise, experience, and background to achieve solid results.",
//         answer: getAnswerFromWeight(weights[0]),
//       },
//       {
//         questionId: 2,
//         question: "I work effectively and efficiently.",
//         answer: getAnswerFromWeight(weights[1]),
//       },
//       {
//         questionId: 3,
//         question:
//           "Job-Specific Skills: I demonstrate the aptitude and competence to carry out my job responsibilities.",
//         answer: getAnswerFromWeight(weights[2]),
//       },
//     ];
//     try {
//       const response = await fetch(
//         `http://localhost:3003/form/saveDetails/${userId}/${timePeriod[0]}/${timePeriod[1]}`,
//         {
//           method: "POST",
//           headers: {
//             "content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ pageData }),
//         }
//       );
//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message);
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("An error occurred while submitting the form.");
//     }
//     setIsModalOpen(true);
//   };
//   const getAnswerFromWeight = (weight) => {
//     switch (weight) {
//       case 20:
//         return "Strongly Disagree";
//       case 40:
//         return "Somewhat Disagree";
//       case 60:
//         return "Agree";
//       case 80:
//         return "Somewhat Agree";
//       case 100:
//         return "Strongly Agree";
//       default:
//         return "No Response";
//     }
//   };
//   const handleConfirmSubmit = async () => {
//     setIsModalOpen(false);
//     setIsThankYouModalOpen(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       const emailresponse = await fetch(
//         `http://localhost:3003/confirmationEmail/email`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//           }),
//         }
//       );
//       const emailData = await emailresponse.json();
//       console.log(emailData.message);

//       const userId = localStorage.getItem("userId");

//       const response = await axios.put(
//         `http://localhost:3003/form/status/${userId}/${timePeriod[0]}/${timePeriod[1]}`,
//         { status: "Submitted" }
//       );

//       if (response.status === 200) {
//         console.log("Status updated Successfully :", response.data);
//       } else {
//         console.error("Failed to update status :", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     } finally {
//       // Optionally reopen the modal or perform any cleanup
//       setIsModalOpen(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     // navigate('/employee-dashboard');
//   };
//   const closeThankYouModal = () => {
//     setIsThankYouModalOpen(false);
//     navigate("/employee-dashboard");
//   };

//   return (
//     <div className="flex h-screen ml-24 mt-16">
//       <div className="w-48 h-full bg-gray-100 p-4 fixed">
//         <h2 className="text-lg font-bold mb-6">Forms</h2>
//         <ul>
//           {TABS.map((tab, index) => (
//             <li key={index}>
//               <button
//                 className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
//                   activeTab === index
//                     ? "bg-blue-500 text-white"
//                     : index <= completedSteps
//                     ? "bg-white hover:bg-gray-200"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//                 onClick={() => {
//                   if (index <= completedSteps) {
//                     setActiveTab(index);
//                     setSelfAppraisalPage(0);
//                     // } else {
//                     //   alert('Please complete the current section before proceeding.');
//                   }
//                 }}
//                 disabled={index > completedSteps}
//               >
//                 {tab}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="flex-1 p-8 ml-44">
//         <div className="border p-4 rounded shadow-lg">
//           {activeTab === 0 && (
//             <IntroductionTab
//               handlePreviousForm={handlePreviousForm}
//               handleContinue={handleContinue}
//               instructionsList={instructionsList}
//               impInstructions={impInstructions}
//             />
//           )}
//           {activeTab === 1 && (
//             <SelfAppraisalTab
//               selfAppraisalPage={selfAppraisalPage}
//               updateWeight={updateWeight}
//               saveNotes={saveNotes}
//               handlePreviousForm={handlePreviousForm}
//               handleContinue={handleContinue}
              
//             />
//           )}
//           {activeTab === 2 && (
//             <GoalsTab
//               goalsResponse={goalsResponse}
//               handlePreviousForm={handlePreviousForm}
//               handleSubmit={handleSubmit}
//             />
//           )}
//         </div>
//      </div>
//     </div>
//   );
// };

// export default EmpForm;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  instructionsList,
  impInstructions,
  questionsAndAnswers,
  goalsResponse,
} from "./appraisalQuestions";
import IntroductionTab from "../Tabs/introductionTab";
import SelfAppraisalTab from "../Tabs/selfAppraisalTab";
import GoalsTab from "../Tabs/goalsTab";

const TABS = ["Introduction", "Self Appraisal", "Goals"];

const EmpForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [weights, setWeights] = useState(Array(15).fill(0));
  const [notes, setNotes] = useState(Array(15).fill(""));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selfAppraisalPage, setSelfAppraisalPage] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const location = useLocation();
  const { timePeriod } = location.state || {};

  const updateWeight = (index, percentage) => {
    const newWeights = [...weights];
    newWeights[index] = percentage;
    setWeights(newWeights);
  };

  const saveNotes = (index, data) => {
    const newNotes = [...notes];
    newNotes[index] = data;
    setNotes(newNotes);
  };

  const handleContinue = () => {
    if (activeTab === 1 && selfAppraisalPage === 0) {
      setSelfAppraisalPage(1);
    } else if (activeTab < TABS.length - 1) {
      setActiveTab(activeTab + 1);
      setSelfAppraisalPage(0);
      setCompletedSteps(Math.max(completedSteps, activeTab + 1));
    }
  };

  const handlePreviousForm = () => {
    if (selfAppraisalPage > 0) {
      setSelfAppraisalPage(selfAppraisalPage - 1);
    } else if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const userDetails = async () => {
    const userId = localStorage.getItem("userId");
    console.log("Retrieved userId:", userId);

    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3003/all/details/${userId}`
        );
        setEmail(response.data.user.email);
        console.log("email", response.data.user.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    } else {
      console.log("User ID not found in local storage.");
    }
  };

  useEffect(() => {
    console.log("useEffect called to fetch user details");
    userDetails();
  }, []);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
    const pageData = [
      {
        questionId: 1,
        question:
          "Job-Specific Knowledge: I possess and apply the expertise, experience, and background to achieve solid results.",
        answer: getAnswerFromWeight(weights[0]),
      },
      {
        questionId: 2,
        question: "I work effectively and efficiently.",
        answer: getAnswerFromWeight(weights[1]),
      },
      {
        questionId: 3,
        question:
          "Job-Specific Skills: I demonstrate the aptitude and competence to carry out my job responsibilities.",
        answer: getAnswerFromWeight(weights[2]),
      },
    ];
    try {
      const response = await fetch(
        `http://localhost:3003/form/saveDetails/${userId}/${timePeriod[0]}/${timePeriod[1]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pageData }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
    setIsModalOpen(true);
  };

  const getAnswerFromWeight = (weight) => {
    switch (weight) {
      case 20:
        return "Strongly Disagree";
      case 40:
        return "Somewhat Disagree";
      case 60:
        return "Agree";
      case 80:
        return "Somewhat Agree";
      case 100:
        return "Strongly Agree";
      default:
        return "No Response";
    }
  };

  const handleConfirmSubmit = async () => {
    setIsModalOpen(false);
    setIsThankYouModalOpen(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const emailresponse = await fetch(
        `http://localhost:3003/confirmationEmail/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const emailData = await emailresponse.json();
      console.log(emailData.message);

      const userId = localStorage.getItem("userId");

      const response = await axios.put(
        `http://localhost:3003/form/status/${userId}/${timePeriod[0]}/${timePeriod[1]}`,
        { status: "Submitted" }
      );

      if (response.status === 200) {
        console.log("Status updated Successfully :", response.data);
      } else {
        console.error("Failed to update status :", response.statusText);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      // Optionally reopen the modal or perform any cleanup
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // navigate('/employee-dashboard');
  };
  
  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false);
    navigate("/employee-dashboard");
  };

  return (
    <div className="flex h-screen ml-24 mt-16">
      <div className="w-48 h-full bg-gray-100 p-4 fixed">
        <h2 className="text-lg font-bold mb-6">Forms</h2>
        <ul>
          {TABS.map((tab, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-4 py-2 mb-2 rounded-lg ${
                  activeTab === index
                    ? "bg-blue-500 text-white"
                    : index <= completedSteps
                    ? "bg-white hover:bg-gray-200"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (index <= completedSteps) {
                    setActiveTab(index);
                    setSelfAppraisalPage(0);
                  }
                }}
                disabled={index > completedSteps}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8 ml-44">
        <div className="border p-4 rounded shadow-lg">
          {activeTab === 0 && (
            <IntroductionTab
              handlePreviousForm={handlePreviousForm}
              handleContinue={handleContinue}
              instructionsList={instructionsList}
              impInstructions={impInstructions}
            />
          )}
          {activeTab === 1 && (
            <SelfAppraisalTab
              selfAppraisalPage={selfAppraisalPage}
              weights={weights} // Pass the weights to SelfAppraisalTab
              notes={notes} // Pass the notes to SelfAppraisalTab
              updateWeight={updateWeight}
              saveNotes={saveNotes}
              handlePreviousForm={handlePreviousForm}
              handleContinue={handleContinue}
              questionsAndAnswers={questionsAndAnswers}
            />
          )}
          {activeTab === 2 && (
            <GoalsTab
              goalsResponse={goalsResponse}
              handlePreviousForm={handlePreviousForm}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpForm;
