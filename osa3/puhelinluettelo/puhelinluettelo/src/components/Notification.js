const Notification = ({ message }) => {
    if (message.message === null) {
        return null
    }

    let notificationClass
    if (message) {
        notificationClass = "notification succes"
    } else {
        notificationClass = "notification error"
    }

    return (
        <div className={notificationClass}>
            {message.message}
        </div>
    )
}

export default Notification