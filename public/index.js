//https redirect
if (window.location.href.startsWith("http:") && window.location.hostname !== "localhost") {
   window.location.href = window.location.href.replace("http:", "https:");
}

//Wiki Query
let input = document.getElementById("query");
let submit = document.getElementById("submit");
let result = document.getElementById("result");
let resultImage = document.getElementById("resultImage");

submit.onclick = async event => {
   event.preventDefault();
   result.textContent = "Loading...";
   resultImage.src = "";
   let query = input.value;
   let fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
   };
   let send = await fetch("/query", fetchOptions);
   let serverResponse = await send.json();
   result.textContent = serverResponse.data;
   resultImage.src = serverResponse.image;
};

//Modal
let modalBtn = document.querySelector(".api-help");
let modal = document.getElementById("modal");
let modalClose = document.querySelector(".close-btn");

modalBtn.onclick = () => {
   modal.style.display = "block";
};

modalClose.onclick = () => {
   modal.style.display = "none";
};
