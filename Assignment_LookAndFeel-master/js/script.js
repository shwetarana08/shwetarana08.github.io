
let cars = JSON.parse(localStorage.getItem('cars')) || [];
let currentId = cars.length ? cars[cars.length - 1].id : 0;



function saveToLocalStorage() {
    localStorage.setItem('cars', JSON.stringify(cars));
}

function createCar() {
    const model = document.getElementById('model').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const year = document.getElementById('year').value;
    const price = document.getElementById('price').value;

    if (model && manufacturer && year && price) {
        const car = {
            id: ++currentId,
            model,
            manufacturer,
            year,
            price: parseFloat(price)
        };

        cars.push(car);
        saveToLocalStorage();
        clearForm();
        displayCars();
    } else {
        alert('Please fill in all fields.');
    }
}

function updateCar() {
    const carId = document.getElementById('carId').value;
    const car = cars.find(car => car.id == carId);
    if (car) {
        car.model = document.getElementById('model').value;
        car.manufacturer = document.getElementById('manufacturer').value;
        car.year = document.getElementById('year').value;
        car.price = parseFloat(document.getElementById('price').value);
        saveToLocalStorage();
        clearForm();
        displayCars();
    } else {
        alert('Car not found');
    }
}

function deleteCar() {
    const carId = document.getElementById('carId').value;
    cars = cars.filter(car => car.id != carId);
    saveToLocalStorage();
    clearForm();
    displayCars();
}

function clearForm() {
    document.getElementById('carId').value = '';
    document.getElementById('model').value = '';
    document.getElementById('manufacturer').value = '';
    document.getElementById('year').value = '';
    document.getElementById('price').value = '';
}

function displayCars() {
    const carTableBody = document.getElementById('carTableBody');
    carTableBody.innerHTML = '  ';
    cars.forEach(car => {
        const row = `
            <tr>
                <td>${car.id}</td>
                <td>${car.model}</td>
                <td>${car.manufacturer}</td>
                <td>${car.year}</td>
                <td>${car.price}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editCar(${car.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCarById(${car.id})">Delete</button>
                </td>
            </tr>
        `;
        carTableBody.innerHTML += row;
    });
}
function editCar(carId) {
    const car = cars.find(car => car.id == carId);
    if (car) {
        document.getElementById('carId').value = car.id;
        document.getElementById('model').value = car.model;
        document.getElementById('manufacturer').value = car.manufacturer;
        document.getElementById('year').value = car.year;
        document.getElementById('price').value = car.price;
    } else {
        alert('Car not found');
    }
}

function readCarEntry(carId) {
    const car = cars.find(car => car.id == carId);
    if (car) {
        const carTableBody = document.getElementById('carTableBody');
        carTableBody.innerHTML = `
            <tr>
                <td>${car.id}</td>
                <td>${car.model}</td>
                <td>${car.manufacturer}</td>
                <td>${car.year}</td>
                <td>${car.price}</td>
            </tr>
        `;
    } else {
        alert('Car not found');
    }
}

function deleteCarById(carId) {
    cars = cars.filter(car => car.id != carId);
    saveToLocalStorage();
    displayCars();
}

// Initial display of cars
displayCars();

