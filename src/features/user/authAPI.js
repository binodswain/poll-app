import { _getUsers } from "../../_DATA";

export async function getUser({ username, password }) {
    const userList = await _getUsers();
    const user = userList[username];
    if (user && user.password === password) {
        return user;
    } else {
        throw new Error("Invalid username or password");
    }
}

export async function getUserDetails(userid) {
    const users = await _getUsers();
    if (userid) {
        return users[userid];
    }

    return users;
}
