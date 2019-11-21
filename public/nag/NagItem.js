import Component from '../Component.js';

class NagItem extends Component {

    onRender(dom) {

        const nag = this.props.nag;
        //const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;
         ///removed onUpdate
        // const checkbox = dom.querySelector('.checkbox');
        // checkbox.addEventListener('click', () => {
        //     nag.complete = !nag.complete;
        //     onUpdate(nag);
        // });
        const nagDetailsButton = dom.querySelector('.details-button');
        nagDetailsButton.addEventListener('click', () => {
            // event.preventDefault();
            if (confirm('Would you like to see the nag details?')) {
                window.location = `details.html?id=${nag.id}`;
            }
        });
        const removeSpan = dom.querySelector('.delete-button');
        //const removeNag = document.getElementById('${nag.id}');
        removeSpan.addEventListener('click', () => {
            confirm(`Are you sure you want to remove this task?`) &&
            onRemove(nag);
        });
    }

    renderHTML() {
        const { nag } = this.props;
        return /*html*/`
            <li id="${nag.id}">
                <p>
                    <!-- <span class="checkbox"><input type="checkbox" name="checkbox" value="done" ${nag.complete && 'checked'}></span> -->
                    <!-- <span class="task-span${nag.complete && '-strikethrough'}">${nag.task}</span> -->
                    <span class="task-span">${nag.task}</span>
                    <br>
                    
                    <span class="close"><button class="details-button">Nag Details</button></span>
                    <span class="close"><button class='delete-button'>Delete</button></span>
                   
                </p>
                <p class="notes-span" hidden>${nag.notes}</p>
            </li>
        `;
    }
}

export default NagItem;