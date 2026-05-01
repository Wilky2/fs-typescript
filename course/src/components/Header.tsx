const Header = ({ name }: { name: string }) => {
    console.log(name);
    return (
        <h1>{name}</h1>
    );
};

export default Header;