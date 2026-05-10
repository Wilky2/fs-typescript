const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
};

const success = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
};

const Notification = ({ message, style }: { message: string | null, style: React.CSSProperties }) => {
    if (message === null) {
        return null;
    }

    return (
        <div style={style}>
            {message}
        </div>
    );
};

export const SuccessNotification = ({ message }: { message: string | null }) => {
    return <Notification message={message} style={success} />;
};

export const ErrorNotification = ({ message }: { message: string | null }) => {
    return <Notification message={message} style={error} />;
};