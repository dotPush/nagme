import Component from '../Component.js';
import Header from '../common/Header.js';
import Loading from '../common/Loading.js';
import AddNag from './AddNag.js';
import NagList from './NagList.js';
//import { getNags, updateNag, addNag, removeNag } from '../services/nagme-api.js';
import { getNags, addNag, removeNag } from '../services/nagme-api.js';

class NagApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Nags' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');
        const content = dom.querySelector('.content');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const addNagSection = new AddNag({
            onAdd: async nag => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    const saved = await addNag(nag);
                    
                    // part 2: integrate back into our list
                    const { nags } = this.state;
                    nags.push(saved);

                    // part 3: tell component to update
                    nagList.update({ nags });
                }
                catch (err) {
                    // display error
                    error.textContent = err;
                    // rethrow the error so form knows not to clear the input:
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(addNagSection.renderDOM());

        const nagList = new NagList({ 
            nags: [],
            // onUpdate: async nag => {
            //     loading.update({ loading: true });
            //     // clear prior error
            //     error.textContent = '';

            //     try {
            //         // part 1: do work on the server
            //         const updated = await updateNag(nag);
                    
            //         // part 2: integrate back into our list
            //         const { nags } = this.state;
            //         // find the index of this type:
            //         const index = nags.indexOf(nag);
            //         // replace with updated object from server:
            //         nags.splice(index, 1, updated);

            //         // part 3: tell component to update
            //         nagList.update({ nags });
            //     }
            //     catch (err) {
            //         // display error
            //         console.log(err);
            //     }
            //     finally {
            //         loading.update({ loading: false });
            //     }
            // },
            onRemove: async nag => {
                loading.update({ loading: true });
                // clear prior error
                error.textContent = '';

                try {
                    // part 1: do work on the server
                    await removeNag(nag.id);
                    
                    // part 2: integrate back into our list
                    const { nags } = this.state;        
                    // find the index of this type:
                    const index = nags.indexOf(nag);
                    // remove from the list
                    nags.splice(index, 1);
    
                    // part 3: tell component to update
                    nagList.update({ nags });
                }
                catch (err) {
                    // display error
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        content.appendChild(nagList.renderDOM());

        // initial nag load:
        try {
            const nags = await getNags();
            this.state.nags = nags;
            nagList.update({ nags });
        }
        catch (err) {
            // display error...
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }

    }

    renderHTML() {
        return /*html*/`
        <div class="wrapper">
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add nag goes here -->
                    
                </main>
                <section class="content">
                 <!-- nag list goes here -->
                </section>
            </div>
        </div>
        `;
    }
}

export default NagApp;
