import Component from '../Component.js';

class Header extends Component {

 
    onRender(dom) {
        if (localStorage.getItem('USER')) {


            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                localStorage.removeItem('USER');
                location = './';
            });
        }

    }
 

    renderHTML() {
        // const user = this.props.user.displayName;

        return /*html*/`
            <header>
            <nav>
            <p>Logged in as <span></span><p>
                <a id="item1" href="./">Home</a>
                <a id="item3" class="nags-hide" href="./list.html">Nags</a>
                <a id="item2" href="./about-us.html">About Us</a>
                <button id="item3" class="log-out hidden">Log Out</button>
         </nav>
            <div class="logo">
                <img class="nav-logo" src="./assets/2.png">
              </div>
                </header>
        `;
    }
};

export default Header;