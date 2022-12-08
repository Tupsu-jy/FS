const Addform = (props) => {

    return (
        <>
            <h2>Add new</h2>
            <form onSubmit={props.addNumber}>
                <div>name: <input /></div>
                <div>number: <input /></div>
                <div><button type="submit">add</button></div>
            </form>
        </>
    )
}

export default Addform