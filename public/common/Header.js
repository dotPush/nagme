import Component from '../Component.js';

class Header extends Component {
    onRender(dom) {
        if (localStorage.getItem('USER')) {
            const user = JSON.parse(localStorage.getItem('USER'));
            //USER.displayName
            const displayUserName = dom.querySelector('.logged-in-as');
            displayUserName.textContent = `Logged in as ${user.displayName}`;
            
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
            <nav >
                <a id="item1" href="./">Home</a>
                <a id="item2" href="./about-us.html">About Us</a>
                <button id="item3" class="log-out hidden">Log Out</button>
         </nav>
            <div class="logo">
                <img class="nav-logo" src="./assets/NMBigLogo.png">
              </div>
                </header>

        `;
    }
}

export default Header;