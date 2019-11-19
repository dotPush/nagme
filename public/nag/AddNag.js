import Component from '../Component.js';

class AddNag extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        
        form.addEventListener('submit', async event => {
            event.preventDefault();

            try {
                await onAdd(nag);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
        <form class="add-nag-form">

        <p>
            <label for="nag-name">Nag Name</label>
            <input id="nag-name" name="nag-name" required placeholder="Add Nag Name">
        </p>

        <p>
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes" required placeholder="Add Notes">
                </textarea>
        </p>

        <p>
            <label for="startTime">Start Time</label>
            <input type="time" id="startTime" name="time" required value="12:00">
        </p>

        <p>
            <label for="interval">Interval (in minutes)</label>
            <input type="number" id="text" name="interval" min="1" max="60" required >
        </p>

        <button>Add Nag</button>
    </form>


        `;
    }
}

export default AddNag;