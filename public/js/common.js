// Adopt animal (member only)
async function adoptAnimal(id) {
  try {
    const res = await fetch(`/animals/adopt/${id}`, { method: 'POST' });
    const data = await res.json();
    
    if (data.success) {
      alert(data.message);
      location.reload(); // Refresh page to show updated adoption status
    } else {
      alert('Error: ' + data.message);
    }
  } catch (err) {
    alert('Error adopting animal: ' + err.message);
  }
}

// Cancel adoption (admin only)
async function deleteAnimal(id) {
  if (!confirm('Are you sure you want to cancel this adoption?')) return;
  
  try {
    const res = await fetch(`/animals/cancel-adoption/${id}`, { method: 'POST' });
    const data = await res.json();
    
    if (data.success) {
      alert(data.message);
      location.reload();
    } else {
      alert('Error: ' + data.message);
    }
  } catch (err) {
    alert('Error cancelling adoption: ' + err.message);
  }
}

// Query: All adoption details
async function sqlQuery2() {
  try {
    const res = await fetch('/animals/query/adoption-details');
    const data = await res.json();
    
    console.table(data);
    alert(`Found ${data.length} adopted animals. Check console for details.`);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Query: Animals by age
async function sqlQuery3() {
  try {
    const res = await fetch('/animals/query/by-age');
    const data = await res.json();
    
    console.table(data);
    alert(`Found ${data.length} animals sorted by age. Check console for details.`);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Query: Animals born in date range
async function sqlQuery4() {
  const startDate = prompt('Enter start date (YYYY-MM-DD):');
  const endDate = prompt('Enter end date (YYYY-MM-DD):');
  
  if (!startDate || !endDate) return;
  
  try {
    const res = await fetch(`/animals/query/by-date-range?startDate=${startDate}&endDate=${endDate}`);
    const data = await res.json();
    
    console.table(data);
    alert(`Found ${data.length} animals born between ${startDate} and ${endDate}. Check console for details.`);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Query: Number of animals per size (admin only)
async function sqlQuery5() {
  try {
    const res = await fetch('/animals/query/count-by-size');
    const data = await res.json();
    
    if (data.success === false) {
      alert('Error: ' + data.message + ' (Admin access required)');
      return;
    }
    
    console.table(data);
    
    let message = 'Animals per size:\n';
    data.forEach(row => {
      message += `${row.Size}: ${row.Count}\n`;
    });
    alert(message);
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

// Reload page to show all animals
function allAnimals() {
  location.reload();
}

// Update species (admin only)
function updateSpecies(id) {
  const newSpecies = prompt("Update species name:");
  if (!newSpecies) return;
  
  // TODO: Implement species update
  alert('Species update not yet implemented');
}

// Delete species (admin only)
function deleteSpecies(id) {
  // TODO: Implement species delete
  alert('Species delete not yet implemented');
}

// Populate database
async function populateDatabase() {
  try {
    const res = await fetch('/populate', { method: 'POST' });
    const data = await res.json();
    alert(data.message);
    
    if (data.success) {
      location.reload();
    }
  } catch (err) {
    alert('Error populating database: ' + err.message);
  }
}