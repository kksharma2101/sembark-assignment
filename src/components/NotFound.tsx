interface NotFoundType {
    text: string
}
const NotFound = ({ text }: NotFoundType) => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            {text}
        </div>
    )
}

export default NotFound;