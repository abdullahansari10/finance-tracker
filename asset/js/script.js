let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

$("#creditBtn").click(() => addTransaction("credit"));
$("#debitBtn").click(() => addTransaction("debit"));

function addTransaction(type) {
  let totalCredit = 0;
  let totalDebit = 0;
  let amount = parseFloat($("#amountInput").val());
  let desc = $("#descInput").val();
  let date = $("#dateInput").val();

  if (isNaN(amount) || amount < 0) return alert("plz enter valid amount");

  transactions.forEach((data) => {
    if (data.type === "credit") totalCredit += parseFloat(data.amount);
    else totalDebit += parseFloat(data.amount);
  });

  if (type === "debit" && amount > totalCredit - totalDebit) {
    return alert("You not have enough money to spend");
  }

  let transaction = {
    amount,
    desc,
    date,
    type,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  $("#amountInput").val("");
  $("#descInput").val("");
  $("#dateInput").val("");
  updateUi();
}

function updateUi() {
  let credit = 0;
  let debit = 0;
  $("#transactionList").empty();
  transactions
    .slice()
    .reverse()
    .forEach((data) => {
      let sign = data.type === "credit" ? "+" : "-";

   let item = `
  <div class="d-flex justify-content-between align-items-center border-bottom p-2">
    <div>
      <strong class="${data.type === "credit" ? "text-success" : "text-danger"} fs-5">
        ${sign} ₹${data.amount}
      </strong>
      <div class="small text-muted">${data.desc}</div>
      <div class="transaction-time small text-secondary">${data.date}</div>
    </div>
    <span class="text-capitalize small ${data.type === "credit" ? "text-success" : "text-danger"}">
      ${data.type}
    </span>
  </div>
`;


      $("#transactionList").append(item);
      if (data.type === "credit") credit += parseFloat(data.amount);
      else debit += parseFloat(data.amount);
    });

  $("#creditPrice").text(`₹ ${credit}`);
  $("#debitPrice").text(`₹ ${debit}`);
  $("#total").text(`₹ ${credit - debit}`);
}
updateUi();
