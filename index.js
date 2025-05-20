


function generateRandomNumericSequence(min,max,length)
{
    let idRandomizer = [];
    for (let i = 0; i < length; i++) {
        idRandomizer.push(Math.floor(Math.random() * min) + max);
    }
    return idRandomizer.join('');
}


class BankApp {
    constructor() {
        // Element references
        this.expanderTrigger = document.querySelector('#expander-trigger');
        this.expander = document.querySelector('.expander');
        this.expanderIdentifier = document.querySelector('.expander-arrow-identifier-closed');
        this.recentActivityContainer = document.querySelector('.recent-activity-container');
        this.depositButton = document.querySelector('.deposit');
        this.bankBalance = document.getElementById("balance");
        this.templateItem = document.getElementById('recent-activity-item-template');

        // Time options
        this.options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };

        // Bind event handlers
        this.expanderTrigger.addEventListener('click', () => this.toggleExpander());
        this.depositButton.addEventListener('click', () => this.addNewItem());

        // Initialize balance
        this.updateBalance("50000");
    }

    formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createNewItem(title, price, id, date, time) {
        const clone = this.templateItem.content.cloneNode(true);
        clone.querySelector(".title").textContent = `${title}`;
        clone.querySelector(".price").textContent = this.formatCurrency(price);
        clone.querySelector(".transaction-id").textContent = `ID: ${id}`;
        clone.querySelector(".date").textContent = `${date}`;
        clone.querySelector(".time-stamp").textContent = `${time}`;
        return clone;
    }

    cleanFormatting(valueToFormat) {
        return valueToFormat.replace(/[^0-9.-]+/g, '');
    }

    addNewItem() {
        const item = this.createNewItem(
            this.generateTransactionId(),
            this.generateRandomNumber(1, 60000).toString(),
            this.generateTransactionId(),
            new Date().toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            new Date().toLocaleTimeString(undefined, this.options)
        );
        const price = item.querySelector(".price");
        
        // Determines whether the item added will be a deduction or a deposit.
        const isDeduction = this.updateBalance(price.textContent, true);
        if (isDeduction) {
            price.classList.remove('price-positive');
            price.classList.add('price-negative');
            price.textContent = "-" + price.textContent;
        }
        this.recentActivityContainer.insertBefore(
            item,
            this.recentActivityContainer.querySelector("h2").nextElementSibling
        );
    }

    updateBalance(amount, transactionType) {
        const balance = this.cleanFormatting(this.bankBalance.textContent);
        if (transactionType) {
            const newTotal = parseInt(balance, 10) + parseInt(this.cleanFormatting(amount), 10);
            this.bankBalance.textContent = newTotal.toLocaleString();
        } else {
            const newTotalAfterDeduction = parseInt(balance, 10) - parseInt(this.cleanFormatting(amount), 10);
            this.bankBalance.textContent = newTotalAfterDeduction.toLocaleString();
            return isDeduction;
        }
    }

    generateTransactionId() {
        let idRandomizer = [];
        for (let i = 0; i < 8; i++) {
            idRandomizer.push(Math.floor(Math.random() * 9) + 1);
        }
        return idRandomizer.join('');
    }

    toggleExpander() {
        this.expander.classList.toggle('expanded');
        this.expanderIdentifier.classList.toggle('expander-arrow-identifier-open');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bankApp = new BankApp();
    
});
