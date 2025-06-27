// Player data
const players = [
    { id: 1, name: "Virat Kohli", role: "batsman", team: "IND", price: 180 },
    { id: 2, name: "Jasprit Bumrah", role: "bowler", team: "IND", price: 170 },
    { id: 3, name: "Ben Stokes", role: "allrounder", team: "ENG", price: 175 },
    { id: 4, name: "Steve Smith", role: "batsman", team: "AUS", price: 165 },
    { id: 5, name: "Pat Cummins", role: "bowler", team: "AUS", price: 160 },
    { id: 6, name: "Jos Buttler", role: "wicketkeeper", team: "ENG", price: 155 },
    { id: 7, name: "Rashid Khan", role: "bowler", team: "AFG", price: 150 },
    { id: 8, name: "Kane Williamson", role: "batsman", team: "NZ", price: 145 },
    { id: 9, name: "Hardik Pandya", role: "allrounder", team: "IND", price: 140 },
    { id: 10, name: "Trent Boult", role: "bowler", team: "NZ", price: 135 },
    { id: 11, name: "Babar Azam", role: "batsman", team: "PAK", price: 130 },
    { id: 12, name: "Quinton de Kock", role: "wicketkeeper", team: "SA", price: 125 },
    { id: 13, name: "Glenn Maxwell", role: "allrounder", team: "AUS", price: 120 },
    { id: 14, name: "Kagiso Rabada", role: "bowler", team: "SA", price: 115 },
    { id: 15, name: "Rohit Sharma", role: "batsman", team: "IND", price: 110 },
    { id: 16, name: "Shaheen Afridi", role: "bowler", team: "PAK", price: 105 },
    { id: 17, name: "Jonny Bairstow", role: "wicketkeeper", team: "ENG", price: 100 },
    { id: 18, name: "Ravindra Jadeja", role: "allrounder", team: "IND", price: 95 },
    { id: 19, name: "David Warner", role: "batsman", team: "AUS", price: 90 },
    { id: 20, name: "Mohammed Shami", role: "bowler", team: "IND", price: 85 }
];

// Game state
const state = {
    budget: 1000,
    selectedPlayers: [],
    currentCategory: 'all'
};

// DOM elements
const playerListEl = document.getElementById('player-list');
const selectedPlayersEl = document.getElementById('selected-players');
const budgetAmountEl = document.querySelector('.budget-amount');
const budgetUsedEl = document.getElementById('budget-used');
const budgetRemainingEl = document.getElementById('budget-remaining');
const playerCountEl = document.getElementById('player-count');
const teamBalanceEl = document.getElementById('team-balance');
const categoryBtns = document.querySelectorAll('.category-btn');
const submitTeamBtn = document.getElementById('submit-team');

// Initialize the app
function init() {
    renderPlayers();
    updateUI();
    
    // Event listeners
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentCategory = btn.dataset.category;
            renderPlayers();
        });
    });
    
    submitTeamBtn.addEventListener('click', submitTeam);
}

// Render players based on current category
function renderPlayers() {
    playerListEl.innerHTML = '';
    
    const filteredPlayers = state.currentCategory === 'all' 
        ? players 
        : players.filter(p => p.role === state.currentCategory);
    
    filteredPlayers.forEach(player => {
        const isSelected = state.selectedPlayers.some(p => p.id === player.id);
        const playerEl = document.createElement('div');
        playerEl.className = 'player-card';
        playerEl.innerHTML = `
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-details">${getRoleName(player.role)} | ${player.team}</div>
            </div>
            <div class="player-price">₹${player.price}m</div>
            <button class="player-action" data-id="${player.id}" ${isSelected ? 'disabled' : ''}>
                ${isSelected ? 'Added' : 'Add'}
            </button>
        `;
        
        if (!isSelected) {
            playerEl.querySelector('button').addEventListener('click', () => addPlayer(player.id));
        }
        
        playerListEl.appendChild(playerEl);
    });
}

// Get display name for player role
function getRoleName(role) {
    const roles = {
        batsman: 'Batsman',
        bowler: 'Bowler',
        allrounder: 'All-rounder',
        wicketkeeper: 'Wicket Keeper'
    };
    return roles[role] || role;
}

// Add player to team
function addPlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    
    if (state.selectedPlayers.length >= 11) {
        alert('You can only select 11 players!');
        return;
    }
    
    if (state.budget - player.price < 0) {
        alert('Not enough budget remaining!');
        return;
    }
    
    state.selectedPlayers.push(player);
    state.budget -= player.price;
    
    renderPlayers();
    updateUI();
}

// Remove player from team
function removePlayer(playerId) {
    const playerIndex = state.selectedPlayers.findIndex(p => p.id === playerId);
    
    if (playerIndex !== -1) {
        const player = state.selectedPlayers[playerIndex];
        state.budget += player.price;
        state.selectedPlayers.splice(playerIndex, 1);
        
        renderPlayers();
        updateUI();
    }
}

// Update UI elements
function updateUI() {
    // Update budget displays
    budgetAmountEl.textContent = `₹${state.budget}`;
    const totalUsed = 1000 - state.budget;
    budgetUsedEl.textContent = `₹${totalUsed}`;
    budgetRemainingEl.textContent = `₹${state.budget}`;
    
    // Update player count
    playerCountEl.textContent = state.selectedPlayers.length;
    
    // Update selected players list
    selectedPlayersEl.innerHTML = '';
    
    if (state.selectedPlayers.length === 0) {
        selectedPlayersEl.innerHTML = '<p style="color: #aaa; text-align: center;">No players selected yet</p>';
    } else {
        state.selectedPlayers.forEach(player => {
            const playerEl = document.createElement('div');
            playerEl.className = 'selected-player';
            playerEl.innerHTML = `
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-details">${getRoleName(player.role)} | ${player.team}</div>
                </div>
                <div class="player-price">₹${player.price}m</div>
                <button class="player-action remove" data-id="${player.id}">Remove</button>
            `;
            
            playerEl.querySelector('button').addEventListener('click', () => removePlayer(player.id));
            selectedPlayersEl.appendChild(playerEl);
        });
    }
    
    // Update team title
    document.querySelector('.selected-team h3').textContent = 
        `Your Team (${state.selectedPlayers.length}/11)`;
    
    // Update team balance
    teamBalanceEl.textContent = calculateTeamBalance();
}

// Calculate team balance (count of each role)
function calculateTeamBalance() {
    const roleCounts = {
        batsman: 0,
        bowler: 0,
        allrounder: 0,
        wicketkeeper: 0
    };
    
    state.selectedPlayers.forEach(player => {
        roleCounts[player.role]++;
    });
    
    return `${roleCounts.batsman} BAT | ${roleCounts.bowler} BOWL | ${roleCounts.allrounder} AR | ${roleCounts.wicketkeeper} WK`;
}

// Submit team
function submitTeam() {
    if (state.selectedPlayers.length < 11) {
        alert(`Please select 11 players (currently ${state.selectedPlayers.length})`);
        return;
    }
    
    const balance = calculateTeamBalance();
    
    alert(`Team submitted successfully!\n\nPlayers: ${state.selectedPlayers.length}\nBudget Used: ₹${1000 - state.budget}m\nTeam Balance: ${balance}`);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);