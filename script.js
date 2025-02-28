document.addEventListener('DOMContentLoaded', () => {
    // Get the saved balance from localStorage or default to 0
    let balance = parseFloat(localStorage.getItem('balance')) || 0;

    const balanceDisplay = document.getElementById("balance");
    const addMoneyButton = document.getElementById("addMoneyButton");
    const transferButton = document.getElementById("transferButton");
    const amountInput = document.getElementById("amount");
    const addMoneyAmountInput = document.getElementById("addMoneyAmount");
    const transactionHistory = document.getElementById("transactionHistory");
    const settingsButton = document.getElementById("settingsButton");
    const settingsModal = document.getElementById("settingsModal");
    const closeSettingsButton = document.getElementById("closeSettingsButton");
    const darkModeSwitch = document.getElementById("darkModeSwitch");

    // Check if any of the elements are null
    if (!balanceDisplay || !addMoneyButton || !transferButton || !amountInput || !transactionHistory || !settingsButton || !settingsModal || !closeSettingsButton || !darkModeSwitch) {
        console.error("One or more DOM elements could not be found.");
        return;
    }

    // Check if dark mode was previously set
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }

    // Toggle dark mode
    darkModeSwitch.addEventListener('change', () => {
        if (darkModeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Open the settings modal
    settingsButton.addEventListener("click", () => {
        settingsModal.style.display = "flex";
    });

    // Close the settings modal
    closeSettingsButton.addEventListener("click", () => {
        settingsModal.style.display = "none";
    });

    // Event listener for adding money
    addMoneyButton.addEventListener("click", () => {
        const amount = parseFloat(addMoneyAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        balance += amount;
        updateBalance();
        addTransaction(amount);
    });

    // Event listener for transferring money
    transferButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (balance <= 0) {
            alert("You cannot transfer when your balance is $0.");
            return;
        }
        balance -= amount;
        addTransaction(amount);
        updateBalance();
    });

    // Update the balance display
    function updateBalance() {
        balanceDisplay.textContent = `$${balance}`;
        // Disable transfer button if balance is $0
        transferButton.disabled = balance <= 0;
        // Save the balance to localStorage
        localStorage.setItem('balance', balance);
    }

    // Add a transaction to the history
    function addTransaction(amount) {
        const transactionItem = document.createElement("li");
        transactionItem.innerHTML = `Transferred $${amount} <span>on ${new Date().toLocaleString()}</span>`;
        transactionHistory.appendChild(transactionItem);
    }

    // Initial balance display
    updateBalance();
});
