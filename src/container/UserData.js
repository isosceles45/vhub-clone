const UserData = ({users}) => {
    return (
        <>
            {
                users.map((curUser) => {
                    const {id, website, name, email, username} = curUser;

                    return (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{website}</td>
                        </tr>
                    )
                })

            }
        </>
    )
}
export default UserData;