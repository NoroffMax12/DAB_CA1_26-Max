function adoptAnimal(id){
}

function deleteAnimal(id){
}

function updateSpecies(id){
    newSpecies = prompt("Update species")
}

function deleteSpecies(id){
}

// helper used on the homepage to trigger the database population endpoint
async function populateDatabase() {
    try {
        const res = await fetch('/populate', { method: 'POST' });
        const data = await res.json();
        alert(data.message);
    } catch (err) {
        alert('Error populating database: ' + err.message);
    }
}