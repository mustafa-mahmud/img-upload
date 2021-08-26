'use strict';

const form = document.getElementById('insert');
const nameInput = document.querySelector('input[name="name"]');
const passwordInput = document.querySelector('input[name="password"]');
const fileInput = document.querySelector('input[name="my-file"]');
const msgP = document.getElementById('msg');
const table = document.querySelector('table');

async function ckFormData(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const name = nameInput.value.trim();
  const password = passwordInput.value.trim();
  const file = fileInput.files;

  if (nameValid(name) && passValid(password) && fileValid(file)) {
    const res = await fetch('insert.php', {
      method: 'post',
      body: formData,
    });
    const data = await res.text();

    console.log(data);
    if (data.includes('successfully')) {
      nameInput.value = passwordInput.value = fileInput.value = '';
      giveMeMsg('green', 'Data save successfully.');
      diplayUI();
    }
  }
}

function nameValid(name) {
  if (name !== '') {
    if (name.length >= 2) {
      const patterns = /^[a-zA-Z]+$/g;
      if (patterns.test(name)) {
        msgP.style.color = 'transparent';
        return true;
      } else {
        giveMeMsg('red', 'Name must be valid name');
      }
    } else {
      giveMeMsg('red', 'Name must be up to 2 Characters');
    }
  } else {
    giveMeMsg('red', 'Name must be filled');
  }
}

function passValid(pass) {
  if (pass !== '') {
    if (pass.length >= 3) {
      const patterns = /^[a-zA-Z0-9]+$/g;
      if (patterns.test(pass)) {
        msgP.style.color = 'transparent';
        return true;
      } else {
        giveMeMsg('red', 'Password must be filled');
      }
    } else {
      giveMeMsg('red', 'Password must be up to 3 Characters');
    }
  } else {
    giveMeMsg('red', 'Password must be filled');
  }
}

function fileValid(file) {
  if (file.length === 0) return giveMeMsg('red', 'Pls put an image');
  msgP.style.color = 'transparent';

  const size = file[0].size;
  const type = file[0].type;
  const typeArr = type.split('/');
  let typeName = typeArr[typeArr.length - 1].toLowerCase();
  const validType = ['jpg', 'jpeg', 'png', 'gif'];

  if (validType.includes(typeName)) {
    if (size < 3000000) {
      msgP.style.color = 'transparent';
      return true;
    } else {
      giveMeMsg('red', 'Image size must be in 3mbs');
    }
  } else {
    giveMeMsg('red', 'Only jpg|jpeg|png|gif supported');
  }
}

function giveMeMsg(color, msg) {
  msgP.style.color = color;
  msgP.textContent = msg;

  setTimeout(() => {
    msgP.style.color = 'transparent';
  }, 1000);
}

async function diplayUI() {
  const res = await fetch('read.php');
  let data = await res.json();
  if (data) {
    table.innerHTML = '';

    table.innerHTML = `
			<tr>
					<th>Id</th>
					<th>Name</th>
					<th>Password</th>
					<th>Image</th>
					<th>Actions</th>
				</tr>
		`;
    data.forEach((val, ind) => {
      const html = `
					<tr>
						<td>${ind + 1}</td>
						<td>${val.name}</td>
						<td>${val.pass.slice(0, 7).padEnd(10, '.')}</td>
						<td><img src="uploads/${val.img}" width="60" height="40" />
						</td>
						<td data-set="${
              val.id
            }"><span onclick="editUser(event)" id="edit">Edit</span> | <span onclick="deleteUser(event)" id="del">Delete</span></td> 
					</tr>
			`;

      table.insertAdjacentHTML('beforeend', html);
    });
  }
}

async function deleteUser(event) {
  const id = event.target.closest('td').getAttribute('data-set');
  const src = event.target
    .closest('tr')
    .querySelector('img')
    .getAttribute('src');

  const greement = confirm('Do you want to delete?');

  if (!greement) return;

  const res = await fetch('delete.php', {
    method: 'post',
    body: JSON.stringify({ id, src }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  const data = await res.text();
  console.log(data);

  if (data.includes('successfully')) {
    diplayUI();
    giveMeMsg('green', 'User deleted successfully');
  }
}

//////////////
diplayUI();

form.addEventListener('submit', ckFormData);
