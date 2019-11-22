import Component from '../Component.js';

class AddNag extends Component {

    onRender(form) {
        const { onAdd, onRemove, forceNag } = this.props;

        const myTextArea = form.querySelector('textarea');
        forceNag && (myTextArea.value = forceNag.notes);
        

        // const addButton = document.getElementById('add-button');
        // addButton.addEventListener('click', () => {

        // });
// //not done yet
//         const updateButton = form.querySelector('.update-button');
//         updateButton.addEventListener('click', async() => {
//             try {
//                 await onRemove(nag);
//                 await onAdd(nag);

//                 form.reset();
//                 document.activeElement.blur();
//             }
//             catch (err) {
//                 // App will show error, this catch keeps form from clearing
//             }
//         });
    




        form.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(form);//add or update

            const nag = {
                id: formData.get('hidden-id'),
                task: formData.get('nag-name'),
                notes: formData.get('notes'),
                startTime: formData.get('startTime'),
                interval: parseInt(formData.get('interval')),
                period: 'm',
            };

            console.log(nag);

            try {
                if (nag.id) {
                    await onRemove(nag);
                }

                await onAdd(nag);

                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // App will show error, this catch keeps form from clearing
            }
        });
    }

    renderHTML() {
        const forceNag = this.props.forceNag; 
        return /*html*/`
        <form class="add-nag-form">
        <p>
            <label for="nag-name">Nag Name</label>
            <input
                type="text"
                id="nag-name"
                name="nag-name"
                placeholder="Add Nag Name"
                value="${forceNag ? forceNag.task : ''}"
                required>
        </p>
        <p>
            <label for="notes">Notes</label>
            <textarea
                id="notes"
                name="notes"
                value="${forceNag ? forceNag.notes : ''}"
                placeholder="Add Notes"></textarea>
        </p>
        <p>
            <label for="startTime">Start Time</label>
            <input
                type="time"
                id="startTime"
                name="startTime"
                value="${forceNag ? forceNag.start_time : '12:00:00'}"
                required>
        </p>
        <p>
            <label for="interval">Interval (in minutes)</label>
            <input
                type="number"
                id="interval"
                name="interval"
                min="1"
                max="60"
                value="${forceNag ? forceNag.interval : ''}"
                required>
        </p>
                <p>
            <input
                type="hidden"
                name="hidden-id"
                value="${forceNag ? forceNag.id : ''}"
                required>
        </p>
        <button class="save-button" type="submit" name='action'>Save Nag</button>

    </form>
        `;
    }
}

export default AddNag;