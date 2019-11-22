import Component from '../Component.js';

class Loading extends Component {
    renderHTML() {
        const loading = this.props.loading;
        if (!loading) {
            return /*html*/`<div></div>`;
        }
        
        return /*html*/`
        <div class="wrapper">
            <div class="loading-container">
                <img class="loading" src="assets/loading.gif">
            </div>
            </div>
        `;
    }
}

export default Loading;