import Component from '../Component.js';
class Header extends Component {
    onRender(dom) {
        if (localStorage.getItem('USER')) {
            const user = JSON.parse(localStorage.getItem('USER'));
            //USER.displayName
            //const displayUserName = dom.querySelector('.logged-in-as');
            //displayUserName.textContent = `Logged in as ${user.displayName}`;

            const listA = dom.querySelectorAll(`a[href="./list.html"]`);
            listA[0].innerHTML = `${user.displayName}'s Nags`;
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');
            button.addEventListener('click', () => {
                localStorage.removeItem('USER');
                location = './';
            }
            );
        }
    }
    renderHTML() {
        return /*html*/`
        <header class="header">
            <nav>
            <span class="logged-in-as"></span>
                <a class="nav-link" href="./">Home</a>
                <a class="nav-link" href="./list.html">Nags</a>
                <a class="nav-link" href="./about-us.html">About Us</a>
                <button class="log-out hidden">Log Out</button>
            </nav>
            <div class="logo">
                <img class="nav-logo" src="./assets/NMBigLogo.png">
            </div>
        </header>
        `;
    }
}
export default Header;