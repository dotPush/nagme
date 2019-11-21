import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
                pushApiKey: formData.get('push-api-key')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form standard">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </p>
                    
                <p>
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" required placeholder="you@somewhere.com">
                </p>
                
                <p>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required>
                </p>
                <br>
                <p>
                    <label for="api-auth">Pushover API User Key</label>
                    <input id="push-api-key" type="text" name="push-api-key" required placeholder="API User key supplied by pushover">
                </p>
                <br>
                <p>
                    <button>Sign Up</button>
                </p>
            </form>
        `;
    }
}

export default SignUp;