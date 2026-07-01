const friends = [
    { name: 'HINDHU', shortCode: 'H' },
    { name: 'mouni', shortCode: 'M' },
    { name: 'yogi', shortCode: 'Y' },
    { name: 'akki', shortCode: 'A' }
];

const bhanu = { name: 'MR.BHANU', shortCode: 'B' };

const durations = [
    { label: '1 month', value: '1month' },
    { label: '2 years', value: '2years' },
    { label: '3 years', value: '3years' },
    { label: '24 months', value: '24months' }
];

let currentStep = 1;
let userData = {
    photo: null,
    userName: null,
    isAkki: null,
    bestFriend: null,
    duration: null
};

function initApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <div id="screen-1" class="screen active">
                <h1>💕 Love Proposal 💕</h1>
                <h2>Step 1: Upload Your Photo</h2>
                
                <div class="form-group">
                    <label for="photo">Choose Your Photo:</label>
                    <input type="file" id="photo" accept="image/*">
                    <div class="photo-preview" id="photoPreview">
                        <span style="color: #999;">Your photo will appear here</span>
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="nextStep()">Next ➜</button>
            </div>

            <div id="screen-2" class="screen">
                <h1>💕 Love Proposal 💕</h1>
                <h2>Step 2: Enter Your Name</h2>
                
                <div class="form-group">
                    <label for="userName">Your Name:</label>
                    <input type="text" id="userName" placeholder="Enter your name">
                </div>
                
                <button class="btn btn-primary" onclick="nextStep()">Next ➜</button>
            </div>

            <div id="screen-3" class="screen">
                <h1>💕 Love Proposal 💕</h1>
                <h2>Is Your Name AKKI?</h2>
                
                <div class="yes-no-group">
                    <button class="yes" onclick="selectYesNo('yes')">YES ✓</button>
                    <button class="no" onclick="selectYesNo('no')">NO ✗</button>
                </div>
                
                <button class="btn btn-primary" onclick="nextStep()" id="nextBtn3" disabled>Next ➜</button>
            </div>

            <div id="screen-4" class="screen">
                <h1>💕 Love Proposal 💕</h1>
                <h2>Select Your Best Friend</h2>
                
                <div id="permissionMsg"></div>
                <div class="friend-list" id="friendList"></div>
                
                <button class="btn btn-primary" onclick="nextStep()" id="nextBtn4" disabled>Next ➜</button>
            </div>

            <div id="screen-5" class="screen">
                <h1>💕 Love Proposal 💕</h1>
                <h2>Select Friendship Duration</h2>
                
                <div class="duration-options" id="durationList"></div>
                
                <button class="btn btn-primary" onclick="nextStep()" id="nextBtn5" disabled>Next ➜</button>
            </div>

            <div id="screen-6" class="screen">
                <h1>💕 TEA LIFE 💕</h1>
                
                <div class="friend-info">
                    <h3>Your Best Friend</h3>
                    <div style="font-size: 24px; margin: 10px 0;" id="selectedFriendName"></div>
                    <div class="friend-shortcode" id="selectedFriendCode"></div>
                </div>

                <div class="friend-info">
                    <div class="duration-display" id="selectedDuration"></div>
                </div>

                <div class="animation-container" id="animationContainer"></div>

                <div class="final-message">
                    <p>You are <strong>1 of the best</strong> in your BEST</p>
                    <p style="font-size: 32px; margin: 15px 0;">🍵 <strong>TEA</strong> 🍵</p>
                    <p><strong>LIFE</strong></p>
                    <br>
                    <p>Your <strong>🍵 TEA 🍵</strong> will be <strong>HAPPY</strong></p>
                    <p>with your <strong>MOMENTS</strong> every time ❤️</p>
                </div>

                <button class="btn btn-primary" onclick="shareProposal()">❤️ Share This Love ❤️</button>
                <button class="btn btn-secondary" onclick="restart()">🔄 Start Over</button>
            </div>
        </div>
    `;

    document.getElementById('photo').addEventListener('change', handlePhotoUpload);
    document.getElementById('userName').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') nextStep();
    });

    const friendListDiv = document.getElementById('friendList');
    friends.forEach(friend => {
        const div = document.createElement('div');
        div.className = 'friend-option';
        div.innerHTML = `<span>${friend.name}</span> <span class="arrow-animation">→</span>`;
        div.onclick = () => selectFriend(friend);
        friendListDiv.appendChild(div);
    });

    const bhanDiv = document.createElement('div');
    bhanDiv.className = 'friend-option';
    bhanDiv.innerHTML = `<span>${bhanu.name}</span>`;
    bhanDiv.onclick = () => selectBhanu();
    friendListDiv.appendChild(bhanDiv);

    const durationListDiv = document.getElementById('durationList');
    durations.forEach(duration => {
        const div = document.createElement('div');
        div.className = 'duration-option';
        div.textContent = duration.label;
        div.onclick = () => selectDuration(duration);
        durationListDiv.appendChild(div);
    });
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            userData.photo = event.target.result;
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${userData.photo}" alt="User Photo">`;
        };
        reader.readAsDataURL(file);
    }
}

function selectYesNo(answer) {
    userData.isAkki = answer === 'yes';
    
    document.querySelectorAll('.yes-no-group button').forEach(btn => {
        btn.style.background = 'white';
        btn.style.color = btn.classList.contains('yes') ? '#28a745' : '#dc3545';
    });
    
    if (userData.isAkki) {
        document.querySelector('.yes-no-group .yes').style.background = '#28a745';
        document.querySelector('.yes-no-group .yes').style.color = 'white';
    } else {
        document.querySelector('.yes-no-group .no').style.background = '#dc3545';
        document.querySelector('.yes-no-group .no').style.color = 'white';
    }
    
    document.getElementById('nextBtn3').disabled = false;
}

function selectFriend(friend) {
    userData.bestFriend = friend;
    
    document.querySelectorAll('.friend-option').forEach((option, index) => {
        option.classList.remove('selected');
        if (option.textContent.includes(friend.name)) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('nextBtn4').disabled = false;
}

function selectBhanu() {
    const messageDiv = document.getElementById('permissionMsg');
    messageDiv.innerHTML = '<div class="permission-granted">✓ PERMISSION GRANTED ✓</div>';
    
    document.querySelectorAll('.friend-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent.includes('MR.BHANU')) {
            option.classList.add('selected');
        }
    });
    
    userData.bestFriend = bhanu;
    document.getElementById('nextBtn4').disabled = false;
}

function selectDuration(duration) {
    userData.duration = duration;
    
    document.querySelectorAll('.duration-option').forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === duration.label) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('nextBtn5').disabled = false;
}

function nextStep() {
    if (currentStep === 1 && !userData.photo) {
        alert('Please upload a photo!');
        return;
    }
    if (currentStep === 2) {
        const userName = document.getElementById('userName').value.trim();
        if (!userName) {
            alert('Please enter your name!');
            return;
        }
        userData.userName = userName;
    }
    if (currentStep === 3 && userData.isAkki === null) {
        alert('Please select YES or NO!');
        return;
    }
    if (currentStep === 4 && !userData.bestFriend) {
        alert('Please select a best friend!');
        return;
    }
    if (currentStep === 5 && !userData.duration) {
        alert('Please select a duration!');
        return;
    }

    if (currentStep < 6) {
        document.getElementById(`screen-${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`screen-${currentStep}`).classList.add('active');

        if (currentStep === 6) {
            showFinalScreen();
        }
    }
}

function showFinalScreen() {
    document.getElementById('selectedFriendName').textContent = userData.bestFriend.name.toUpperCase();
    document.getElementById('selectedFriendCode').textContent = userData.bestFriend.shortCode;
    document.getElementById('selectedDuration').textContent = `Friends for ${userData.duration.label}`;

    create3DAnimation();
}

function create3DAnimation() {
    const container = document.getElementById('animationContainer');
    container.innerHTML = '';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const heartGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff1493, emissive: 0xff69b4, metalness: 0.3, roughness: 0.4 });

    const hearts = [];
    for (let i = 0; i < 5; i++) {
        const heart = new THREE.Mesh(heartGeometry, heartMaterial);
        heart.position.x = (Math.random() - 0.5) * 4;
        heart.position.y = (Math.random() - 0.5) * 4;
        heart.position.z = (Math.random() - 0.5) * 2;
        scene.add(heart);
        hearts.push({
            mesh: heart,
            rotationSpeed: Math.random() * 0.05,
            floatSpeed: Math.random() * 0.02,
            initialY: heart.position.y
        });
    }

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 200px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍵', 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    const textGeometry = new THREE.PlaneGeometry(2, 2);
    const textMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = -0.5;
    scene.add(textMesh);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);

        hearts.forEach(heart => {
            heart.mesh.rotation.x += heart.rotationSpeed;
            heart.mesh.rotation.y += heart.rotationSpeed;
            heart.mesh.position.y = heart.initialY + Math.sin(Date.now() * 0.001) * 0.5;
        });

        textMesh.rotation.z += 0.01;

        renderer.render(scene, camera);
    }

    animate();

    const resizeHandler = () => {
        if (container && container.parentElement) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    };

    window.addEventListener('resize', resizeHandler);
}

function shareProposal() {
    const message = `🍵 TEA LIFE PROPOSAL 🍵\n\n${userData.userName} loves ${userData.bestFriend.name}!\n\nWe've been friends for ${userData.duration.label}.\n\n${userData.bestFriend.name} is one of the best in my BEST TEA LIFE! 💕\n\nMy TEA will be HAPPY with your MOMENTS every time! ❤️`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Love Proposal - TEA Life',
            text: message
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert(message + '\n\nCopy this and share with your bestie!');
    }
}

function restart() {
    currentStep = 1;
    userData = {
        photo: null,
        userName: null,
        isAkki: null,
        bestFriend: null,
        duration: null
    };
    initApp();
}

window.addEventListener('DOMContentLoaded', initApp);