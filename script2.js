let globalId = null
const table = document.querySelector('.table')
const tbody = document.querySelector('.tbody')
const modal2 = document.querySelector('.modal2')
const closeBtn = document.querySelector('.closeBtn')

function addDataHtml() {
	let dataLoc = JSON.parse(localStorage.getItem('student'))

	if (dataLoc) {
		tbody.innerHTML = ''
		for (let i of dataLoc) {
			const tr = document.createElement('tr')

			tr.innerHTML = `
				<th>${i?.id}</th>
				<td>${i?.firstname}</td>
				<td>${i?.lastname}</td>
				<td>${i?.subject}</td>
				<td>${i?.age}</td>
				<td>
					<button class="btn btn-warning" onclick="editStudent(${i.id})">
						<i class="fa-solid fa-pen-to-square mr-2"></i>
						Edit
					</button>
				</td>
				<td>
					<button class="btn btn-danger" onclick="deleteData(${i.id})">
						<i class="fa-solid fa-trash mr-2"></i>
						Delete
					</button>
				</td>
			`

			tbody.append(tr)
		}
	} else localStorage.setItem('student', JSON.stringify([]))
}

function createNewStudent() {
	const data = JSON.parse(localStorage.getItem('student'))
	const dataLen = data[data.length - 1]
	const studentObj = {
		id: dataLen?.id ? dataLen?.id + 1 : 1,
	}
	const formInput = document.querySelectorAll('#formInput')

	for (let i of formInput) {
		studentObj[i?.name] = i.value
		i.value = ''
	}

	data.push(studentObj)
	localStorage.setItem('student', JSON.stringify(data))
	addDataHtml()
}

function deleteData(id) {
	const data = JSON.parse(localStorage.getItem('student'))
	const dataGetId = data.filter(i => i.id !== id).map(i => i)
	localStorage.setItem('student', JSON.stringify(dataGetId))
	addDataHtml()
}

function editStudent(id) {
	globalId = id
	const data = JSON.parse(localStorage.getItem('student'))
	const dataGetId = data.filter(i => i.id === globalId).map(i => i)
	const formInput = document.querySelectorAll('#formInput2')
	console.log(dataGetId, formInput)

	for (i of formInput) i.value = dataGetId[0][i.name]

	modal2.classList.add('show', 'd-block')
}

function updateStudent() {
	const data = JSON.parse(localStorage.getItem('student'))
	const dataGetId = data.filter(i => i.id === globalId).map(i => i)
	const formInput = document.querySelectorAll('#formInput2')

	for (let i of formInput) dataGetId[0][i.name] = i.value

	for (let i of data) if (i.id === dataGetId[0].id) i = dataGetId[0]

	localStorage.setItem('student', JSON.stringify(data))

	addDataHtml()
}

closeBtn.addEventListener('click', () => modal2.classList.remove("show", "d-block"))

addDataHtml()
