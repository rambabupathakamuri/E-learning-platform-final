// Updated script.js with improved role-based visibility, navigation, interaction features, and modal popups

// On window load, hide all sections initially and add tooltips
window.onload = function () {
    hideAllSections();
    addNavigationTooltips(); // Add tooltips to navigation links
};

// Function to hide all sections at the start or upon logout
function hideAllSections() {
    document.getElementById('courses').style.display = 'none';
    document.getElementById('assignments').style.display = 'none';
    document.getElementById('instructor-tools').style.display = 'none';
    document.getElementById('studentManagementSection').style.display = 'none';
    document.getElementById('announcementSection').style.display = 'none';
    document.getElementById('quizManagementSection').style.display = 'none';
    document.getElementById('gradeAssignments').style.display = 'none';
    document.getElementById('quizArea').style.display = 'none';
}

// Setting up user roles
function setRole() {
    hideAllSections(); // Hide all sections at first

    // Determine role and display appropriate sections
    const role = document.getElementById('roleSelect').value;

    if (role === 'student') {
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('quizManagementSection').style.display = 'block';
    } else if (role === 'instructor') {
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('courses').style.display = 'block';
        document.getElementById('instructor-tools').style.display = 'block';
        document.getElementById('studentManagementSection').style.display = 'block';
        document.getElementById('announcementSection').style.display = 'block';
        document.getElementById('quizManagementSection').style.display = 'block';
        loadAssignmentsForGrading(); // Load assignments for grading
    } else if (role === 'admin') {
        document.getElementById('courses').style.display = 'block';
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('announcementSection').style.display = 'block';
    }

    showLogoutButton(); // Show the logout button

    // Scroll to the first visible section and show modal alert for login
    document.getElementById('assignments').scrollIntoView({ behavior: 'smooth' });
    alertModal(`Logged in as ${role}`);
}

// Function to highlight the active navigation item
function setActiveNav(sectionId) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`nav ul li a[href="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Scroll to section when navigation link is clicked
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveNav(sectionId);
    }
}

// Logout function to reset the view
function logout() {
    hideAllSections();
    document.getElementById('roleSelect').value = 'student';
    document.getElementById('logoutButton').style.display = 'none';
    alertModal('Logged out successfully');
}

// Show the logout button after login
function showLogoutButton() {
    const logoutButton = document.getElementById('logoutButton');
    if (!logoutButton) {
        const button = document.createElement('button');
        button.id = 'logoutButton';
        button.textContent = 'Logout';
        button.onclick = logout;
        document.querySelector('header').appendChild(button);
    } else {
        logoutButton.style.display = 'block';
    }
}

// Modal alert function to enhance user feedback
function alertModal(message) {
    let modal = document.createElement('div');
    modal.className = 'modal';
    let modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `<p>${message}</p><button onclick="closeModal()">Close</button>`;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

// Close modal function
function closeModal() {
    document.querySelector('.modal').remove();
}

// Add tooltips to navigation links to improve usability
function addNavigationTooltips() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.title = `Go to ${link.innerText}`;
    });
}

// Script for managing assignment submissions
function submitAssignment() {
    const assignmentFile = document.getElementById('assignmentFile').files[0];
    if (!assignmentFile) {
        document.getElementById('assignmentMessage').innerText = "Please upload a file before submitting.";
    } else {
        if (validateFile(assignmentFile)) {
            document.getElementById('assignmentMessage').innerText = "Assignment submitted successfully!";
        } else {
            document.getElementById('assignmentMessage').innerText = "Invalid file format.";
        }
    }
}

// Simple validation function to check file types
function validateFile(file) {
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

// Function to show course creation form
function createCourse() {
    document.getElementById('newCourseForm').style.display = 'block';
}

// Function to add a course to the courses list
function addCourse() {
    const newCourseTitle = document.getElementById('newCourseTitle').value;
    if (newCourseTitle) {
        const coursesList = document.getElementById('courses-list');
        const newCourseElement = document.createElement('div');
        newCourseElement.innerText = newCourseTitle;
        coursesList.appendChild(newCourseElement);
        document.getElementById('newCourseForm').style.display = 'none';
        document.getElementById('newCourseTitle').value = '';
    } else {
        alert("Course title cannot be empty");
    }
}

// Managing students - adding and removing from the list
let students = [];

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    if (studentName) {
        students.push(studentName);
        updateStudentList();
        document.getElementById('studentName').value = '';
    } else {
        alert("Please enter a student's name.");
    }
}

function removeStudent() {
    const studentName = document.getElementById('studentName').value;
    const index = students.indexOf(studentName);
    if (index > -1) {
        students.splice(index, 1);
        updateStudentList();
        document.getElementById('studentName').value = '';
    } else {
        alert("Student not found.");
    }
}

function updateStudentList() {
    const studentList = document.getElementById('students');
    studentList.innerHTML = '';
    students.forEach((student) => {
        const li = document.createElement('li');
        li.innerText = student;
        studentList.appendChild(li);
    });
}

// Managing announcements - posting and displaying them
let announcements = [];

function postAnnouncement() {
    const announcementText = document.getElementById('announcementText').value;
    if (announcementText) {
        announcements.push(announcementText);
        updateAnnouncements();
        document.getElementById('announcementText').value = '';
    } else {
        alert("Please enter an announcement.");
    }
}

function updateAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    announcementList.innerHTML = '';
    announcements.forEach((announcement) => {
        const li = document.createElement('li');
        li.innerText = announcement;
        announcementList.appendChild(li);
    });
}

// Manage grading - grading assignments
function loadAssignmentsForGrading() {
    const gradeAssignmentsDiv = document.getElementById('gradeAssignments');
    if (gradeAssignmentsDiv) {
        const assignment = document.createElement('div');
        assignment.innerHTML = `
            <p>Student ID: 123 - Assignment: "Math Homework"</p>
            <input type="text" id="gradeInput" placeholder="Enter grade">
            <button onclick="gradeAssignment(123, 1, document.getElementById('gradeInput').value)">Grade</button>
        `;
        gradeAssignmentsDiv.appendChild(assignment);
        gradeAssignmentsDiv.style.display = 'block';
    }
}

function gradeAssignment(studentID, assignmentID, grade) {
    alert(`Assignment graded for student ${studentID} with grade: ${grade}`);
}

// Quiz Management - adding questions and taking quizzes
let quizQuestions = [];
let currentQuestionIndex = 0;

function addQuizQuestion() {
    const quizQuestion = document.getElementById('quizQuestion').value;
    if (quizQuestion) {
        quizQuestions.push(quizQuestion);
        updateQuizQuestions();
        document.getElementById('quizQuestion').value = '';
    } else {
        alert("Please enter a quiz question.");
    }
}

function updateQuizQuestions() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    quizQuestions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${question}`;
        questionList.appendChild(li);
    });
}

function startQuiz() {
    if (quizQuestions.length > 0) {
        currentQuestionIndex = 0;
        document.getElementById('quizArea').style.display = 'block';
        displayQuestion();
    } else {
        alert("No quiz questions available. Please add questions first.");
    }
}

function displayQuestion() {
    const questionDiv = document.getElementById('currentQuestion');
    questionDiv.innerText = quizQuestions[currentQuestionIndex];
}

function submitAnswer() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        alert("Quiz Completed!");
        document.getElementById('quizArea').style.display = 'none';
    }
}
