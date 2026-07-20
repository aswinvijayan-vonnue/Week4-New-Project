async function fetchFile(name) {
  try {
    const res = await fetch(name);
    const text = await res.text();

    //parsing string into hidden html doc
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const bodyContent = doc.body.innerHTML;
    return bodyContent;
  } catch (err) {
    console.error(err);
  }
  //   return new Promise((resolve,reject)=>)fetch(name).then((res) => console.log(res.text()));
}
export function renderHome() {
  document.querySelector('#home')?.classList.add('active');
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id !== 'home') section.classList.remove('active');
  });
}

export function renderList() {
  document.querySelector('#list')?.classList.add('active');
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id !== 'list') section.classList.remove('active');
  });
}

export function renderDetails(id = 'abc') {
  document.querySelector('#details')?.classList.add('active');
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id !== 'details') section.classList.remove('active');
  });
  console.log('movie details of', id);
}

export function renderSettings() {
  document.querySelector('#settings')?.classList.add('active');
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id !== 'settings') section.classList.remove('active');
  });
}
