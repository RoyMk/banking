document.addEventListener('DOMContentLoaded', locales => {
   const expanderTrigger = document.querySelector('#expander-trigger');
   const expander = document.querySelector('.expander');
   const expanderIdentifier = document.querySelector('.expander-arrow-identifier-closed');
   const recentActivityContainer = document.querySelector('.recent-activity-container');
   const depositButton = document.querySelector('.deposit');

   const templateItem = document.getElementById('recent-activity-item-template');

   expanderTrigger.addEventListener('click', () => {
       expander.classList.toggle('expanded');
       expanderIdentifier.classList.toggle('expander-open');
   })




    function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    }

    

    function createNewItem(title,price,id,date,time){
        const template = document.getElementById('recent-activity-item-template');
        const clone = template.content.cloneNode(true);
        clone.querySelector(".title").textContent = `${title}`;
        clone.querySelector(".price").textContent = `${formatCurrency(price)}`;
        clone.querySelector(".transaction-id").textContent = `ID: ${id}`;
        clone.querySelector(".date").textContent = `${date}`;
        clone.querySelector(".time-stamp").textContent = `${time}`;
        return clone;
    }

    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true  // Set to false for 24-hour format if you want
    };
    const item = createNewItem("Tesla","250",generateTransactionId(),"May 1",
        new Date().toLocaleTimeString(undefined, options));

    depositButton.addEventListener('click', () => {
        recentActivityContainer.appendChild(item)
    })
    
    
    function generateTransactionId() {
        let idRandomizer = []
        for (let i = 0; i < 8; i++) {
            idRandomizer.push(Math.floor(Math.random() * 9) + 1);
        }
        return idRandomizer.join('');
    }

   
   
})