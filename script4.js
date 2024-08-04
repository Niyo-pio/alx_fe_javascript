document.addEventListener('DOMContentLoaded', () => {
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { id: 1, text: 'The have to win every time, We only have to win only once for all.', category: 'Inspiration' },
      { id: 2, text: "The gods maid wine to compensate those who can't afford revenge, So stay calm and let the gods fight for you", category: 'Life' },
      { id: 3, text: 'The best time to plant a tree was 20 years ago. The second best time is now.', category: 'Proverb' }
    ];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const categoryFilter = document.getElementById('categoryFilter');
    const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
    const lastSelectedCategory = localStorage.getItem('selectedCategory') || 'all';
  
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL
  
    async function fetchQuotesFromServer() {
      try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();
        mergeQuotes(serverQuotes);
      } catch (error) {
        console.error('Error fetching quotes from server:', error);
      }
    }
  
    async function postQuoteToServer(quote) {
      try {
        await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(quote),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error posting quote to server:', error);
      }
    }
  
    function mergeQuotes(serverQuotes) {
      const mergedQuotes = [...quotes];
      serverQuotes.forEach(serverQuote => {
        const existingQuote = quotes.find(quote => quote.id === serverQuote.id);
        if (!existingQuote) {
          mergedQuotes.push(serverQuote);
        }
      });
      quotes = mergedQuotes;
      localStorage.setItem('quotes', JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
    }
  
    function populateCategories() {
      const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
      categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
      categoryFilter.value = lastSelectedCategory;
    }
  
    function showRandomQuote() {
      const filteredQuotes = categoryFilter.value === 'all' ? quotes : quotes.filter(quote => quote.category === categoryFilter.value);
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      const quoteHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
      quoteDisplay.innerHTML = quoteHTML;
      sessionStorage.setItem('lastViewedQuote', quoteHTML);
    }
  
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
      if (newQuoteText && newQuoteCategory) {
        const newQuote = { id: Date.now(), text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        postQuoteToServer(newQuote);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        populateCategories();
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    function filterQuotes() {
      const selectedCategory = categoryFilter.value;
      localStorage.setItem('selectedCategory', selectedCategory);
      const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
      const quoteHTML = filteredQuotes.map(quote => `<p>${quote.text}</p><p><em>${quote.category}</em></p>`).join('');
      quoteDisplay.innerHTML = quoteHTML;
    }
  
    function exportToJsonFile() {
      const dataStr = JSON.stringify(quotes);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'quotes.json';
  
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        alert('Quotes imported successfully!');
        populateCategories();
        filterQuotes();
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    if (lastViewedQuote) {
      quoteDisplay.innerHTML = lastViewedQuote;
    }
  
    newQuoteButton.addEventListener('click', showRandomQuote);
    window.addQuote = addQuote;
    window.exportToJsonFile = exportToJsonFile;
    window.importFromJsonFile = importFromJsonFile;
    window.filterQuotes = filterQuotes;
  
    populateCategories();
    filterQuotes();
    fetchQuotesFromServer();
    setInterval(fetchQuotesFromServer, 30000); // Fetch new quotes every 30 seconds
  });
  