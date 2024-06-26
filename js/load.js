const container = document.querySelector('.form-container')
const toggleButton = container.querySelector('.action-btn')
const form = document.querySelector('form.load-form')
const input = form.querySelector("#image")
const submit = form.querySelector("input[type=submit]")
const error = form.querySelector('p.error')

const validate = file => {
  const fileType = file.type

  if ( fileType != 'image/jpeg' && fileType != 'image/png' ) {
    error.classList.remove('hidden')
    submit.disabled = true
    return false
  }
 
    error.classList.add('hidden')
    submit.disabled = false
  	return true
}

toggleButton.addEventListener('click', () => {
  container.classList.toggle('visible')
})

input.addEventListener('change', () => {
  validate(input.files[0])
})
    
form.addEventListener('submit', event => {
  event.preventDefault()
  
  const selectedFile = input.files[0];

  if ( validate(selectedFile) ) {
    
    const img = document.createElement("img");
    img.src = URL.createObjectURL(selectedFile);
    sandbox.setUniform("trails", img.src);
    form.reset()
    submit.disabled = true
  }

})