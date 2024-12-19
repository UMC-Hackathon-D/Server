export const responseFromUser = (user) => {
    return {
        userId: user.id,
        userName: user.name,
    }
}

export const bodyToUser = (userName,partyName) =>{
    return {
        user_name: userName,
        party_name: partyName,
    }
}