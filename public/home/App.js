import Component from '../Component.js';
import Header from '../common/Header.js';

class App extends Component {

    onRender(dom) {
      //deleted header due to duplicated on homepage
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                 
                </main>
            </div>
        `;
    }
}

export default App;