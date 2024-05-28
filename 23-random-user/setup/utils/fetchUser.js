const url = "https://www.randomuser.me/api/";

const getUser = async () => {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Learning App",
            }
        });
        if (!response.ok)
            throw new Error("Something went wrong while fetching the user");
        const data = await response.json();
        const person = data.results[0];
        
        const { phone, email } = person;
        const { large: image } = person.picture;
        const { password } = person.login;
        const { first, last } = person.name;
        const { dob: { age }, } = person;
        const { street: { name, number }, } = person.location;

        return {
            image,
            phone,
            email,
            password,
            age,
            name: `${first} ${last}`,
            street: `${name} ${number}`,
        };

    } catch (error) {
        console.log(error.message);
    }

    //return "Adam";
}

export default getUser;