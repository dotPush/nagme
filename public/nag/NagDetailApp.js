import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import NagDetail from './NagDetail.js';
import { getNagById } from '../services/nagme-api.js';

class NagDetailApp extends Component {
    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const loading = new Loading({ loading: true });
        main.appendChild(loading.renderDOM());

        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');

        if (!id) {
            window.location = '/';
            return;
        }

        try {
            const nag = await getNagById(id);
            const nagDetail = new NagDetail({ nag });
            main.appendChild(nagDetail.renderDOM());

        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /* html */`
            <div>
                <!-- header goes here -->
                <main>
                </main>
            </div>
        `;
    }
}

export default NagDetailApp;