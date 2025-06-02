// ==UserScript==
// @name        lesscombz
// @namespace   Violentmonkey Scripts
// @match       *://scombz.shibaura-it.ac.jp/*
// @grant       none
// @version     1.0
// @author      2gn
// @description declutter ScombZ to reduce distractions
// ==/UserScript==

const HOME_URL = "https://scombz.shibaura-it.ac.jp/portal/home"
const TASKS_URL = "https://scombz.shibaura-it.ac.jp/lms/task"
const TIMETABLE_URL = "https://scombz.shibaura-it.ac.jp/lms/timetable"
const GMAIL_URL = "https://mail.google.com"
const TEAMS_URL = "https://teams.microsoft.com";
const victims_id = [
  "top_information3",
  "sidemenu",
  "top_questionnaire",
  "top_banner",
  "top_notice",
  "page_foot",
  "page_head"
]

const victims_class = [
  "login-view",
  "page-directlink"
]


// automatically redirect to tasks
if (window.location.href == HOME_URL) {
  window.location.href = TASKS_URL;
}

// add course link to tasks

function taskLinkToCourseLink(task_url) {
  // /lms/course/report/submission?idnumber=202503SU0119801001&reportId=20053495
  // /lms/course?idnumber=202503SU0119801001&reportId=20053495
  return task_url.replace("/report/submission", "");

}

let task_urls = Array.from(document.querySelectorAll("div.result_list_line > div:nth-child(2) > a:nth-child(1)"));

task_urls.forEach((element) => {
  const _url = taskLinkToCourseLink(element.href);
  const task_name_element = element.parentElement.parentElement.children[0];
  const task_name = task_name_element.innerText;
  task_name_element.innerText = ""
  const urlElement = document.createElement("a")
  urlElement.href = _url;
  urlElement.innerText = task_name;
  task_name_element.appendChild(urlElement);

})



// disable animations
const style = document.createElement('style');
style.innerHTML = `
  * {
    animation: none !important;
    transition: none !important;
  }
`;
document.head.appendChild(style);

// remove various unnecessary elements

victims_id.forEach((victim) => {
  try {
    document.getElementById(victim).style.display = "none";
  } catch {}
})

victims_class.forEach((victim) => {
  try {
    document.getElementsByClassName(victim)[0].style.display = "none";
  } catch {}
})

// // patch to remove course header when course page is opened
if (! window.location.href.includes("report")) {
  try {
    document.getElementsByClassName("course-header")[0].style.display = "none";
  } catch {}
}

// modifying pageMain

const pageMain = document.getElementById("pageMain")

// // center pageMain
pageMain.style.left = "100px";

// // background to white
pageMain.style.background = "#ffffff"


// header customization

const header = document.getElementById("global-header")

const links = [
  { text: "課題", url: TASKS_URL, new_tab: false },
  { text: "時間割", url: TIMETABLE_URL, new_tab: false },
  { text: "Teams", url: TEAMS_URL, new_tab: true},
  { text: "メール", url: GMAIL_URL, new_tab: true },
];

const ul = document.createElement("ul");
ul.style.display = "flex";
ul.style.listStyleType = "none";
ul.style.padding = "10px";
ul.style.margin = "0";
ul.style.justifyContent = "center"; // Center the ul


links.forEach((link) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  li.style.padding = "20px";
  li.style.fontSize = "30px";
  li.style.margin = "0 15px"; // Add spacing between list items
  li.style.borderRadius = "5px"; // Rounded corners for list items
  li.style.backgroundColor = "#f0f0f0"; // Light gray background for list items
  li.style.transition = "background-color 0.3s, transform 0.3s"; // Smooth hover effect

  a.textContent = link.text;
  a.href = link.url;
  if (link.new_tab) {
    a.target = "_blank"; // Open the URL in a new tab
  }
  li.appendChild(a);
  ul.appendChild(li);

});

header.appendChild(ul);


// enlarge Text

document.body.style.fontSize = "20px";

document.addEventListener('DOMContentLoaded', function () {
  let qlcontainers = Array.from(document.getElementsByClassName("ql-container"));
  qlcontainers.forEach((container) => {
  container.style.fontSize = "20px";
  })
});


