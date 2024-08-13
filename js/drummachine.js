document.addEventListener('DOMContentLoaded', () => {
    // Sound setup
    const sounds = {
        kick: ['CYCdh_ElecK01-Kick01.wav'],
        snare: ['minimal-pop-click-ui-2-198302.mp3'],
        hihat: ['egg-crack18-104552.mp3'],
        perc: ['CYCdh_ElecK01-Tom01.wav']
    };

    const soundPlayers = {};

    Object.keys(sounds).forEach(key => {
        soundPlayers[key] = sounds[key].map(sound => new Howl({ src: [`audio/DrumSamples/${sound}`] }));
    });

    const pads = document.querySelectorAll('.pad');
    
    pads.forEach(pad => {
        pad.addEventListener('click', () => {
            const soundType = pad.dataset.sound;
            const player = soundPlayers[soundType];
            if (player) {
                const soundIndex = Math.floor(Math.random() * player.length);  // Randomly pick one of the sounds for this type
                player[soundIndex].play();
            }
        });
    });

    // Sequencer functionality
    const steps = 8;
    let currentStep = 0;
    let isPlaying = false;
    let intervalId;

    function playStep(step) {
        const buttons = document.querySelectorAll(`.sequencer-button[data-step="${step + 1}"]`);
        buttons.forEach(button => {
            if (button.classList.contains('active')) {
                const soundType = button.dataset.sound;
                const player = soundPlayers[soundType];
                if (player) {
                    const soundIndex = Math.floor(Math.random() * player.length);  // Randomly pick one of the sounds for this type
                    player[soundIndex].play();
                }
            }
        });
    }

    function updatePlayhead(step) {
        const allButtons = document.querySelectorAll('.sequencer-button');
        allButtons.forEach(button => button.classList.remove('playhead'));

        const currentButtons = document.querySelectorAll(`.sequencer-button[data-step="${step + 1}"]`);
        currentButtons.forEach(button => button.classList.add('playhead'));
    }

    function getIntervalTime(bpm) {
        return (60 / bpm) * 1000 / (steps / 4);  // Calculate interval time based on BPM and number of steps
    }

    function playSequencer() {
        const tempo = parseInt(document.getElementById('tempo').value);
        intervalId = setInterval(() => {
            updatePlayhead(currentStep);
            playStep(currentStep);
            currentStep = (currentStep + 1) % steps;
        }, getIntervalTime(tempo));
    }

    function stopSequencer() {
        clearInterval(intervalId);
        currentStep = 0;
        updatePlayhead(currentStep - 1);  // Clear the playhead when stopping
    }

    function resetSequencer() {
        stopSequencer();
        document.querySelectorAll('.sequencer-button').forEach(button => {
            button.classList.remove('active');
        });
    }

    function setVolume(volume) {
        Object.keys(soundPlayers).forEach(key => {
            soundPlayers[key].forEach(player => {
                player.volume(volume);
            });
        });
    }

    document.getElementById('play').addEventListener('click', () => {
        if (!isPlaying) {
            playSequencer();
            isPlaying = true;
        }
    });

    document.getElementById('stop').addEventListener('click', () => {
        stopSequencer();
        isPlaying = false;
    });

    document.getElementById('reset').addEventListener('click', () => {
        resetSequencer();
        isPlaying = false;
    });

    document.getElementById('tempo').addEventListener('input', () => {
        if (isPlaying) {
            stopSequencer();
            playSequencer();
        }
    });

    document.getElementById('volume').addEventListener('input', (event) => {
        setVolume(event.target.value / 100);
    });

    // Initialize the volume based on the slider value
    setVolume(document.getElementById('volume').value / 100);

    // Sequencer table setup
    const soundTypes = [
        { label: 'A', sound: 'kick' },
        { label: 'B', sound: 'snare' },
        { label: 'C', sound: 'hihat' },
        { label: 'D', sound: 'perc' }
    ];
    const tbody = document.querySelector('#sequencer tbody');
    
    soundTypes.forEach(({ label, sound }) => {
        const row = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.scope = 'row';
        headerCell.textContent = label;
        row.appendChild(headerCell);
    
        for (let i = 1; i <= steps; i++) {
            const cell = document.createElement('td');
            const button = document.createElement('button');
            button.className = 'btn btn-light sequencer-button';
            button.dataset.sound = sound;
            button.dataset.step = i;
            button.innerHTML = '<i class="bi bi-circle"></i>';
            button.onclick = function() {
                button.classList.toggle('active');
                const icon = button.querySelector('i');
                if (button.classList.contains('active')) {
                    icon.className = 'bi bi-circle-fill';
                } else {
                    icon.className = 'bi bi-circle';
                }
            };
    
            cell.appendChild(button);
            row.appendChild(cell);
        }
    
        tbody.appendChild(row);
    });
    
    
});
