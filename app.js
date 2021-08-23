'use strict';

const form = document.getElementById('insert');
const nameInput = document.querySelector('input[name="name"]');
const passwordInput = document.querySelector('input[name="password"]');
const fileInput = document.querySelector('input[name="my-file"]');
const msgP = document.getElementById('msg');

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
  }
}

function nameValid(name) {
  if (name !== '') {
    if (name.length >= 2) {
      const patterns = /^[a-zA-Z]+$/g;
      if (patterns.test(name)) {
        msgP.style.display = 'none';
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
        msgP.style.display = 'none';
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
  msgP.style.display = 'none';

  const size = file[0].size;
  const type = file[0].type;
  const typeArr = type.split('/');
  let typeName = typeArr[typeArr.length - 1].toLowerCase();
  const validType = ['jpg', 'jpeg', 'png', 'gif'];

  if (validType.includes(typeName)) {
    if (size < 3000000) {
      msgP.style.display = 'none';
      return true;
    } else {
      giveMeMsg('red', 'Image size must be in 3mbs');
    }
  } else {
    giveMeMsg('red', 'Only jpg|jpeg|png|gif supported');
  }
}

function giveMeMsg(color, msg) {
  msgP.style.display = 'block';
  msgP.style.color = color;
  msgP.textContent = msg;
}

//////////////
form.addEventListener('submit', ckFormData);
