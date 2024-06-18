const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

// export let followers;

const fetchFollowers = async () => {
    const response = await fetch(url, {
        headers: {
            "Accept": "application/json", 
        }
    });
    if (!response.ok) throw new Error("something went wrong while fetching followers");
    const data = await response.json();
    //console.log(data);
    const followers = data.map((item) => {
        const { avatar_url: img, login: name, html_url: profile } = item;
        return {
            name,
            img,
            profile,
        };
    });
    return followers;
}

export default fetchFollowers;
