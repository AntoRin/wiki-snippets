let input = document.getElementById("query");
let submit = document.getElementById("submit");
let result = document.getElementById("result");
let resultImage = document.getElementById("resultImage");

submit.onclick = async event => {
  event.preventDefault();
  result.textContent = "Loading...";
  resultImage.src = "";
  let query = input.value;
  console.log(query);
  let fetchOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };
  let send = await fetch("/query", fetchOptions);
  let serverResponse = await send.json();
  console.log(serverResponse);
  result.textContent = serverResponse.data;
  resultImage.src = serverResponse.image;
};
