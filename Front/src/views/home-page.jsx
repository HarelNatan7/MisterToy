export function HomePage() {

    const imgUrl = 'HomeImg.png'

    return <section>
        <h2>Welcome To The Toy Store</h2 >
        <img className="home-img" src={require(`../assets/img/${imgUrl}`)} />
    </section >
}