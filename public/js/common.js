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

// Update species:
async function updateSpecies(id, currentName) {
    const newName = prompt('Update species name: ', currentName);
    if (!newName || newName === currentName) return;
    
    try {
      const res = await fetch(`/species/update/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `name=${encodeURIComponent(newName)}`
      });

      if (res.ok) {
        alert('Species updated successfully');
        location.reload();
        } else { 
        alert('Error updating species:');
      }
    } catch (err) {
      alert('Error updating species: ' + err.message);
    }
}

//Delete species:
async function deleteSpecies(id) {
  if (!confirm('Are you sure?')) return;
  
  try {
    const res = await fetch(`/species/delete/${id}`, { method: 'POST' });
    const contentType = res.headers.get('content-type');
    
    if (!contentType || !contentType.includes('application/json')) {
      alert('Server sent invalid response format');
      console.error('Expected JSON, got:', contentType);
      return;
    }
    
    const data = await res.json();
    
    if (data.success) {
      alert(data.message);
      location.reload();
    } else {
      alert('Error: ' + data.message);
    }
    
  } catch (err) {
    alert('Error: ' + err.message);
  }
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

let currentSort = { column: null, ascending: true };

function sortTable(column) {
  const rows = Array.from(document.querySelectorAll('.animal-row'));
  
  rows.sort((a, b) => {
    const aVal = a.dataset[column];
    const bVal = b.dataset[column];
    
    // Numeric sorting for age
    if (column === 'age') {
      return currentSort.ascending ? aVal - bVal : bVal - aVal;
    }
    
    // Alphabetic/string sorting
    return currentSort.ascending 
      ? aVal.localeCompare(bVal) 
      : bVal.localeCompare(aVal);
  });
  
  const container = document.querySelector('.animal-container');
  rows.forEach(row => container.appendChild(row));
  
  // Toggle sort direction
  if (currentSort.column === column) {
    currentSort.ascending = !currentSort.ascending;
  } else {
    currentSort.column = column;
    currentSort.ascending = true;
  }
  
  updateSortArrows(column);
}

function updateSortArrows(column) {
  document.querySelectorAll('[data-sort]').forEach(header => {
    const col = header.dataset.sort;
    const arrowSpan = header.querySelector('.sort-arrow');
    
    if (col === column) {
      arrowSpan.textContent = currentSort.ascending ? ' ▲' : ' ▼';
      arrowSpan.style.color = 'black';
    } else {
      arrowSpan.textContent = ' ▼';
      arrowSpan.style.color = '#ccc';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-sort] .sort-arrow').forEach(arrow => {
    arrow.textContent = ' ▼';
    arrow.style.color = '#ccc';
  });
});