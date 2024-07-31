document.addEventListener('DOMContentLoaded', function() {
    const universityPopup = document.getElementById('universityPopup');
    const skillPopup = document.getElementById('skillPopup');

    document.getElementById('addUniversityBtn').addEventListener('click', function() {
        universityPopup.style.display = 'block';
    });

    document.getElementById('addSkillBtn').addEventListener('click', function() {
        skillPopup.style.display = 'block';
    });

    document.getElementById('closeUniversityPopup').addEventListener('click', function() {
        universityPopup.style.display = 'none';
    });

    document.getElementById('closeSkillPopup').addEventListener('click', function() {
        skillPopup.style.display = 'none';
    });

    document.getElementById('saveUniversityBtn').addEventListener('click', function() {
        const universityName = document.getElementById('universityName').value;
        const universityRating = document.getElementById('universityRating').value;

        if (universityName && universityRating) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'add_university.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const newOption = document.createElement('option');
                    newOption.value = xhr.responseText;
                    newOption.text = universityName;
                    document.getElementById('university').appendChild(newOption);
                    universityPopup.style.display = 'none';
                }
            };
            xhr.send('name=' + universityName + '&rating=' + universityRating);
        }
    });

    document.getElementById('saveSkillBtn').addEventListener('click', function() {
        const skillName = document.getElementById('skillName').value;

        if (skillName) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'add_skill.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const newOption = document.createElement('option');
                    newOption.value = xhr.responseText;
                    newOption.text = skillName;
                    document.getElementById('skills').appendChild(newOption);
                    skillPopup.style.display = 'none';
                }
            };
            xhr.send('name=' + skillName);
        }
    });

    document.getElementById('cvForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'submit_cv.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert('CV успешно записано!');
                document.getElementById('cvForm').reset();
            }
        };
        xhr.send(formData);
    });

    // Fetch initial data
    fetchUniversities();
    fetchSkills();

    function fetchUniversities() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch_universities.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const universities = JSON.parse(xhr.responseText);
                const universitySelect = document.getElementById('university');
                universities.forEach(function(university) {
                    const option = document.createElement('option');
                    option.value = university.id;
                    option.text = university.name;
                    universitySelect.appendChild(option);
                });
            }
        };
        xhr.send();
    }

    function fetchSkills() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'fetch_skills.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const skills = JSON.parse(xhr.responseText);
                const skillsSelect = document.getElementById('skills');
                skills.forEach(function(skill) {
                    const option = document.createElement('option');
                    option.value = skill.id;
                    option.text = skill.name;
                    skillsSelect.appendChild(option);
                });
            }
        };
        xhr.send();
    }
});
