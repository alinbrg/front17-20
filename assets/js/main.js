function header() {
	// const header = document;
}

header();

// functions for sending data to server
function formActions() {
	const openRegFormBtn = document.querySelector("#open-reg-form");

	function showSelectedModal(selector) {
		const modal = document.querySelector(selector);
		const closeModalBtn = modal.querySelector(".modal-close");
		// console.log(closeModalBtn, modal);
		modal.classList.add("open");
		closeModalBtn.addEventListener("click", () => {
			modal.classList.remove("open");
		});
	}

	openRegFormBtn.addEventListener("click", () => {
		showSelectedModal("#reg-modal");
	});

	const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
		getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
		getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
		updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
		deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

	const regForm = document.querySelector("#reg"),
		userName = document.querySelector("#user_name"),
		userSurname = document.querySelector("#user_surname"),
		userEmail = document.querySelector("#user_email"),
		userPhone = document.querySelector("#user_phone"),
		userPersonalID = document.querySelector("#user_personal-id"),
		userZip = document.querySelector("#user_zip-code"),
		userGender = document.querySelector("#user_gender"),
		// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
		user_id = document.querySelector("#user_id");

	// const user = {
	// 	first_name: "steso",
	// 	last_name: "text",
	// 	phone: "123456789",
	// 	id_number: "12345678909",
	// 	email: "text@gmail.com",
	// 	gender: "male",
	// 	zip_code: "1245",
	// };

	function getAllUsers() {
		fetch("https://borjomi.loremipsum.ge/api/all-users")
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((data) => {
				console.log(data);
				const users = data.users;
				console.log(users);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function addNewUser(info) {
		fetch("https://borjomi.loremipsum.ge/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(info),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success === 1) {
					regForm.reset();
					getAllUsers();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function addNewUserAsync(info) {
		try {
			const response = await fetch(
				"https://borjomi.loremipsum.ge/api/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(info),
				}
			);

			const data = await response.json();
			console.log(data);
			getAllUsers();
		} catch (error) {
			console.log(error);
		} finally {
			console.log("finally");
		}
	}

	// try {

	// } catch (error) {

	// }

	getAllUsers();

	regForm.addEventListener("submit", (e) => {
		e.preventDefault();

		const userNameValue = userName.value;
		const userEmailValue = userEmail.value;
		const userSurnameValue = userSurname.value;
		const userPersonalIDValue = userPersonalID.value;
		const userPhoneValue = userPhone.value;
		const userGenderValue = userGender.value;
		const userZipValue = userZip.value;

		// console.log(
		// 	userNameValue,
		// 	userEmailValue,
		// 	userSurnameValue,
		// 	userPersonalIDValue,
		// 	userPhoneValue,
		// 	userGenderValue,
		// 	userZipValue
		// );

		const user = {
			first_name: userNameValue,
			last_name: userSurnameValue,
			phone: userPhoneValue,
			id_number: userPersonalIDValue,
			email: userEmailValue,
			gender: userGenderValue,
			zip_code: userZipValue,
		};

		console.log(user);

		addNewUserAsync(user);
	});
}

formActions();
