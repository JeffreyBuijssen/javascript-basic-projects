import getRandomJob from './jobs.js';
import getRandomLorem from './loremIpsum.js';
const standardURL = "https://www.randomUser.me/api/?inc=name,picture";
const multipleUrl = "https://www.randomUser.me/api/?results="
const multipleUrlSuffix = "&inc=name,picture";

export const fetchUser = async () => {
    const response = await fetch(standardURL, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Learning App",
        }
    });
    if (!response.ok) {
        throw new Error("Something went wrong fetching a user.");
    }
    const data = await response.json();
    const user = data.results[0];
    const { medium: image } = user.picture;
    const { first, last } = user.name;
    const job = getRandomJob();
    const text = getRandomLorem();
    //console.log(job);

    return { image, name: `${first} ${last}`, job , text};
};

export const fetchUsers = async (number) => {
    //console.log(`${multipleUrl}${number}${multipleUrlSuffix}`);
    const response = await fetch(`${multipleUrl}${number}${multipleUrlSuffix}`, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "Learning App",
        }
    });
    if (!response.ok) throw new Error("Something went wrong fetching multiple Users");

    const data = await response.json();
    const users = data.results.map((user) => {
        const { first, last } = user.name;
        const { medium: image } = user.picture;
        return {
            name: `${first} ${last}`,
            image,
            job: getRandomJob(),
            text: getRandomLorem()
        }
    });
    return users;
}

export default fetchUsers;