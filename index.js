function showSection(sectionId) {

    const sections = document.querySelectorAll('#content > div');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
        setTimeout(() => {
            activeSection.classList.add('active');
        }, 10);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    showSection('home');
});


function searchDestination() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const xhr = new XMLHttpRequest();
  
    xhr.open("GET", "info.json", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
  
        const countryResults = searchInCountries(data.countries, keyword);
        const templeResults = searchInArray(data.temples, keyword);
        const beachResults = searchInArray(data.beaches, keyword);
  
        const allResults = [...countryResults, ...templeResults, ...beachResults];
        displayResults(allResults);
      } else {
        console.error("Failed to load data");
      }
    };
  
    xhr.onerror = function() {
      console.error("Request error...");
    };
  
    xhr.send();
  }
  
  function searchInCountries(countries, keyword) {
    let results = [];
    countries.forEach(country => {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(keyword)) {
          results.push({
            name: city.name,
            description: city.description,
            imageUrl: city.imageUrl
          });
        }
      });
    });
    return results;
  }
  
  // Function to search within simple arrays like temples and beaches
  function searchInArray(array, keyword) {
    return array.filter(item => item.name.toLowerCase().includes(keyword));
  }
  
  // Function to display results
  function displayResults(destinations) {
    const resultsDiv = document.getElementById("display");
    resultsDiv.innerHTML = "";
  
    if (destinations.length === 0) {
      resultsDiv.innerHTML = "<p>No matches found.</p>";
      resultsDiv.style.fontSize="28px";
      return;
    }
  
    destinations.forEach(destination => {
      const card = document.createElement("div");
      card.classList.add("destination-card");
  
      const img = document.createElement("img");
      img.src = destination.imageUrl;
      img.alt = destination.name;
  
      const name = document.createElement("h3");
      name.textContent = destination.name;
  
      const description = document.createElement("p");
      description.textContent = destination.description;
  
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(description);
  
      resultsDiv.appendChild(card);
    });
  }



function closebutton()
{
  const resultsContainer = document.getElementById('display');
  resultsContainer.innerHTML = '';
}
document.getElementById('closebtn').addEventListener('click', closebutton);